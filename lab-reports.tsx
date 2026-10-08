import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BatchVerification } from "@/components/BatchVerification";
import { useCartSync } from "@/lib/cartStore";

const title = "Lab Reports & Batch Verification | Regent Peptides";
const description =
  "Access available analytical documentation by product or batch. Independent HPLC and mass spectrometry records for Regent Peptides research compounds.";

export const Route = createFileRoute("/lab-reports")({
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
  component: LabReportsPage,
});

function LabReportsPage() {
  useCartSync();

  return (
    <div className="min-h-screen bg-labwhite text-ink">
      <SiteHeader />
      <main className="pt-[102px] lg:pt-[160px]">
        <section className="border-b border-hairline bg-white px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <p className="eyebrow text-labblue">Lab reports</p>
            <h1 className="headline mt-5 max-w-2xl text-[40px] text-navy md:text-[56px]">
              Batch verification
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-[1.6] text-steel">
              Find the analytical documentation for your vial by product or batch reference. Each
              record lists the method applied, the batch number and the date the documentation was
              released.
            </p>
          </div>
        </section>

        <section className="reveal bg-white px-6 pb-20 md:px-10 md:pb-28">
          <div className="mx-auto max-w-7xl">
            <BatchVerification />

            <dl className="mt-12 grid gap-8 border-t border-hairline pt-8 sm:grid-cols-3">
              {[
                ["Analytical methods", "HPLC and mass spectrometry"],
                ["Documentation", "Batch-specific Certificate of Analysis"],
                ["Record retention", "Kept per batch reference"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[13px] text-steel">{label}</dt>
                  <dd className="mt-1 text-[15px] font-medium text-navy">{value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-10 max-w-3xl text-[13px] leading-relaxed text-steel">
              Documentation is provided for identity and quality verification of laboratory research
              materials. For research use only. Not for human consumption.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
