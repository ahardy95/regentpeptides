import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useCartStore, buildCartItem, getDefaultVariant } from "@/lib/cartStore";
import { getProductByHandle } from "@/lib/products.functions";
import { formatPrice } from "@/lib/shopify.config";
import { VialImage } from "@/components/VialImage";
import { technicalDataFor } from "@/lib/technicalData";
import { DeliveryCountdown } from "@/components/DeliveryCountdown";
import { HANDLING_NOTE, productSummary } from "@/lib/productCopy";
import { productContentFor } from "@/lib/productContent";
import { RESEARCH_ARTICLES } from "@/lib/researchLibrary";
import { FrequentlyBoughtTogether } from "@/components/FrequentlyBoughtTogether";
import { syncCartAttribution } from "@/lib/cartStore";
import { trackInitiateCheckout, trackViewContent } from "@/lib/metaPixel";
import { LAB_REPORTS } from "@/lib/labReports";
import { ReconstitutionCalculator } from "@/components/ReconstitutionCalculator";
import { productKind } from "@/lib/productKind";

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
      /^\d/.test(part) ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1),
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
  head: ({ params, loaderData }) => {
    const product = loaderData ?? null;
    const content = productContentFor(params.handle);
    const name = content?.name ?? product?.title ?? prettyName(params.handle);
    const variants = product?.variants.edges.map((e) => e.node) ?? [];
    const sizes = variants
      .map((v) => v.title)
      .filter((t) => t && t !== "Default Title")
      .join(", ");
    const title = `${name}${sizes ? ` ${sizes}` : ""} | UK Research Peptide, HPLC Tested | Regent Peptides`;
    const description = content
      ? `${name} research peptide, UK supplied${sizes ? ` in ${sizes} vials` : ""}. ${content.tagline}. Independently HPLC and mass-spec tested, Certificate of Analysis per batch, tracked delivery from £4.99. Research use only.`
      : `Buy ${name} research peptide in the UK${sizes ? ` (${sizes} vials)` : ""}. UK manufactured, independently HPLC and mass-spec tested, batch-numbered with Certificate of Analysis. Tracked delivery from £4.99. Research use only.`;
    const url = `https://regentpeptides.com/product/${params.handle}`;
    const prices = variants.map((v) => parseFloat(v.price.amount)).filter((n) => n > 0);
    const low = prices.length ? Math.min(...prices) : null;
    const high = prices.length ? Math.max(...prices) : null;
    const inStock = variants.some((v) => v.availableForSale);

    const productLd = product
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name,
          sku: product.handle,
          url,
          image: ["https://regentpeptides.com/og.jpg"],
          description,
          brand: { "@type": "Brand", name: "Regent Peptides" },
          category: "Research peptides",
          offers:
            low !== null && high !== null
              ? {
                  "@type": "AggregateOffer",
                  url,
                  priceCurrency: "GBP",
                  lowPrice: low.toFixed(2),
                  highPrice: high.toFixed(2),
                  offerCount: variants.length,
                  availability: inStock
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
                  seller: { "@id": "https://regentpeptides.com/#organization" },
                }
              : undefined,
        }
      : null;

    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://regentpeptides.com/" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Peptides",
          item: "https://regentpeptides.com/collection",
        },
        { "@type": "ListItem", position: 3, name, item: url },
      ],
    };

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        ...(productLd
          ? [{ type: "application/ld+json", children: JSON.stringify(productLd) }]
          : []),
        { type: "application/ld+json", children: JSON.stringify(breadcrumbLd) },
        ...(content
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: content.faqs.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                  })),
                }),
              },
            ]
          : []),
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { handle } = useParams({ from: "/product/$handle" });
  const initial = Route.useLoaderData();
  const { data: product } = useQuery({
    ...productQueryOptions(handle),
    initialData: initial,
  });

  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

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
      price: defaultVariant?.price.amount ?? product.priceRange.minVariantPrice.amount,
    });
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-labwhite text-ink">
        <SiteHeader />
        <main className="px-8 pb-24 pt-40 text-center">
          <h1 className="headline text-4xl text-navy">Product not found</h1>
          <p className="mt-4 text-steel">This compound may no longer be available.</p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const variants = product.variants.edges.map((e) => e.node);
  const variant = variants.find((v) => v.id === selectedVariantId) ?? getDefaultVariant(product);
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
  const content = productContentFor(product.handle);
  const relatedArticles = (content?.related ?? [])
    .map((slug) => RESEARCH_ARTICLES.find((a) => a.slug === slug))
    .filter((a): a is (typeof RESEARCH_ARTICLES)[number] => Boolean(a))
    .slice(0, 3);
  const vialMg = (() => {
    const m = /([0-9.]+)\s*mg/i.exec(variant?.title ?? "");
    return m?.[1] ? parseFloat(m[1]) : null;
  })();
  const isPeptide = productKind(product) !== "supply";
  const reports = LAB_REPORTS.filter((r) =>
    product.title.toLowerCase().includes(r.compound.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-labwhite text-ink">
      <SiteHeader />
      <main className="border-t border-hairline pt-[102px] lg:pt-[160px]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:px-10 md:py-16 lg:gap-24">
          {/* Imagery */}
          <div className="md:sticky md:top-[180px] md:self-start">
            <div className="vial-stage aspect-square w-full">
              <div className="h-full w-full p-8 md:p-12">
                <VialImage title={product.title} dosage={variant?.title ?? null} eager />
              </div>
            </div>
            <div className="mt-6 hidden border-t border-hairline pt-5 md:block">
              <p className="text-[13px] font-medium text-navy">{HANDLING_NOTE.heading}</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-steel">{HANDLING_NOTE.body}</p>
              <p className="mt-2 text-[12px] italic leading-relaxed text-steel/80">
                {HANDLING_NOTE.footnote}
              </p>
            </div>
          </div>

          {/* Purchase panel */}
          <div className="flex flex-col md:pt-4">
            <p className="eyebrow text-labblue">Research compound</p>
            <h1 className="headline mt-4 text-[44px] text-navy md:text-[56px]">{product.title}</h1>
            <p className="mt-5 text-[26px] leading-none text-navy">
              {formatPrice(price.amount, price.currencyCode)}
              {variant?.title && variant.title !== "Default Title" ? (
                <span className="ml-2 text-[15px] text-steel">/ {variant.title} vial</span>
              ) : null}
            </p>

            {variants.length > 1 && (
              <div className="mt-9">
                <p className="mb-3 text-[13px] text-steel">
                  {product.options[0]?.name ?? "Dosage"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v) => {
                    const active = v.id === variant?.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariantId(v.id)}
                        disabled={!v.availableForSale}
                        className={`border px-5 py-2.5 text-[14px] font-medium transition-colors ${
                          active
                            ? "border-navy bg-navy text-white"
                            : "border-hairline text-navy hover:border-navy"
                        } disabled:cursor-not-allowed disabled:line-through disabled:opacity-40`}
                      >
                        {v.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {content ? <p className="mt-3 text-[14px] text-steel">{content.tagline}</p> : null}

            <div className="mt-8 space-y-4 text-[15.5px] leading-[1.65] text-steel">
              {content ? (
                content.paragraphs.map((para) => <p key={para.slice(0, 40)}>{para}</p>)
              ) : (
                <>
                  <p>{productSummary(product.title)}</p>
                  {product.description ? (
                    <p className="whitespace-pre-line">{product.description}</p>
                  ) : null}
                </>
              )}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleAddToCart}
                disabled={isLoading || !variant}
                className="flex-1 bg-labblue px-6 py-4 text-[14px] font-medium text-white transition-colors hover:bg-navy disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add to basket
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isLoading || !variant}
                className="flex-1 border border-navy/30 px-6 py-4 text-[14px] font-medium text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Buy now
              </button>
            </div>

            <div className="mt-8 border-y border-hairline">
              <DeliveryCountdown stack />
            </div>

            <div className="mt-8">
              <div className="flex items-baseline justify-between">
                <h2 className="text-[15px] font-semibold text-navy">Independent testing</h2>
                <Link
                  to="/lab-reports"
                  className="text-[13px] text-labblue underline-offset-4 hover:underline"
                >
                  All lab reports
                </Link>
              </div>
              {reports.length > 0 ? (
                <ul className="mt-3 divide-y divide-hairline border-y border-hairline">
                  {reports.map((r) => (
                    <li
                      key={r.batch}
                      className="flex items-center justify-between gap-4 py-3 text-[13.5px]"
                    >
                      <span className="min-w-0">
                        <span className="text-navy">
                          {r.compound}
                          {r.strength ? ` ${r.strength}` : ""}
                        </span>
                        <span className="ml-2 font-mono text-[11.5px] text-steel">{r.batch}</span>
                      </span>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-labblue underline-offset-4 hover:underline"
                      >
                        View certificate
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 border-y border-hairline py-3 text-[13.5px] text-steel">
                  HPLC and mass spectrometry on every batch. Certificate of Analysis available on
                  request.
                </p>
              )}
              <p className="mt-3 text-[12.5px] leading-relaxed text-steel">
                Third-party analysis by Janoshik Analytical. Each certificate is verifiable on the
                laboratory’s own site.
              </p>
            </div>

            <ul className="mt-6 space-y-2 text-[13.5px] text-steel">
              <li>Manufactured and lyophilised in the UK</li>
              <li>Plain, tracked packaging from £4.99</li>
              <li>For laboratory research use only</li>
            </ul>
            <div className="mt-8 border-t border-hairline pt-5 md:hidden">
              <p className="text-[13px] font-medium text-navy">{HANDLING_NOTE.heading}</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-steel">{HANDLING_NOTE.body}</p>
              <p className="mt-2 text-[12px] italic leading-relaxed text-steel/80">
                {HANDLING_NOTE.footnote}
              </p>
            </div>
          </div>
        </div>
      </main>

      <section className="border-t border-hairline px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-4xl">
          {isPeptide ? (
            <div className="mb-16">
              <ReconstitutionCalculator defaultMg={vialMg} />
            </div>
          ) : null}
          <h2 className="headline text-[36px] text-navy md:text-[44px]">Technical data</h2>

          <div className="mt-10 border-t border-navy/20">
            {content ? (
              <div>
                <h3 className="border-b border-hairline pb-3 pt-8 text-[13px] font-medium uppercase tracking-[0.1em] text-labblue">
                  Identity
                </h3>
                <dl>
                  {content.identity.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex flex-col gap-1 border-b border-hairline py-3.5 sm:flex-row sm:gap-8"
                    >
                      <dt className="text-[13.5px] text-steel sm:w-64 sm:shrink-0">{label}</dt>
                      <dd className="text-[14.5px] leading-relaxed text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
            {technicalData.map((group) => (
              <div key={group.heading}>
                <h3 className="border-b border-hairline pb-3 pt-8 text-[13px] font-medium uppercase tracking-[0.1em] text-labblue">
                  {group.heading}
                </h3>
                <dl>
                  {group.rows.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex flex-col gap-1 border-b border-hairline py-3.5 sm:flex-row sm:gap-8"
                    >
                      <dt className="text-[13.5px] text-steel sm:w-64 sm:shrink-0">{label}</dt>
                      <dd className="text-[14.5px] leading-relaxed text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[13px] leading-relaxed text-steel">
            For in-vitro laboratory research use only. Not a medicinal product. Not for human,
            veterinary, diagnostic, therapeutic or in-vivo use.
          </p>
        </div>
      </section>

      {content ? (
        <section className="border-t border-hairline bg-white px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
            <div>
              <h2 className="headline text-[32px] text-navy md:text-[40px]">
                {content.name} questions
              </h2>
              <dl className="mt-8 divide-y divide-hairline border-y border-hairline">
                {content.faqs.map((f) => (
                  <div key={f.q} className="py-5">
                    <dt className="text-[16px] font-medium text-navy">{f.q}</dt>
                    <dd className="mt-2 text-[15px] leading-[1.65] text-steel">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h2 className="headline text-[32px] text-navy md:text-[40px]">Research context</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-steel">
                Areas of published literature in which {content.name} is studied. Educational
                reference only; no administration guidance is provided.
              </p>
              <ul className="mt-6 space-y-2.5">
                {content.researchAreas.map((area) => (
                  <li key={area} className="flex items-start gap-3 text-[15px] text-navy">
                    <span
                      className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-labblue"
                      aria-hidden
                    />
                    {area}
                  </li>
                ))}
              </ul>
              {relatedArticles.length > 0 ? (
                <div className="mt-10 border-t border-hairline pt-6">
                  <p className="text-[13px] text-steel">Related reading</p>
                  <ul className="mt-3 space-y-2">
                    {relatedArticles.map((a) => (
                      <li key={a.slug}>
                        <Link
                          to="/research/$slug"
                          params={{ slug: a.slug }}
                          className="link-line text-[15px] text-labblue"
                        >
                          {a.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <FrequentlyBoughtTogether title={product.title} handle={product.handle} />

      <SiteFooter />
    </div>
  );
}
