import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
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
      <main className="pt-[102px] lg:pt-[160px]">
        <section className="border-b border-hairline bg-white px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <p className="eyebrow text-labblue">Quality</p>
            <h1 className="headline mt-5 max-w-3xl text-[40px] text-navy md:text-[56px]">
              Quality shouldn’t require trust.{" "}
              <em className="text-labblue">It should provide evidence.</em>
            </h1>
            <p className="mt-7 max-w-2xl text-[17px] leading-[1.6] text-steel">
              Regent Peptides prioritises documented product verification, batch identification and
              independent analytical testing. Every stage of handling is recorded so that a compound
              can be traced from incoming material through to the documentation supplied with it.
            </p>
          </div>
        </section>

        <section className="reveal px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <h2 className="headline text-[32px] text-navy md:text-[40px]">
              Four stages, every batch
            </h2>
            <ol className="mt-12 grid gap-y-10 border-t border-hairline md:grid-cols-4 md:gap-x-10">
              {STAGES.map((stage) => (
                <li key={stage.number} className="pt-7">
                  <p className="text-[13px] font-medium tracking-[0.12em] text-labblue">
                    {stage.number}
                  </p>
                  <h3 className="mt-5 text-[18px] font-semibold text-navy">{stage.name}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-steel">{stage.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="reveal border-t border-hairline bg-white px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
            <div>
              <h2 className="headline text-[32px] text-navy md:text-[40px]">
                What the documentation covers
              </h2>
              <dl className="mt-10 divide-y divide-hairline border-y border-hairline">
                {[
                  [
                    "Identity",
                    "Confirmation that the material corresponds to the stated compound.",
                  ],
                  ["Purity", "Quantified analytical result for the tested batch."],
                  [
                    "Method",
                    "The analytical technique applied, typically HPLC with mass spectrometry.",
                  ],
                  ["Batch reference", "The identifier printed on the product label."],
                  ["Form", "Lyophilised powder, sealed vial."],
                  ["Intended use", "Laboratory research use only."],
                ].map(([term, value]) => (
                  <div key={term} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-8">
                    <dt className="text-[14px] text-steel sm:w-44 sm:shrink-0">{term}</dt>
                    <dd className="text-[15px] leading-relaxed text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border-t border-navy pt-8 lg:pt-10">
              <h3 className="text-[22px] font-medium tracking-[-0.01em] text-navy">
                Look up a batch reference
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-steel">
                Analytical documentation is indexed by product and batch number. Search the record
                set to view what is available for your vial.
              </p>
              <Link
                to="/lab-reports"
                className="mt-7 inline-flex bg-navy px-6 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-labblue"
              >
                Open lab reports
              </Link>
              <p className="mt-10 text-[13px] text-steel">
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
