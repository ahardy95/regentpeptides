import { ShieldCheck, FileCheck2, Truck, Headphones } from "lucide-react";

const CARDS = [
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    copy: "Rigorous testing for purity and identity",
  },
  {
    icon: FileCheck2,
    title: "COA on Request",
    copy: "Certificate of Analysis available on request",
  },
  {
    icon: Truck,
    title: "Discreet Shipping",
    copy: "Secure, tracked UK delivery",
  },

  {
    icon: Headphones,
    title: "Expert Support",
    copy: "Knowledgeable support for researchers",
  },
];

/** Dark charcoal trust strip directly beneath the navigation. */
export function TrustBar() {
  return (
    <section className="bg-navy">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {CARDS.map(({ icon: Icon, title, copy }, i) => (
          <div
            key={title}
            className={`flex items-start gap-3 px-4 py-4 sm:items-center sm:gap-3.5 sm:px-6 md:px-8 md:py-5 ${
              i % 2 === 1 ? "border-l border-white/12" : ""
            } ${i > 0 ? "lg:border-l lg:border-white/12" : ""} ${
              i < 2 ? "border-b border-white/12 lg:border-b-0" : ""
            }`}
          >
            <Icon
              className="mt-0.5 h-5 w-5 shrink-0 text-cyan sm:mt-0"
              strokeWidth={1.5}
              aria-hidden
            />

            <div>
              <h3 className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                {title}
              </h3>
              <p className="mt-1 text-[12px] leading-snug text-white/65">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
