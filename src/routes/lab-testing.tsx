import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const title = "Lab Testing & COAs | Regent Peptides";
const description =
  "Independent third-party analysis for every Regent Peptides batch. Search a batch number to review purity, identity and certificate of analysis records.";

export const Route = createFileRoute("/lab-testing")({
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
  component: LabTestingPage,
});

const methods = [
  {
    code: "HPLC",
    name: "High-Performance Liquid Chromatography",
    copy: "Quantifies purity against reference standards. Release threshold: ≥ 98%.",
  },
  {
    code: "MS",
    name: "Mass Spectrometry",
    copy: "Confirms molecular identity and sequence weight for every synthesised lot.",
  },
  {
    code: "EP",
    name: "Endotoxin & Sterility Panel",
    copy: "Screens lyophilised product for bacterial endotoxin and microbial burden.",
  },
];

const batches = [
  { batch: "RP-2601-A", compound: "Batch reference", purity: "99.2%", date: "Jan 2026" },
  { batch: "RP-2602-C", compound: "Batch reference", purity: "98.7%", date: "Feb 2026" },
  { batch: "RP-2604-B", compound: "Batch reference", purity: "99.4%", date: "Apr 2026" },
];

function LabTestingPage() {
  return (
    <div className="min-h-screen bg-labwhite text-ink">
      <SiteHeader />

      <main>
        <section className="flex flex-col border-t border-hairline pt-[110px] md:flex-row lg:pt-[156px]">
          <div className="w-full border-hairline p-8 md:w-[60%] md:border-r md:p-16">
            <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-labblue">
              Lab Testing
            </p>
            <h1 className="font-display text-5xl leading-[1.1] md:text-7xl">
              Proof, <span className="">published.</span>
            </h1>
            <p className="mt-8 max-w-lg leading-relaxed text-steel">
              Each vial carries a batch number. That number maps to an
              independent certificate of analysis covering purity, identity and
              contamination screening. Request any COA and we will send the full
              report.
            </p>
          </div>

          <div className="w-full p-8 md:w-[40%] md:p-16">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-labblue">
              Find a batch
            </h2>
            <form
              className="mt-6 flex border-b border-hairline pb-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="batch" className="sr-only">
                Batch number
              </label>
              <input
                id="batch"
                placeholder="e.g. RP-2601-A"
                className="w-full bg-transparent text-sm outline-none placeholder:text-steel"
              />
              <button className="text-[10px] uppercase tracking-[0.3em] text-labblue transition-colors hover:text-labblue">
                Search
              </button>
            </form>
            <p className="mt-4 text-xs leading-relaxed text-steel">
              Can’t find your batch? Email documentation@regentpeptides.com and
              we will respond within one working day.
            </p>
          </div>
        </section>

        <section className="border-t border-hairline px-8 py-24 md:px-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-display text-3xl md:text-4xl">Analytical methods</h2>
            <div className="mt-12 grid gap-px md:grid-cols-3">
              {methods.map((m) => (
                <article
                  key={m.code}
                  className="border-t border-hairline py-8 pr-8"
                >
                  <span className="font-display text-4xl text-labblue">
                    {m.code}
                  </span>
                  <h3 className="mt-4 text-[11px] uppercase tracking-[0.2em]">
                    {m.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel">
                    {m.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-hairline px-8 pb-28 pt-16 md:px-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-display text-3xl md:text-4xl">Recent releases</h2>
            <table className="mt-10 w-full text-left">
              <thead>
                <tr className="border-b border-hairline text-[10px] uppercase tracking-[0.2em] text-labblue">
                  <th className="py-4 font-medium">Batch</th>
                  <th className="py-4 font-medium">Record</th>
                  <th className="py-4 font-medium">Purity</th>
                  <th className="py-4 font-medium">Released</th>
                </tr>
              </thead>
              <tbody>
                {batches.map((b) => (
                  <tr
                    key={b.batch}
                    className="border-b border-hairline text-sm text-steel"
                  >
                    <td className="py-5 text-ink">{b.batch}</td>
                    <td className="py-5">{b.compound}</td>
                    <td className="py-5 text-labblue">{b.purity}</td>
                    <td className="py-5">{b.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
