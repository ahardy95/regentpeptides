import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { VialImage } from "@/components/VialImage";

const HERO_VIALS = [
  { name: "GHK-Cu", dose: "50mg" },
  { name: "MOTS-C", dose: "10mg" },
  { name: "NAD+", dose: "100mg" },
];

const POINTS = [
  ["99%+ purity", "Third-party HPLC and mass spectrometry on every batch"],
  ["Batch traceable", "Reference number printed on every vial"],
  ["UK manufactured", "Synthesised and lyophilised under controlled conditions"],
];

export function HeroShowcase() {
  return (
    <section className="overflow-hidden border-b border-hairline bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-14 pt-16 md:px-10 md:pb-16 md:pt-24">
        <div className="grid items-center gap-16 md:grid-cols-[0.95fr_1.05fr] md:gap-10 lg:gap-16">
          {/* Editorial panel */}
          <div>
            <p className="eyebrow text-labblue">UK research peptides</p>
            <h1 className="headline mt-6 max-w-xl text-[42px] text-navy md:text-[56px] lg:text-[62px]">
              Rigorously tested peptides for <em className="text-labblue">serious research.</em>
            </h1>
            <p className="mt-7 max-w-lg text-[17px] leading-[1.6] text-steel">
              Every lyophilised vial is identity- and purity-tested, documented batch by batch, and
              dispatched from the United Kingdom with a Certificate of Analysis on request.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
              <Link
                to="/collection"
                className="inline-flex items-center justify-center gap-2.5 bg-labblue px-5 py-4 text-[14px] font-medium tracking-[0.01em] text-white transition-colors hover:bg-navy sm:px-7"
              >
                Shop peptides
                <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
              </Link>
              <Link
                to="/lab-reports"
                className="inline-flex items-center justify-center border border-navy/30 px-5 py-4 text-[14px] font-medium tracking-[0.01em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white sm:px-7"
              >
                View lab reports
              </Link>
            </div>
          </div>

          {/* Product composition */}
          <div className="relative pt-6 md:pt-0">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_120%,#eef1ef_0%,#ffffff_65%)]"
            />
            <div className="relative grid grid-cols-3 items-end gap-0 md:-mr-10 lg:-mr-16">
              {HERO_VIALS.map((vial, i) => (
                <div
                  key={vial.name}
                  className={`aspect-square mix-blend-multiply ${
                    i === 1 ? "z-10 scale-[1.8]" : "translate-y-4 scale-[1.5] opacity-95"
                  }`}
                >
                  <VialImage title={vial.name} dosage={vial.dose} eager />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Assurances */}
        <dl className="mt-14 grid grid-cols-1 gap-8 border-t border-hairline pt-8 sm:grid-cols-3 md:mt-16">
          {POINTS.map(([label, note]) => (
            <div key={label}>
              <dt className="text-[14px] font-semibold text-navy">{label}</dt>
              <dd className="mt-1 text-[13px] leading-relaxed text-steel">{note}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
