import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TrustBar } from "@/components/TrustBar";
import scienceImage from "@/assets/science.jpg";

const title = "Our Standards | Regent Peptides";
const description =
  "How Regent Peptides synthesises, verifies and releases every batch — UK manufacturing, independent HPLC and MS analysis, and full batch documentation.";

export const Route = createFileRoute("/standards")({
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
  component: StandardsPage,
});

const pillars = [
  {
    index: "01",
    title: "Synthesis",
    copy: "Solid-phase peptide synthesis carried out in UK facilities working to GMP-aligned procedures, with controlled reagent sourcing and documented chain of custody.",
  },
  {
    index: "02",
    title: "Verification",
    copy: "Every lot is analysed by independent laboratories using HPLC for purity and mass spectrometry for identity. No result, no release.",
  },
  {
    index: "03",
    title: "Release",
    copy: "Batch numbers are printed on every vial and matched to a certificate of analysis you can read before you buy, not after.",
  },
  {
    index: "04",
    title: "Delivery",
    copy: "Temperature-considered, discreet, tracked next-day dispatch from London for orders placed before 3pm.",
  },
];

function StandardsPage() {
  return (
    <div className="min-h-screen bg-labwhite text-ink">
      <SiteHeader />

      <main>
        <section className="flex flex-col border-t border-hairline pt-[110px] md:flex-row lg:pt-[156px]">
          <div className="w-full border-hairline p-8 md:w-[40%] md:border-r md:p-16">
            <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-labblue">
              Our Standards
            </p>
            <h1 className="font-display text-5xl leading-[1.1] md:text-7xl">
              Held to <span className="">account.</span>
            </h1>
            <p className="mt-8 max-w-sm leading-relaxed text-steel">
              Regent Peptides exists because the category is full of unverified
              claims. Our answer is documentation: every compound traceable,
              every batch independently analysed, every result published.
            </p>
          </div>

          <div className="relative min-h-[360px] w-full overflow-hidden md:w-[60%]">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-labwhite/10 via-transparent to-labwhite/70" />
            <img
              src={scienceImage}
              alt="Crystallised peptide powder under laboratory lighting"
              className="h-full w-full object-cover opacity-75 grayscale"
              loading="lazy"
              width={1200}
              height={800}
            />
            <div className="absolute bottom-12 left-12 z-20 max-w-xs">
              <div className="mb-4 h-px w-12 bg-navy" />
              <p className="text-xs uppercase leading-relaxed tracking-widest text-steel">
                London Laboratory
                <br />
                Established MMXXIV
              </p>
            </div>
          </div>
        </section>

        <TrustBar />

        <section className="border-t border-hairline px-8 py-24 md:px-16">
          <div className="mx-auto grid max-w-7xl gap-px md:grid-cols-2">
            {pillars.map((pillar) => (
              <article
                key={pillar.index}
                className="border-b border-hairline py-12 pr-0 md:pr-16"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-labblue">
                  {pillar.index}
                </span>
                <h2 className="mt-4 font-display text-3xl md:text-4xl">
                  {pillar.title}
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-steel">
                  {pillar.copy}
                </p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-7xl">
            <Link
              to="/lab-testing"
              className="inline-block border border-hairline px-10 py-4 text-[10px] font-medium uppercase tracking-[0.3em] transition-colors hover:border-navy"
            >
              View Lab Results
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
