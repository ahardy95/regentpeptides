import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Chromatogram } from "@/components/Chromatogram";
import { useCartSync } from "@/lib/cartStore";

const title = "Quality Standards & Verification | Regent Peptides";
const description =
  "Verification at every stage: sourcing, manufacture, analysis and documented release of Regent Peptides research compounds.";

const STAGES = [
  {
    number: "01",
    name: "Source",
    copy: "Raw material sourced against defined identity and quality criteria, recorded against the incoming consignment.",
  },
  {
    number: "02",
    name: "Manufacture",
    copy: "Synthesis and lyophilisation carried out under controlled UK manufacturing conditions with batch records.",
  },
  {
    number: "03",
    name: "Analyse",
    copy: "Independent analytical testing by third-party laboratories using chromatographic and mass spectrometric methods.",
  },
  {
    number: "04",
    name: "Verify",
    copy: "Batch identification applied and quality documentation compiled prior to release for research supply.",
  },
];

export const Route = createFileRoute("/quality")({
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
  component: QualityPage,
});

function QualityPage() {
  useCartSync();

  return (
    <div className="min-h-screen bg-labwhite text-ink">
      <SiteHeader />
      <main className="pt-[110px] lg:pt-[156px]">
        <section className="border-b border-hairline bg-white px-6 py-16 md:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="text-[10px] uppercase tracking-[0.28em] text-labblue">
              Verification at Every Stage
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-navy md:text-5xl">
              Quality shouldn’t require trust. It should provide evidence.
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-steel">
              Regent Peptides prioritises documented product verification, batch
              identification and independent analytical testing. Every stage of
              handling is recorded so that a compound can be traced from
              incoming material through to the documentation supplied with it.
            </p>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 py-16 md:px-10 md:py-24">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-56 -translate-y-1/2 text-navy opacity-50">
            <Chromatogram className="h-full w-full" />
          </div>
          <div className="relative mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">
            {STAGES.map((stage) => (
              <article
                key={stage.number}
                className="rounded-xl border border-hairline bg-white p-7"
              >
                <p className="font-mono text-[11px] tracking-[0.2em] text-cyan">
                  {stage.number}
                </p>
                <h2 className="mt-4 font-display text-[13px] font-semibold uppercase tracking-[0.2em] text-navy">
                  {stage.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-steel">
                  {stage.copy}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-hairline bg-white px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-navy md:text-3xl">
                What documentation covers
              </h2>
              <dl className="mt-8 divide-y divide-hairline border-y border-hairline">
                {[
                  ["Identity", "Confirmation that the material corresponds to the stated compound."],
                  ["Purity", "Quantified analytical result for the tested batch."],
                  ["Method", "The analytical technique applied, typically HPLC with mass spectrometry."],
                  ["Batch Reference", "The identifier printed on the product label."],
                  ["Form", "Lyophilised powder, sealed vial."],
                  ["Intended Use", "Laboratory research use only."],
                ].map(([term, value]) => (
                  <div key={term} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-8">
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-steel sm:w-48 sm:shrink-0">
                      {term}
                    </dt>
                    <dd className="text-sm leading-relaxed text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-xl border border-hairline bg-labwhite p-8">
              <p className="text-[10px] uppercase tracking-[0.24em] text-labblue">
                Documentation Access
              </p>
              <h3 className="mt-4 font-display text-xl font-semibold text-navy">
                Look up a batch reference
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-steel">
                Analytical documentation is indexed by product and batch number.
                Search the record set to view availability.
              </p>
              <Link
                to="/lab-reports"
                className="mt-7 inline-flex rounded-lg bg-navy px-7 py-3.5 font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-labblue"
              >
                Open Lab Reports
              </Link>
              <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-steel">
                For research use only. Not for human consumption.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
