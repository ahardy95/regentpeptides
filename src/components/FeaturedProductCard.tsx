import { Link } from "@tanstack/react-router";
import { useCartStore, buildCartItem, getDefaultVariant } from "@/lib/cartStore";
import { formatPrice, type ShopifyProductEdge } from "@/lib/shopify.config";
import { VialImage } from "@/components/VialImage";

interface FeaturedProductCardProps {
  product: ShopifyProductEdge;
}

export function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const price = product.node.priceRange.minVariantPrice;
  const variantCount = product.node.variants.edges.length;
  const doses = product.node.variants.edges
    .map((v) => v.node.title)
    .filter((t) => t && t !== "Default Title");

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const variant = getDefaultVariant(product.node);
    if (!variant) return;
    await addItem(buildCartItem(product, variant, 1));
  };

  return (
    <div className="group flex w-[260px] shrink-0 flex-col sm:w-[300px]">
      <Link
        to="/product/$handle"
        params={{ handle: product.node.handle }}
        className="relative mb-6 block overflow-hidden border border-hairline"
      >
        <div className="aspect-[3/4] bg-white">
          <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
            <VialImage title={product.node.title} dosage={doses[0] ?? null} />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex min-h-[3.5rem] items-baseline justify-between gap-4 border-t border-hairline pt-4">
          <h3 className="line-clamp-2 font-display text-xl leading-tight text-ink">
            {product.node.title}
          </h3>
          <p className="shrink-0 whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-labblue">
            {variantCount > 1 ? "From " : ""}
            {formatPrice(price.amount, price.currencyCode)}
          </p>
        </div>

        <p className="mt-2 line-clamp-1 min-h-[1rem] text-[10px] uppercase tracking-[0.2em] text-steel">
          {doses.length > 1 ? doses.join(" · ") : ""}
        </p>

        <div className="mt-auto flex flex-col gap-3 pt-5">
          <Link
            to="/product/$handle"
            params={{ handle: product.node.handle }}
            className="w-full bg-navy py-3 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:bg-ink hover:text-white"
          >
            Buy Now
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="w-full border border-hairline py-3 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-ink transition-colors hover:border-navy hover:text-labblue disabled:opacity-60"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
