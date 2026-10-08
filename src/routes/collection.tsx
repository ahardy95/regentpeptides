import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { TrustBar } from "@/components/TrustBar";
import { cn } from "@/lib/utils";
import { useCartSync } from "@/lib/cartStore";
import { getProducts } from "@/lib/products.functions";
import {
  PRICE_BANDS,
  SORT_OPTIONS,
  priceOf,
  sortProducts,
  type SortKey,
} from "@/lib/productFilters";

const title = "The Collection | Regent Peptides";
const description =
  "Browse the full Regent Peptides catalogue — UK manufactured, independently tested research peptides with every dosage variant and batch documentation.";

const productsQueryOptions = {
  queryKey: ["products"] as const,
  queryFn: () => getProducts(),
  staleTime: 5 * 60 * 1000,
};

export const Route = createFileRoute("/collection")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(productsQueryOptions),
  validateSearch: (
    search: Record<string, unknown>
  ): { category?: string; q?: string } => ({
    ...(typeof search["category"] === "string"
      ? { category: search["category"] }
      : {}),
    ...(typeof search["q"] === "string" && search["q"] ? { q: search["q"] } : {}),
  }),

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
  component: CollectionPage,
});

function CollectionPage() {
  const { q: urlQuery } = Route.useSearch();
  const { data: products, isPending } = useQuery(productsQueryOptions);

  useCartSync();

  const [bands, setBands] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("featured");
  const [query, setQuery] = useState(urlQuery ?? "");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Keep the sidebar search in step with the header search (?q=).
  useEffect(() => {
    setQuery(urlQuery ?? "");
  }, [urlQuery]);


  const all = products ?? [];


  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = all.filter((edge) => {
      if (bands.length) {
        const price = priceOf(edge);
        const inBand = PRICE_BANDS.some(
          (band) =>
            bands.includes(band.label) && price >= band.min && price < band.max
        );
        if (!inBand) return false;
      }
      if (q && !edge.node.title.toLowerCase().includes(q)) return false;
      return true;
    });
    return sortProducts(list, sort);
  }, [all, bands, query, sort]);

  const toggle = (
    value: string,
    list: string[],
    set: (next: string[]) => void
  ) =>
    set(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );

  const clearAll = () => {
    setBands([]);
    setQuery("");
  };

  const activeFilterCount = bands.length;

  const CheckRow = ({
    label,
    count,
    checked,
    onChange,
  }: {
    label: string;
    count?: number | undefined;
    checked: boolean;
    onChange: () => void;
  }) => (
    <label className="flex cursor-pointer items-center justify-between py-2.5 text-sm text-steel transition-colors hover:text-labblue">
      <span className="flex items-center gap-3">
        <span
          className={cn(
            "flex h-4 w-4 items-center justify-center border text-[9px]",
            checked
              ? "border-navy bg-navy text-white"
              : "border-hairline"
          )}
          aria-hidden
        >
          {checked ? "✓" : ""}
        </span>
        {label}
      </span>
      {typeof count === "number" && (
        <span className="text-[10px] tracking-widest text-steel">
          {count}
        </span>
      )}
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
    </label>
  );

  const filterPanel = (
    <div className="space-y-10">
      <div>
        <h3 className="mb-3 text-[10px] uppercase tracking-[0.25em] text-labblue">
          Search
        </h3>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search peptides"
          className="w-full border border-hairline bg-transparent px-3 py-2.5 text-sm text-ink outline-none placeholder:text-steel focus:border-navy"
        />
      </div>


      <div>
        <h3 className="mb-3 text-[10px] uppercase tracking-[0.25em] text-labblue">
          Price
        </h3>
        <div className="divide-y divide-hairline border-y border-hairline">
          {PRICE_BANDS.map((band) => (
            <CheckRow
              key={band.label}
              label={band.label}
              checked={bands.includes(band.label)}
              onChange={() => toggle(band.label, bands, setBands)}
            />
          ))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={clearAll}
          className="text-[10px] uppercase tracking-[0.25em] text-labblue hover:text-labblue"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-labwhite text-ink">
      <SiteHeader />

      <main className="pt-24">
        <section className="border-b border-hairline px-6 py-14 md:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-labblue">
              Shop / All Compounds
            </p>
            <h1 className="font-display text-4xl md:text-5xl">
              Research compounds
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-steel">
              The complete Regent Peptides catalogue. Every compound is
              manufactured in the UK, independently tested and released with a
              batch reference. For research use only. Not for human
              consumption.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
          <div className="flex flex-col gap-10 lg:flex-row">
            <aside className="lg:w-64 lg:shrink-0">
              <button
                onClick={() => setFiltersOpen((o) => !o)}
                className="mb-4 w-full border border-navy py-3 text-[10px] uppercase tracking-[0.25em] text-labblue transition-colors hover:bg-navy hover:text-white lg:hidden"
              >
                {filtersOpen ? "Hide filters" : `Filters${activeFilterCount ? ` (${activeFilterCount})` : ""}`}
              </button>
              <div className={cn("lg:block", filtersOpen ? "block" : "hidden")}>
                {filterPanel}
              </div>
            </aside>

            <div className="flex-1">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-steel">
                  {isPending ? "Loading" : `${filtered.length} products`}
                </p>
                <label className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-steel">
                  Sort
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="border border-hairline bg-labwhite px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-ink outline-none focus:border-navy"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {isPending ? (
                <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="aspect-[3/4] animate-pulse bg-clinical"
                    />
                  ))}
                </div>
              ) : filtered.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((edge) => (
                    <ProductCard key={edge.node.id} product={edge} />
                  ))}
                </div>
              ) : (
                <div className="border border-hairline py-24 text-center">
                  <p className="font-display text-2xl ">
                    No products match these filters
                  </p>
                  <button
                    onClick={clearAll}
                    className="mt-6 text-[10px] uppercase tracking-[0.25em] text-labblue hover:text-labblue"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <TrustBar />
      </main>

      <SiteFooter />
    </div>
  );
}
