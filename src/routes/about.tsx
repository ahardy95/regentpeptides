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

      <main className="pt-[102px] lg:pt-[160px]">
        <section className="reveal border-b border-hairline bg-white">
          <div className="mx-auto grid max-w-7xl md:grid-cols-[1.1fr_0.9fr]">
            <div className="px-6 py-20 md:px-10 md:py-28 md:pr-16">
              <p className="eyebrow text-labblue">About</p>
              <h1 className="headline mt-5 max-w-xl text-[40px] text-navy md:text-[56px]">
                A London house for <em className="text-labblue">serious research.</em>
              </h1>
              <p className="mt-8 max-w-lg text-[17px] leading-[1.6] text-steel">
                Regent Peptides was founded on a simple conviction: research compounds should be
                held to the same standard of provenance as anything else that carries a London
                address. We manufacture in the United Kingdom, release only against independent
                analysis, and document every batch we ship.
              </p>
              <p className="mt-5 max-w-lg text-[17px] leading-[1.6] text-steel">
                Our catalogue spans metabolic, regenerative, neuroendocrine and longevity sequences,
                alongside the reconstitution consumables a laboratory needs. Nothing is blended, cut
                or repackaged without record.
              </p>
              <Link
                to="/quality"
                className="mt-9 inline-flex border border-navy/30 px-6 py-3.5 text-[14px] font-medium text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
              >
                How we verify every batch
              </Link>
            </div>

            <div className="relative min-h-[360px] overflow-hidden border-hairline md:border-l">
              <img
                src={scienceImage}
                alt="Crystallised peptide powder under laboratory light"
                className="h-full w-full object-cover grayscale"
                loading="lazy"
                width={1200}
                height={800}
              />
            </div>
          </div>
        </section>

        <section className="reveal px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <h2 className="headline text-[32px] text-navy md:text-[40px]">What we stand behind</h2>
            <div className="mt-12 grid gap-10 border-t border-hairline md:grid-cols-3 md:gap-x-10">
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
                <div key={heading} className="pt-7">
                  <h3 className="text-[18px] font-semibold text-navy">{heading}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-steel">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="reveal border-t border-hairline bg-white px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <dl className="grid gap-8 md:grid-cols-3">
              <div>
                <dt className="text-[13px] text-steel">Registered company</dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-navy">
                  Regent Peptides is a trading name of Oxford Research Syndicate Ltd, registered in
                  England &amp; Wales, company number 17207898.
                </dd>
              </div>
              <div>
                <dt className="text-[13px] text-steel">Registered office</dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-navy">
                  131a Movers Lane, Barking, Essex, IG11 7UQ, United Kingdom.
                </dd>
              </div>
              <div>
                <dt className="text-[13px] text-steel">Contact</dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-navy">
                  concierge@regentpeptides.com
                  <br />
                  Monday to Friday, 09:00 to 17:00 UK time.
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
