import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Clock, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const title = "Contact Regent Peptides | London Peptide House";
const description =
  "Contact Regent Peptides for order support, batch documentation requests and trade enquiries. London based, responses within one working day.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const MAILBOX = "concierge@regentpeptides.com";

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // No server mailer is configured, so the form hands the enquiry to the
  // sender's own mail client rather than pretending to have sent it.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.trim() || !form.message.trim()) return;
    const subject = `Website enquiry${form.name ? ` — ${form.name}` : ""}`;
    const body = `Name: ${form.name || "—"}\nEmail: ${form.email}\n\n${form.message}`;
    const href = `mailto:${MAILBOX}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    try {
      window.location.href = href;
      toast("Opening your email app", {
        description: `If nothing opens, email us directly at ${MAILBOX}.`,
      });
    } catch {
      toast.error("Could not open your email app", {
        description: `Please email ${MAILBOX} directly.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-labwhite text-ink">
      <SiteHeader />

      <main className="border-t border-hairline bg-white px-6 pb-24 pt-[134px] md:px-10 md:pb-32 lg:pt-[216px]">
        <div className="mx-auto flex max-w-7xl flex-col gap-16 md:flex-row md:gap-24">
          <div className="md:w-[45%]">
            <p className="eyebrow text-labblue">Contact</p>
            <h1 className="headline mt-5 text-[40px] text-navy md:text-[56px]">
              Speak with <em className="text-labblue">the desk.</em>
            </h1>
            <p className="mt-7 max-w-md text-[17px] leading-[1.6] text-steel">
              Order support, batch certificates, bulk and trade enquiries — all handled directly by
              our UK team, never a call centre.
            </p>

            <dl className="mt-12 space-y-7 border-t border-hairline pt-8">
              {[
                [Mail, "Email", "concierge@regentpeptides.com"],
                [
                  Clock,
                  "Hours",
                  "Monday to Friday, 09:00 – 17:00 (UK time), excluding bank holidays",
                ],
                [
                  MapPin,
                  "Registered office",
                  "Oxford Research Syndicate Ltd · 131a Movers Lane, Barking, Essex, IG11 7UQ, United Kingdom · Company Reg. No. 17207898",
                ],
              ].map(([Icon, label, value]) => {
                const IconComponent = Icon as typeof Mail;
                return (
                  <div key={label as string} className="flex gap-5">
                    <IconComponent
                      className="mt-1 h-4 w-4 shrink-0 text-labblue"
                      strokeWidth={1.25}
                    />
                    <div>
                      <dt className="text-[13px] text-steel">{label as string}</dt>
                      <dd className="mt-1 text-[15px] leading-relaxed text-navy">
                        {value as string}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 space-y-7 md:pt-2">
            <div>
              <label htmlFor="c-name" className="block text-[13px] text-steel">
                Name
              </label>
              <input
                id="c-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-2 w-full border-b border-hairline bg-transparent pb-3 text-[16px] text-ink outline-none transition-colors focus:border-navy"
              />
            </div>
            <div>
              <label htmlFor="c-email" className="block text-[13px] text-steel">
                Email
              </label>
              <input
                id="c-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-2 w-full border-b border-hairline bg-transparent pb-3 text-[16px] text-ink outline-none transition-colors focus:border-navy"
              />
            </div>
            <div>
              <label htmlFor="c-message" className="block text-[13px] text-steel">
                Message
              </label>
              <textarea
                id="c-message"
                rows={6}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-2 w-full resize-none border-b border-hairline bg-transparent pb-3 text-[16px] text-ink outline-none transition-colors focus:border-navy"
              />
            </div>
            <button
              type="submit"
              className="bg-navy px-7 py-4 text-[14px] font-medium text-white transition-colors hover:bg-labblue"
            >
              Compose email
            </button>
          </form>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
