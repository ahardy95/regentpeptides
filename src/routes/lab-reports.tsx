import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BatchVerification } from "@/components/BatchVerification";
import { Chromatogram } from "@/components/Chromatogram";
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
      <main className="pt-[110px] lg:pt-[156px]">
        <section className="relative overflow-hidden border-b border-hairline bg-white px-6 py-16 md:px-10">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 text-labblue opacity-70">
            <Chromatogram className="h-full w-full" />
          </div>
          <div className="relative mx-auto max-w-7xl">
            <p className="text-[10px] uppercase tracking-[0.28em] text-labblue">
              Quality Control Portal
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-navy md:text-5xl">
              Batch Verification
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-steel">
              Access available analytical documentation by product or batch.
              Records list the analytical method applied, the batch reference and
              the release date of the documentation.
            </p>
          </div>
        </section>

        <section className="px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <BatchVerification />

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Analytical Methods",
                  value: "HPLC · Mass Spectrometry",
                },
                { label: "Documentation Format", value: "Batch-Specific COA" },
                { label: "Record Retention", value: "Per Batch Reference" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-hairline bg-white p-6"
                >
                  <p className="text-[9px] uppercase tracking-[0.22em] text-steel">
                    {item.label}
                  </p>
                  <p className="mt-3 font-display text-sm font-semibold text-navy">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-10 max-w-3xl text-xs leading-relaxed text-steel">
              Documentation is provided for identity and quality verification of
              laboratory research materials. For research use only. Not for human
              consumption.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
