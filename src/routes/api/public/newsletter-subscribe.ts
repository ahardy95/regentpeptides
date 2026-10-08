import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(32).optional().or(z.literal("")),
  dialCode: z.string().trim().max(8).optional().or(z.literal("")),
  website: z.string().optional(), // honeypot
});

const FALLBACK_CODE_HIGH = "RPWELCOME10";
const FALLBACK_CODE_LOW = "RPWELCOME5";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function codeSuffix() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  for (const b of bytes) out += alphabet[b % alphabet.length];
  return out;
}

async function adminRequest(path: string, body: unknown) {
  const domain =
    process.env["SHOPIFY_STORE_DOMAIN"] ||
    "regent-peptide-hub-o9ts5-9bz14ts3.myshopify.com";
  const token =
    process.env["SHOPIFY_ADMIN_API_TOKEN"] || process.env["SHOPIFY_ACCESS_TOKEN"];
  if (!token) throw new Error("Missing Shopify admin token");

  const res = await fetch(`https://${domain}/admin/api/2025-07/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": token,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Shopify admin error ${res.status}: ${await res.text()}`);
  }
  return res.json() as Promise<any>;
}

async function createTier(
  email: string,
  code: string,
  amount: string,
  minimum: string
) {
  const rule = await adminRequest("price_rules.json", {
    price_rule: {
      title: `Welcome Credit ${minimum === "30.00" ? "£5" : "£10"} - ${email}`,
      target_type: "line_item",
      target_selection: "all",
      allocation_method: "across",
      value_type: "fixed_amount",
      value: amount,
      customer_selection: "all",
      once_per_customer: true,
      usage_limit: 1,
      prerequisite_subtotal_range: { greater_than_or_equal_to: minimum },
      starts_at: new Date().toISOString(),
    },
  });
  const ruleId = rule?.price_rule?.id;
  if (!ruleId) throw new Error("Price rule creation failed");
  await adminRequest(`price_rules/${ruleId}/discount_codes.json`, {
    discount_code: { code },
  });
  return code;
}

export const Route = createFileRoute("/api/public/newsletter-subscribe")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return json({ success: false, error: "Invalid request" }, 400);
        }

        const parsed = bodySchema.safeParse(payload);
        if (!parsed.success) {
          return json({ success: false, error: "Enter a valid email address" }, 400);
        }
        const { website, dialCode } = parsed.data;
        if (website)
          return json({ success: true, code: FALLBACK_CODE_HIGH, codeLow: FALLBACK_CODE_LOW });

        const email = parsed.data.email.toLowerCase();
        const rawPhone = (parsed.data.phone || "").replace(/[^\d]/g, "");
        const phone = rawPhone ? `${dialCode || "+44"}${rawPhone}` : null;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const { data: existing } = await supabaseAdmin
          .from("newsletter_subscribers")
          .select("discount_code, discount_code_low")
          .eq("email", email)
          .maybeSingle();

        if (existing?.discount_code) {
          return json({
            success: true,
            code: existing.discount_code,
            codeLow: existing.discount_code_low,
            existing: true,
          });
        }

        const suffix = codeSuffix();
        const codeHigh = `RP10-${suffix}`;
        const codeLow = `RP5-${suffix}`;

        let finalHigh: string = FALLBACK_CODE_HIGH;
        let finalLow: string | null = FALLBACK_CODE_LOW;
        try {
          finalLow = await createTier(email, codeLow, "-5.0", "30.00");
          finalHigh = await createTier(email, codeHigh, "-10.0", "80.00");
        } catch (error) {
          console.error("Shopify discount creation failed", error);
        }

        const { error: dbError } = await supabaseAdmin
          .from("newsletter_subscribers")
          .upsert(
            {
              email,
              phone,
              sms_consent: Boolean(phone),
              source: "popup",
              discount_code: finalHigh,
              discount_code_low: finalLow,
            },
            { onConflict: "email" }
          );

        if (dbError) {
          console.error("Subscriber save failed", dbError);
          return json({ success: false, error: "Could not save your details" }, 500);
        }

        return json({ success: true, code: finalHigh, codeLow: finalLow });
      },
    },
  },
});
