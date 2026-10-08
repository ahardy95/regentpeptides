import { Link } from "@tanstack/react-router";
import { formatPrice, type ShopifyProductEdge } from "@/lib/shopify.config";
import { VialImage } from "@/components/VialImage";
import { categoryOf } from "@/lib/productFilters";
import { productKind } from "@/lib/productKind";
import { useCartStore, buildCartItem, getDefaultVariant } from "@/lib/cartStore";

interface ProductCardProps {
  product: ShopifyProductEdge;
}

export function ProductCard({ product }: ProductCardProps) {
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

  return (
    <article className="group flex h-full flex-col">
      <Link
        to="/product/$handle"
        params={{ handle: product.node.handle }}
        className="vial-stage block overflow-hidden transition-shadow duration-500 group-hover:shadow-[0_30px_50px_-40px_rgba(22,25,23,0.35)]"
      >
        <div className="aspect-square p-5 sm:p-7">
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
            <VialImage title={product.node.title} dosage={strength} />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <Link
            to="/product/$handle"
            params={{ handle: product.node.handle }}
            className="text-[16px] font-medium leading-tight tracking-[-0.01em] text-navy transition-colors hover:text-labblue sm:text-[18px]"
          >
            {product.node.title}
          </Link>
          <p className="shrink-0 text-[14px] text-ink sm:text-[15px]">
            {variantCount > 1 ? "From " : ""}
            {formatPrice(price.amount, price.currencyCode)}
          </p>
        </div>

        <p className="mt-1 text-[12.5px] text-steel">
          {categoryOf(product.node.title)}
          {doses.length > 0 ? ` · ${doses.join(" / ")}` : ""}
          {kind !== "supply" ? " · COA on request" : ""}
        </p>

        <div className="mt-auto flex items-center gap-4 pt-4 sm:pt-5">
          <button
            onClick={handleAdd}
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center whitespace-nowrap border border-navy px-4 py-2.5 text-[13px] font-medium text-navy transition-colors hover:bg-navy hover:text-white disabled:opacity-60 sm:w-auto sm:px-5"
          >
            Add to basket
          </button>
          <Link
            to="/product/$handle"
            params={{ handle: product.node.handle }}
            className="hidden text-[13px] text-steel underline-offset-4 transition-colors hover:text-navy hover:underline sm:inline"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
