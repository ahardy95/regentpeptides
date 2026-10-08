import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import scienceImage from "@/assets/science.jpg";

const title = "About Regent Peptides | A London Peptide House";
const description =
  "Regent Peptides is a London peptide house supplying UK manufactured, independently tested research compounds to laboratories and research professionals.";

export const Route = createFileRoute("/about")({
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
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-labwhite text-ink">
      <SiteHeader />

      <main className="flex flex-col border-t border-hairline pt-[110px] md:flex-row lg:pt-[156px]">
        <div className="flex w-full flex-col justify-center p-8 md:min-h-[80vh] md:w-[55%] md:p-16">
          <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-labblue">
            About Us
          </p>
          <h1 className="font-display text-5xl leading-[1.1] md:text-6xl">
            A London house for
            <br />
            <span className="">serious research.</span>
          </h1>
          <p className="mt-8 max-w-lg leading-relaxed text-steel">
            Regent Peptides was founded on a simple conviction: research
            compounds should be held to the same standard of provenance as
            anything else that carries a London address. We manufacture in the
            United Kingdom, release only against independent analysis, and
            document every batch we ship.
          </p>
          <p className="mt-6 max-w-lg leading-relaxed text-steel">
            Our catalogue spans metabolic, regenerative, neuroendocrine and
            longevity sequences, alongside the reconstitution consumables a
            laboratory needs. Nothing is blended, cut or repackaged without
            record.
          </p>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-steel">
            Regent Peptides is a trading name of Oxford Research Syndicate Ltd,
            a company registered in England &amp; Wales (company number
            17207898). Registered office: 131a Movers Lane, Barking, Essex,
            IG11 7UQ, United Kingdom.
          </p>


        </div>

        <div className="relative min-h-[360px] w-full overflow-hidden border-hairline md:w-[45%] md:border-l">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-labwhite/70 to-transparent" />
          <img
            src={scienceImage}
            alt="Crystallised peptide powder under laboratory light"
            className="h-full w-full object-cover opacity-75 grayscale"
            loading="lazy"
            width={1200}
            height={800}
          />
        </div>
      </main>

      <section className="border-t border-hairline px-8 py-24 md:px-16">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3">
          {[
            [
              "Manufactured in the UK",
              "Synthesis and lyophilisation carried out under UK oversight, not imported and relabelled.",
            ],
            [
              "Independently verified",
              "Third-party HPLC and mass spectrometry on every production batch before release.",
            ],
            [
              "Documented end to end",
              "Batch numbers tie each vial to its certificate of analysis, retained and searchable.",
            ],
          ].map(([heading, copy]) => (
            <div key={heading} className="border-t border-hairline pt-6">
              <h2 className="font-display text-2xl text-labblue">
                {heading}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-steel">
                {copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
