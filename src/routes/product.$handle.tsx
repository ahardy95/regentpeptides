import { createFileRoute, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  useCartStore,
  buildCartItem,
  getDefaultVariant,
} from "@/lib/cartStore";
import { getProductByHandle } from "@/lib/products.functions";
import { formatPrice } from "@/lib/shopify.config";
import { VialImage } from "@/components/VialImage";
import { technicalDataFor } from "@/lib/technicalData";
import { DeliveryCountdown } from "@/components/DeliveryCountdown";
import { HANDLING_NOTE, productSummary } from "@/lib/productCopy";
import { FrequentlyBoughtTogether } from "@/components/FrequentlyBoughtTogether";
import { syncCartAttribution } from "@/lib/cartStore";
import { trackInitiateCheckout, trackViewContent } from "@/lib/metaPixel";

const NAME_OVERRIDES: Record<string, string> = {
  "bpc-157": "BPC-157",
  "tb-500": "TB-500",
  "ghk-cu": "GHK-Cu",
  "mots-c": "MOTS-c",
  kpv: "KPV",
  klow: "KLOW Blend",
  nad: "NAD+",
  "pt-141": "PT-141",
  "hgh-fragment-176-191": "HGH Fragment 176-191",
};

function prettyName(handle: string) {
  const key = handle.toLowerCase();
  if (NAME_OVERRIDES[key]) return NAME_OVERRIDES[key];
  return handle
    .split("-")
    .map((part) =>
      /^\d/.test(part)
        ? part.toUpperCase()
        : part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join(" ")
    .replace(/\bBpc\b/, "BPC")
    .replace(/\bTb\b/, "TB")
    .replace(/\bGhk\b/, "GHK")
    .replace(/\bCu\b/, "Cu")
    .replace(/\bKpv\b/, "KPV")
    .replace(/\bMots\b/, "MOTS")
    .replace(/\bPt\b/, "PT");
}

const productQueryOptions = (handle: string) => ({
  queryKey: ["product", handle] as const,
  queryFn: () => getProductByHandle({ data: { handle } }),
  staleTime: 5 * 60 * 1000,
});

export const Route = createFileRoute("/product/$handle")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(productQueryOptions(params.handle)),
  head: ({ params }) => {
    const name = prettyName(params.handle);
    const title = `${name} | Regent Peptides`;
    const description = `${name} research material, supplied in the UK for laboratory research use only. HPLC tested, certificate of analysis available on request.`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});


