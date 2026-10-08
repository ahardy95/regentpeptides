import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { VialImage } from "@/components/VialImage";

const HERO_VIALS = [
  { name: "GHK-Cu", dose: "50mg" },
  { name: "MOTS-C", dose: "10mg" },
  { name: "NAD+", dose: "100mg" },
];


const POINTS = [
  ["99%+ Purity", "Where applicable"],
  ["Research use only", "Not for human use"],
  ["UK dispatch", "Fast & discreet"],
];

export function HeroShowcase() {
  return (
    <section className="border-b border-hairline bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-12 lg:gap-14">
          {/* Editorial panel */}
          <div>
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-labblue">
              Research-grade peptide supply
            </p>
            <h1 className="mt-6 max-w-xl font-display text-[38px] font-extrabold leading-[1.02] tracking-[-0.03em] text-navy md:text-[52px] lg:text-[58px]">
              Rigorously tested peptides for serious research.
            </h1>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-steel">
              Every lyophilised vial is identity- and purity-tested, documented
              batch by batch, and dispatched from the United Kingdom with a
              Certificate of Analysis available on request.
            </p>


            <Link
              to="/collection"
              className="mt-9 inline-flex items-center gap-3 bg-labblue px-8 py-4 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-navy"
            >
              Shop Peptides
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>

          {/* Product composition */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_120%,#eef1ef_0%,#ffffff_65%)]"
            />

            <div className="relative grid grid-cols-3 items-end gap-0 md:-mr-16 lg:-mr-24">
              {HERO_VIALS.map((vial, i) => (
                <div
                  key={vial.name}
                  className={`aspect-square mix-blend-multiply ${
                    i === 1
                      ? "z-10 scale-[1.85]"
                      : "translate-y-5 scale-[1.55] opacity-95"
                  }`}
                >
                  <VialImage title={vial.name} dosage={vial.dose} eager />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Assurances — spread across full width below both columns */}
        <dl className="mt-12 grid grid-cols-1 gap-6 border-t border-hairline pt-8 sm:grid-cols-3 md:mt-14">
          {POINTS.map(([label, note]) => (
            <div key={label} className="flex items-start gap-2.5">
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0 text-labblue"
                strokeWidth={1.8}
                aria-hidden
              />
              <div className="min-w-0">
                <dt className="font-display text-[11px] font-bold uppercase tracking-[0.14em] text-navy">
                  {label}
                </dt>
                <dd className="mt-0.5 text-[12px] text-steel">{note}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

