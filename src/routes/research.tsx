import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useCartSync } from "@/lib/cartStore";
import { RESEARCH_ARTICLES, RESEARCH_CATEGORIES } from "@/lib/researchLibrary";
import { cn } from "@/lib/utils";

const title = "Research Library | Regent Peptides";
const description =
  "Journal-style reference material on peptide science, laboratory methods, purity analysis, compound profiles and storage of lyophilised material.";

export const Route = createFileRoute("/research")({
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
  component: ResearchPage,
});

function ResearchPage() {
  useCartSync();
  const [active, setActive] = useState<string | null>(null);

  const articles = active
    ? RESEARCH_ARTICLES.filter((article) => article.category === active)
    : RESEARCH_ARTICLES;

  const chip = (selected: boolean) =>
    cn(
      "shrink-0 border px-4 py-2 text-[13px] font-medium transition-colors",
      selected
        ? "border-navy bg-navy text-white"
        : "border-hairline bg-white text-steel hover:border-navy hover:text-navy",
    );

  return (
    <div className="min-h-screen bg-labwhite text-ink">
      <SiteHeader />
      <main className="pt-[102px] lg:pt-[160px]">
        <section className="border-b border-hairline bg-white px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <p className="eyebrow text-labblue">Research library</p>
            <h1 className="headline mt-5 max-w-3xl text-[40px] text-navy md:text-[56px]">
              Reference material for laboratory work
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-[1.6] text-steel">
              Summary notes on peptide identity, analytical methodology, quality documentation and
              laboratory handling. Educational reference only; no dosing or administration guidance
              is provided.
            </p>
          </div>
        </section>

        <section className="reveal px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setActive(null)} className={chip(active === null)}>
                All
              </button>
              {RESEARCH_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActive(category)}
                  className={chip(active === category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-10 grid border-t border-hairline md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <article
                  key={article.reference}
                  className="flex flex-col border-b border-hairline py-8 md:px-8 md:odd:pl-0 lg:[&:nth-child(3n+1)]:pl-0 lg:[&:nth-child(3n)]:pr-0 md:[&:nth-child(2n)]:pr-0 lg:[&:nth-child(2n)]:pr-8"
                >
                  <p className="text-[12px] text-steel">
                    {article.category} · {article.readTime} read
                  </p>
                  <h2 className="mt-3 text-[20px] font-medium leading-[1.3] tracking-[-0.01em] text-navy">
                    <Link
                      to="/research/$slug"
                      params={{ slug: article.slug }}
                      className="transition-colors hover:text-labblue"
                    >
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-steel">
                    {article.summary}
                  </p>
                  <Link
                    to="/research/$slug"
                    params={{ slug: article.slug }}
                    className="link-line mt-5 inline-flex w-fit text-[14px] text-labblue"
                  >
                    Read article
                  </Link>
                </article>
              ))}
            </div>
            <p className="mt-10 text-[13px] text-steel">
              Full articles are in preparation. Contact us for anything you need sooner.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