function ProductPage() {
  const { handle } = useParams({ from: "/product/$handle" });
  const { data: product } = useQuery(productQueryOptions(handle));

  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (product) {
      setSelectedVariantId(getDefaultVariant(product)?.id ?? null);
    }
  }, [product]);

  // Meta Pixel ViewContent — fires once per product page view.
  useEffect(() => {
    if (!product) return;
    const defaultVariant = getDefaultVariant(product);
    trackViewContent({
      id: defaultVariant?.id ?? product.id,
      name: product.title,
      price:
        defaultVariant?.price.amount ?? product.priceRange.minVariantPrice.amount,
    });
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-labwhite text-ink">
        <SiteHeader />
        <main className="px-8 pb-24 pt-40 text-center">
          <h1 className="font-display text-4xl">Formulation not found</h1>
          <p className="mt-4 text-steel">
            This protocol may no longer be available.
          </p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const variants = product.variants.edges.map((e) => e.node);
  const variant =
    variants.find((v) => v.id === selectedVariantId) ??
    getDefaultVariant(product);
  const price = variant?.price ?? product.priceRange.minVariantPrice;

  const handleAddToCart = async () => {
    if (!variant) return;
    await addItem(buildCartItem({ node: product }, variant, 1));
  };

  const handleBuyNow = async () => {
    if (!variant) return;
    await addItem(buildCartItem({ node: product }, variant, 1));
    const url = useCartStore.getState().getCheckoutUrl();
    if (url) {
      trackInitiateCheckout(useCartStore.getState().items);
      syncCartAttribution();
      window.open(url, "_blank");
    }
  };

  const technicalData = technicalDataFor(product, variant);

  return (
    <div className="min-h-screen bg-labwhite text-ink">
      <SiteHeader />
      <main className="flex flex-col border-t border-hairline pt-24 md:flex-row md:pt-0">
        <div className="relative flex min-h-[420px] w-full flex-col items-center justify-center gap-8 overflow-hidden border-hairline bg-white p-8 md:min-h-screen md:w-[55%] md:border-r md:p-16">
          <div className="w-full max-w-[560px] rounded-lg border border-hairline bg-labwhite p-5 md:p-6">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.24em] text-labblue">
              {HANDLING_NOTE.heading}
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-steel">
              {HANDLING_NOTE.body}
            </p>
            <p className="mt-2 text-[11px] italic leading-relaxed text-steel">
              {HANDLING_NOTE.footnote}
            </p>
          </div>
          <div className="aspect-square w-full max-w-[520px] scale-[0.88]">
            <VialImage
              title={product.title}
              dosage={variant?.title ?? null}
              eager
            />
          </div>
        </div>

        <div className="flex w-full flex-col justify-center bg-white p-8 md:w-[45%] md:p-16 md:pt-32">
          <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-labblue">
            Research Formulation
          </p>
          <h1 className="font-display text-4xl leading-tight md:text-5xl">
            {product.title}
          </h1>
          <p className="mt-6 font-display text-4xl font-semibold leading-none text-labblue md:text-5xl">
            {formatPrice(price.amount, price.currencyCode)}
          </p>

          {variants.length > 1 && (
            <div className="mt-10">
              <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-steel">
                {product.options[0]?.name ?? "Dosage"}
              </p>
              <div className="flex flex-wrap gap-3">
                {variants.map((v) => {
                  const active = v.id === variant?.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariantId(v.id)}
                      disabled={!v.availableForSale}
                      className={`border px-5 py-3 text-[10px] uppercase tracking-[0.2em] transition-colors ${
                        active
                          ? "border-navy bg-navy text-white"
                          : "border-hairline text-ink hover:border-navy hover:text-labblue"
                      } disabled:cursor-not-allowed disabled:line-through disabled:opacity-40`}
                    >
                      {v.title}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {variants.length === 1 && variant && (
            <p className="mt-2 text-sm text-steel">{variant.title}</p>
          )}

          <div className="mt-8 leading-relaxed text-steel">
            <p className="text-[15px]">{productSummary(product.title)}</p>
            {product.description ? (
              <p className="mt-4 whitespace-pre-line">{product.description}</p>
            ) : null}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isLoading || !variant}
            className="mt-10 w-full border border-navy bg-navy py-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-white transition-colors hover:bg-white hover:text-labblue disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            disabled={isLoading || !variant}
            className="mt-3 w-full border border-navy/25 py-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-ink transition-colors hover:border-navy hover:text-labblue disabled:cursor-not-allowed disabled:opacity-50"
          >
            Buy Now
          </button>

          <DeliveryCountdown className="mt-8" />

          <ul className="mt-10 space-y-3 border-t border-hairline pt-8 text-[10px] uppercase tracking-[0.2em] text-steel">
            <li>UK manufactured</li>
            <li>HPLC tested — COA available on request</li>
            <li>Tracked UK delivery from £4.99</li>

          </ul>
        </div>
      </main>

      <section className="border-t border-hairline px-8 py-20 md:px-16 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-labblue">
            Specification
          </p>
          <h2 className="font-display text-3xl md:text-4xl">Technical Data</h2>

          <div className="mt-10 border-t border-navy/15">
            {technicalData.map((group) => (
              <div key={group.heading}>
                <h3 className="border-b border-navy/15 bg-navy/5 px-5 py-4 text-[10px] uppercase tracking-[0.3em] text-labblue">
                  {group.heading}
                </h3>
                <dl>
                  {group.rows.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex flex-col gap-1 border-b border-hairline px-5 py-4 sm:flex-row sm:gap-8"
                    >
                      <dt className="text-[11px] uppercase tracking-[0.15em] text-steel sm:w-72 sm:shrink-0">
                        {label}
                      </dt>
                      <dd className="text-sm leading-relaxed text-ink">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs leading-relaxed text-steel">
            For in-vitro laboratory research use only. Not a medicinal product.
            Not for human, veterinary, diagnostic, therapeutic or in-vivo use.
          </p>
        </div>
      </section>

      <FrequentlyBoughtTogether title={product.title} handle={product.handle} />

      <SiteFooter />
    </div>
  );
}
