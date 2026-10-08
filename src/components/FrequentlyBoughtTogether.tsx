import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getProducts } from "@/lib/products.functions";
import { pairingPatterns } from "@/lib/productCopy";
import { ProductCard } from "@/components/ProductCard";
import type { ShopifyProductEdge } from "@/lib/shopify.config";

interface Props {
  title: string;
  handle: string;
}

export function FrequentlyBoughtTogether({ title, handle }: Props) {
  const fetchProducts = useServerFn(getProducts);
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });

  const all: ShopifyProductEdge[] = (data ?? []).filter((e) => e.node.handle !== handle);
  if (all.length === 0) return null;

  const picks: ShopifyProductEdge[] = [];
  for (const pattern of pairingPatterns(title)) {
    const found = all.find((e) => pattern.test(e.node.title) && !picks.includes(e));
    if (found) picks.push(found);
  }
  for (const edge of all) {
    if (picks.length >= 3) break;
    if (!picks.includes(edge)) picks.push(edge);
  }

  const selection = picks.slice(0, 3);
  if (selection.length === 0) return null;

  return (
    <section className="border-t border-hairline bg-white px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="headline text-[36px] text-navy md:text-[44px]">
          Frequently bought together
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3 lg:gap-x-10">
          {selection.map((edge) => (
            <ProductCard key={edge.node.handle} product={edge} />
          ))}
        </div>
      </div>
    </section>
  );
}
