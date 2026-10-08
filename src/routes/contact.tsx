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

      <main className="border-t border-hairline px-8 pb-24 pt-36 md:px-16 md:pt-44">
        <div className="mx-auto flex max-w-6xl flex-col gap-16 md:flex-row">
          <div className="md:w-[45%]">
            <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-labblue">
              Contact Us
            </p>
            <h1 className="font-display text-5xl leading-[1.1] md:text-6xl">
              Speak with
              <br />
              <span className="">the desk.</span>
            </h1>
            <p className="mt-8 max-w-md leading-relaxed text-steel">
              Order support, batch certificates, bulk and trade enquiries — all
              handled directly by our UK team, never a call centre.
            </p>

            <dl className="mt-14 space-y-8">
              {[
                [Mail, "Email", "concierge@regentpeptides.com"],
                [Clock, "Hours", "Monday to Friday, 09:00 – 17:00 (UK time), excluding bank holidays"],
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
                      <dt className="text-[10px] uppercase tracking-[0.3em] text-labblue">
                        {label as string}
                      </dt>
                      <dd className="mt-2 text-sm text-steel">
                        {value as string}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 space-y-6">
            <div>
              <label
                htmlFor="c-name"
                className="block text-[10px] uppercase tracking-[0.3em] text-labblue"
              >
                Name
              </label>
              <input
                id="c-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-3 w-full border-b border-navy/25 bg-transparent pb-3 text-ink outline-none transition-colors focus:border-navy"
              />
            </div>
            <div>
              <label
                htmlFor="c-email"
                className="block text-[10px] uppercase tracking-[0.3em] text-labblue"
              >
                Email
              </label>
              <input
                id="c-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-3 w-full border-b border-navy/25 bg-transparent pb-3 text-ink outline-none transition-colors focus:border-navy"
              />
            </div>
            <div>
              <label
                htmlFor="c-message"
                className="block text-[10px] uppercase tracking-[0.3em] text-labblue"
              >
                Message
              </label>
              <textarea
                id="c-message"
                rows={6}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-3 w-full resize-none border-b border-navy/25 bg-transparent pb-3 text-ink outline-none transition-colors focus:border-navy"
              />
            </div>
            <button
              type="submit"
              className="bg-navy px-10 py-4 text-[10px] font-medium uppercase tracking-[0.3em] text-white transition-colors hover:opacity-90"
            >
              Compose Email
            </button>
          </form>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
