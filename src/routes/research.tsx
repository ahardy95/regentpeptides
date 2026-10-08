import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useCartSync } from "@/lib/cartStore";
import {
  RESEARCH_ARTICLES,
  RESEARCH_CATEGORIES,
} from "@/lib/researchLibrary";
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

  return (
    <div className="min-h-screen bg-labwhite text-ink">
      <SiteHeader />
      <main className="pt-[110px] lg:pt-[156px]">
        <section className="border-b border-hairline bg-white px-6 py-16 md:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="text-[10px] uppercase tracking-[0.28em] text-labblue">
              Research Library
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-navy md:text-5xl">
              Reference material for laboratory work
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-steel">
              Summary notes on peptide identity, analytical methodology, quality
              documentation and laboratory handling. Educational reference only
              — no dosing or administration guidance is provided. Full articles
              are in preparation; contact us for anything you need sooner.
            </p>

          </div>
        </section>

        <section className="px-6 py-12 md:px-10 md:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setActive(null)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 font-display text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors",
                  active === null
                    ? "border-navy bg-navy text-white"
                    : "border-hairline bg-white text-steel hover:border-navy hover:text-navy"
                )}
              >
                All
              </button>
              {RESEARCH_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActive(category)}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 font-display text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors",
                    active === category
                      ? "border-navy bg-navy text-white"
                      : "border-hairline bg-white text-steel hover:border-navy hover:text-navy"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <article
                  key={article.reference}
                  className="group flex flex-col rounded-xl border border-hairline bg-white p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-38px_rgba(7,29,43,0.45)]"
                >
                  <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-steel">
                    <span>{article.category}</span>
                    <span className="font-mono tracking-[0.12em] text-platinum">
                      {article.reference}
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-lg font-semibold leading-snug text-navy">
                    {article.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-steel">
                    {article.summary}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4 text-[9px] uppercase tracking-[0.2em] text-steel">
                    <span>{article.readTime} read</span>
                  </div>

                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
