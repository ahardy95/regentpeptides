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

const title = "Research Peptides UK | Independently Tested, Batch Documented | Regent Peptides";
const description =
  "Buy research peptides in the UK from Regent Peptides: BPC-157, TB-500, GHK-Cu, Tirzepatide, Semaglutide and more. UK manufactured, HPLC and mass-spec tested by an independent lab, Certificate of Analysis per batch, tracked delivery from £4.99.";

const productsQueryOptions = {
  queryKey: ["products"] as const,
  queryFn: () => getProducts(),
  staleTime: 5 * 60 * 1000,
};

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions),
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
const TOP_SELLERS = ["bpc", "tb-500", "tb500", "ghk", "ipamorelin"];

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
  const initial = Route.useLoaderData();
  const { data: products, isPending } = useQuery({
    ...productsQueryOptions,
    initialData: initial,
  });

  useCartSync();

  const featured = useMemo(() => {
    const list = products ?? [];
    const pick = (keys: string[]) =>
      keys
        .map((key) =>
          list.filter((edge) =>
            `${edge.node.title} ${edge.node.handle}`.toLowerCase().includes(key),
          ),
        )
        .flat()
        .filter((edge, i, arr) => arr.findIndex((e) => e.node.id === edge.node.id) === i);

    const second = pick(SECOND_ROW).slice(0, 3);
    const secondIds = new Set(second.map((e) => e.node.id));
    const first = pick(TOP_SELLERS)
      .filter((e) => !secondIds.has(e.node.id))
      .slice(0, 3);
    return [...first, ...second];
  }, [products]);

  const [activeCategory, setActiveCategory] = useState<string>(FAQ_CATEGORIES[0]?.name ?? "");
  const activeCategoryData = FAQ_CATEGORIES.find((category) => category.name === activeCategory);

  return (
    <div className="min-h-screen bg-labwhite text-ink">
      <SiteHeader />

      <main className="pt-[102px] lg:pt-[160px]">
        <TrustBar />

        <HeroShowcase />

        {/* Catalogue */}
        <section
          id="catalog"
          className="reveal border-b border-hairline bg-white px-6 py-20 md:px-10 md:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <h2 className="headline text-[36px] text-navy md:text-[44px]">
                Batch-tested peptides
              </h2>
              <Link to="/collection" className="link-line text-[14px] text-labblue">
                View all compounds →
              </Link>
            </div>

            {isPending ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-square animate-pulse bg-clinical" />
                ))}
              </div>
            ) : featured.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
                {featured.slice(0, 6).map((edge) => (
                  <ProductCard key={edge.node.id} product={edge} />
                ))}
              </div>
            ) : (
              <div className="border-y border-hairline py-24 text-center">
                <p className="text-xl font-medium text-navy">Catalogue in preparation</p>
              </div>
            )}

            {featured.length > 0 && (
              <div className="mt-14 flex justify-center">
                <Link
                  to="/collection"
                  className="inline-flex items-center border border-navy px-7 py-3.5 text-[14px] font-medium text-navy transition-colors hover:bg-navy hover:text-white"
                >
                  Browse the full range
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Quality process */}
        <section className="reveal border-b border-hairline bg-navy px-6 py-20 text-white md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
              <h2 className="headline max-w-md text-[36px] md:text-[46px]">
                Quality shouldn’t require trust.{" "}
                <em className="text-cyan">It should provide evidence.</em>
              </h2>
              <div>
                <p className="max-w-xl text-[16px] leading-[1.65] text-white/70">
                  Every batch passes through the same four stages before it is released. Nothing
                  ships on assumption; each step leaves a document you can ask to see.
                </p>
                <Link
                  to="/quality"
                  className="mt-8 inline-flex items-center border border-white/35 px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-white hover:text-navy"
                >
                  Our quality standards
                </Link>
              </div>
            </div>
            <ol className="mt-16 grid gap-y-10 border-t border-white/15 md:grid-cols-4 md:gap-x-10">
              {STAGES.map((stage) => (
                <li key={stage.number} className="pt-7">
                  <p className="text-[13px] font-medium tracking-[0.12em] text-cyan">
                    {stage.number}
                  </p>
                  <h3 className="mt-5 text-[16px] font-semibold text-white">{stage.name}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/65">{stage.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Lab reports */}
        <section className="reveal border-b border-hairline bg-white px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <h2 className="headline text-[36px] text-navy md:text-[44px]">Batch verification</h2>
              <p className="max-w-sm text-[15px] leading-relaxed text-steel">
                Search analytical documentation by product or batch reference.
              </p>
            </div>
            <BatchVerification limit={5} />
            <Link to="/lab-reports" className="link-line mt-8 inline-flex text-[14px] text-labblue">
              View all lab reports →
            </Link>
          </div>
        </section>

        {/* Delivery */}
        <section className="reveal border-b border-hairline bg-labwhite px-6 md:px-10">
          <DeliveryCountdown className="mx-auto max-w-7xl" />
        </section>

        {/* Research library */}
        <section className="reveal border-b border-hairline px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <h2 className="headline text-[36px] text-navy md:text-[44px]">Technical reference</h2>
              <Link to="/research" className="link-line text-[14px] text-labblue">
                Browse the library →
              </Link>
            </div>
            <div className="grid border-t border-hairline md:grid-cols-3">
              {[
                "compound-profile-tirzepatide",
                "compound-profile-bpc-157",
                "glp-1-agonists-compared",
              ]
                .map((slug) => RESEARCH_ARTICLES.find((a) => a.slug === slug))
                .filter((a): a is (typeof RESEARCH_ARTICLES)[number] => Boolean(a))
                .map((article) => (
                  <article
                    key={article.reference}
                    className="flex flex-col border-b border-hairline py-7 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                  >
                    <p className="text-[12px] text-steel">
                      {article.category} · {article.readTime} read
                    </p>
                    <h3 className="mt-3 text-[19px] font-medium leading-[1.3] tracking-[-0.01em] text-navy">
                      <Link
                        to="/research/$slug"
                        params={{ slug: article.slug }}
                        className="transition-colors hover:text-labblue"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <p className="mt-3 flex-1 text-[14px] leading-relaxed text-steel">
                      {article.summary}
                    </p>
                  </article>
                ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="reveal border-b border-hairline bg-white px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="headline text-[36px] text-navy md:text-[44px]">
              Frequently asked questions
            </h2>

            <div className="mt-8 flex flex-wrap gap-2">
              {FAQ_CATEGORIES.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={cn(
                    "border px-4 py-2 text-[13px] font-medium transition-colors",
                    activeCategory === category.name
                      ? "border-navy bg-navy text-white"
                      : "border-hairline bg-white text-steel hover:border-navy hover:text-navy",
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {activeCategoryData && (
              <Accordion type="single" collapsible className="mt-8">
                {activeCategoryData.items.map((item, index) => (
                  <AccordionItem key={item.q} value={`item-${index}`} className="border-hairline">
                    <AccordionTrigger className="py-5 text-left text-[16px] font-medium text-navy hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[15px] leading-relaxed text-steel">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </section>

        {/* Compliance */}
        <section className="reveal bg-clinical px-6 py-16 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[17px] font-medium text-navy">
              For research use only. Not for human consumption.
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-steel">
              All products supplied by Regent Peptides are intended solely for laboratory research
              and analytical use. They are not medicines and are not supplied for diagnostic,
              therapeutic, veterinary or household purposes. Purchasers must be appropriately
              qualified and responsible for compliant handling, storage and disposal.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
