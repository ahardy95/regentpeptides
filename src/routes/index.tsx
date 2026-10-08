import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { TrustBar } from "@/components/TrustBar";
import { HeroShowcase } from "@/components/HeroShowcase";
import { DeliveryCountdown } from "@/components/DeliveryCountdown";
import { BatchVerification } from "@/components/BatchVerification";
import { Chromatogram } from "@/components/Chromatogram";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useCartSync } from "@/lib/cartStore";
import { getProducts } from "@/lib/products.functions";

import { FAQ_CATEGORIES } from "@/lib/faqs";
import { RESEARCH_ARTICLES } from "@/lib/researchLibrary";

const title = "Regent Peptides | UK Research Peptides, Independently Tested";
const description =
  "UK-manufactured research peptides with independent third-party testing, batch traceability and quality documentation. For research use only.";

const productsQueryOptions = {
  queryKey: ["products"] as const,
  queryFn: () => getProducts(),
  staleTime: 5 * 60 * 1000,
};

export const Route = createFileRoute("/")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(productsQueryOptions),
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
  component: HomePage,
});

// First row: non-GLP favourites. Second row: the GLP-1 trio.
const TOP_SELLERS = [
  "bpc",
  "tb-500",
  "tb500",
  "ghk",
  "ipamorelin",
];

const SECOND_ROW = ["tirz", "sema", "reta"];




const STAGES = [
  {
    number: "01",
    name: "Source",
    copy: "Raw material assessed against defined identity criteria on receipt.",
  },
  {
    number: "02",
    name: "Manufacture",
    copy: "Synthesis and lyophilisation under controlled UK conditions.",
  },
  {
    number: "03",
    name: "Analyse",
    copy: "Independent third-party HPLC and mass spectrometry analysis.",
  },
  {
    number: "04",
    name: "Verify",
    copy: "Batch reference assigned and documentation compiled before release.",
  },
];

