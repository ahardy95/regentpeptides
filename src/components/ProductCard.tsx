import { Link, useNavigate } from "@tanstack/react-router";
import { formatPrice, type ShopifyProductEdge } from "@/lib/shopify.config";
import { VialImage } from "@/components/VialImage";
import { categoryOf } from "@/lib/productFilters";
import { formBadge, productKind } from "@/lib/productKind";
import { useCartStore, buildCartItem, getDefaultVariant } from "@/lib/cartStore";

interface ProductCardProps {
  product: ShopifyProductEdge;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const price = product.node.priceRange.minVariantPrice;
  const variantCount = product.node.variants.edges.length;
  const kind = productKind(product.node);
  const doses = product.node.variants.edges
    .map((v) => v.node.title)
    .filter((t) => t && t !== "Default Title");
  const strength = doses[0] ?? null;


  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const variant = getDefaultVariant(product.node);
    if (!variant) return;
    await addItem(buildCartItem(product, variant, 1));
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    await handleAdd(e);
    navigate({ to: "/product/$handle", params: { handle: product.node.handle } });
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-38px_rgba(7,29,43,0.45)]">
      <Link
        to="/product/$handle"
        params={{ handle: product.node.handle }}
        className="block overflow-hidden border-b border-hairline bg-labwhite"
      >
        <div className="aspect-square">
          <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]">
            <VialImage title={product.node.title} dosage={strength} />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <p className="text-[9px] uppercase tracking-[0.22em] text-steel">
          {categoryOf(product.node.title)}
        </p>

        <Link
          to="/product/$handle"
          params={{ handle: product.node.handle }}
          className="mt-2 line-clamp-2 min-h-[2.5rem] font-display text-[14px] font-semibold leading-snug text-navy transition-colors hover:text-labblue sm:min-h-[2.75rem] sm:text-[17px]"
        >
          {product.node.title}
        </Link>

        <div className="mt-3 flex min-h-[1.75rem] flex-wrap gap-1.5">
          {[
            doses.length > 0
              ? `${doses.length} ${doses.length === 1 ? "SIZE" : "SIZES"}`
              : null,
            formBadge(kind),
          ]
            .filter(Boolean)
            .map((badge) => (
              <span
                key={badge as string}
                className="rounded-sm border border-hairline bg-labwhite px-2 py-1 text-[8px] font-medium uppercase tracking-[0.16em] text-steel"
              >
                {badge}
              </span>
            ))}
        </div>

        <div className="mt-3 flex min-h-[3rem] flex-col items-start justify-center gap-1 border-t border-hairline pt-3 sm:mt-4 sm:min-h-[3.25rem] sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-4">
          <p className="whitespace-nowrap font-display text-[15px] font-semibold text-ink sm:text-base">
            {variantCount > 1 ? "From " : ""}
            {formatPrice(price.amount, price.currencyCode)}
          </p>
          {kind !== "supply" && (
            <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[8px] uppercase tracking-[0.14em] text-verified sm:text-[9px] sm:tracking-[0.18em]">
              <span className="h-1.5 w-1.5 rounded-full bg-verified" aria-hidden />
              COA on request
            </span>
          )}
        </div>


        <div className="mt-auto flex flex-col gap-2 pt-3 sm:pt-4">
          <button
            onClick={handleBuyNow}
            disabled={isLoading}
            className="flex items-center justify-center rounded-lg bg-labblue py-2.5 font-display text-[9px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-navy disabled:opacity-60 sm:py-3 sm:text-[10px] sm:tracking-[0.22em]"
          >
            Buy Now
          </button>
          <button
            onClick={handleAdd}
            disabled={isLoading}
            className="flex items-center justify-center rounded-lg border border-navy py-2.5 font-display text-[9px] font-semibold uppercase tracking-[0.16em] text-navy transition-colors hover:bg-navy hover:text-white disabled:opacity-60 sm:py-3 sm:text-[10px] sm:tracking-[0.22em]"
          >
            Add to Cart
          </button>
          <Link
            to="/product/$handle"
            params={{ handle: product.node.handle }}
            className="text-center text-[8px] uppercase tracking-[0.16em] text-steel underline-offset-4 hover:text-labblue hover:underline sm:text-[9px] sm:tracking-[0.2em]"
          >
            View Compound
          </Link>
        </div>
      </div>
    </article>
  );
}