function HomePage() {
  const { data: products, isPending } = useQuery(productsQueryOptions);

  useCartSync();

  const featured = useMemo(() => {
    const list = products ?? [];
    const pick = (keys: string[]) =>
      keys
        .map((key) =>
          list.filter((edge) =>
            `${edge.node.title} ${edge.node.handle}`
              .toLowerCase()
              .includes(key)
          )
        )
        .flat()
        .filter(
          (edge, i, arr) =>
            arr.findIndex((e) => e.node.id === edge.node.id) === i
        );

    const second = pick(SECOND_ROW).slice(0, 3);
    const secondIds = new Set(second.map((e) => e.node.id));
    const first = pick(TOP_SELLERS)
      .filter((e) => !secondIds.has(e.node.id))
      .slice(0, 3);
    return [...first, ...second];
  }, [products]);



  const [activeCategory, setActiveCategory] = useState<string>(
    FAQ_CATEGORIES[0]?.name ?? ""
  );
  const activeCategoryData = FAQ_CATEGORIES.find(
    (category) => category.name === activeCategory
  );

  return (
    <div className="min-h-screen bg-labwhite text-ink">
      <SiteHeader />

      <main className="pt-[110px] lg:pt-[156px]">
        <TrustBar />

        <HeroShowcase />


        {/* Catalogue */}
        <section
          id="catalog"
          className="border-b border-hairline bg-white px-6 py-16 md:px-10 md:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-labblue">
                  Laboratory Research Compounds
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.02em] text-navy md:text-4xl">
                  Batch-tested peptides
                </h2>
              </div>
              <Link
                to="/collection"
                className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-labblue underline-offset-4 hover:underline"
              >
                View all compounds
              </Link>
            </div>

            {isPending ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[3/4] animate-pulse rounded-xl bg-clinical"
                  />
                ))}
              </div>
            ) : featured.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featured.slice(0, 6).map((edge) => (
                  <ProductCard key={edge.node.id} product={edge} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-hairline py-24 text-center">
                <p className="font-display text-xl text-navy">
                  Catalogue in preparation
                </p>
              </div>
            )}

            {featured.length > 0 && (
              <div className="mt-10 flex justify-center">
                <Link
                  to="/collection"
                  className="inline-flex items-center gap-2 rounded-lg border border-navy px-8 py-3.5 font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-navy transition-colors hover:bg-navy hover:text-white"
                >
                  Show more
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Quality process */}
        <section className="relative overflow-hidden border-b border-hairline bg-navy px-6 py-16 md:px-10 md:py-24">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 text-cyan opacity-40">
            <Chromatogram className="h-full w-full" />
          </div>
          <div className="relative mx-auto max-w-7xl">
            <p className="text-[10px] uppercase tracking-[0.28em] text-cyan">
              Verification at Every Stage
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
              Quality shouldn’t require trust. It should provide evidence.
            </h2>
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {STAGES.map((stage) => (
                <article
                  key={stage.number}
                  className="rounded-xl border border-white/12 bg-white/[0.04] p-6"
                >
                  <p className="font-mono text-[11px] tracking-[0.2em] text-cyan">
                    {stage.number}
                  </p>
                  <h3 className="mt-4 font-display text-[12px] font-semibold uppercase tracking-[0.2em] text-white">
                    {stage.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-platinum/85">
                    {stage.copy}
                  </p>
                </article>
              ))}
            </div>
            <Link
              to="/quality"
              className="mt-10 inline-flex rounded-lg border border-cyan/50 px-7 py-3.5 font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan transition-colors hover:bg-cyan hover:text-navy"
            >
              Our Quality Standards
            </Link>
          </div>
        </section>

        {/* Lab reports */}
        <section className="border-b border-hairline bg-white px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-labblue">
                  Quality Control Portal
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.02em] text-navy md:text-4xl">
                  Batch verification
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-steel">
                Search available analytical documentation by product or batch
                reference.
              </p>
            </div>
            <BatchVerification limit={5} />
            <Link
              to="/lab-reports"
              className="mt-8 inline-flex font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-labblue underline-offset-4 hover:underline"
            >
              View all lab reports
            </Link>
          </div>
        </section>

        {/* Delivery */}
        <section className="border-b border-hairline px-6 py-14 md:px-10">
          <DeliveryCountdown className="mx-auto max-w-3xl" />
        </section>

        {/* Research library */}
        <section className="border-b border-hairline px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-labblue">
                  Research Library
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.02em] text-navy md:text-4xl">
                  Technical reference
                </h2>
              </div>
              <Link
                to="/research"
                className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-labblue underline-offset-4 hover:underline"
              >
                Browse library
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {RESEARCH_ARTICLES.slice(0, 3).map((article) => (
                <article
                  key={article.reference}
                  className="flex flex-col rounded-xl border border-hairline bg-white p-7"
                >
                  <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-steel">
                    <span>{article.category}</span>
                    <span className="font-mono text-platinum">
                      {article.reference}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-navy">
                    {article.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-steel">
                    {article.summary}
                  </p>
                  <span className="mt-6 border-t border-hairline pt-4 text-[9px] uppercase tracking-[0.2em] text-steel">
                    {article.readTime} read
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-hairline bg-white px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-5xl">
            <p className="text-[10px] uppercase tracking-[0.28em] text-labblue">
              Support
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.02em] text-navy md:text-4xl">
              Frequently asked questions
            </h2>

            <div className="mt-8 flex flex-wrap gap-2">
              {FAQ_CATEGORIES.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={cn(
                    "rounded-full border px-4 py-2 font-display text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors",
                    activeCategory === category.name
                      ? "border-navy bg-navy text-white"
                      : "border-hairline bg-labwhite text-steel hover:border-navy hover:text-navy"
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {activeCategoryData && (
              <Accordion type="single" collapsible className="mt-8">
                {activeCategoryData.items.map((item, index) => (
                  <AccordionItem
                    key={item.q}
                    value={`item-${index}`}
                    className="border-hairline"
                  >
                    <AccordionTrigger className="text-left font-display text-[15px] font-semibold text-navy hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-steel">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </section>

        {/* Compliance */}
        <section className="bg-clinical px-6 py-14 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-navy">
              For research use only. Not for human consumption.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-steel">
              All products supplied by Regent Peptides are intended solely for
              laboratory research and analytical use. They are not medicines and
              are not supplied for diagnostic, therapeutic, veterinary or
              household purposes. Purchasers must be appropriately qualified and
              responsible for compliant handling, storage and disposal.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
