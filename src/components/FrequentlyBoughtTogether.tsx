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

  const all: ShopifyProductEdge[] = (data ?? []).filter(
    (e) => e.node.handle !== handle
  );
  if (all.length === 0) return null;

  const picks: ShopifyProductEdge[] = [];
  for (const pattern of pairingPatterns(title)) {
    const found = all.find(
      (e) => pattern.test(e.node.title) && !picks.includes(e)
    );
    if (found) picks.push(found);
  }
  for (const edge of all) {
    if (picks.length >= 3) break;
    if (!picks.includes(edge)) picks.push(edge);
  }

  const selection = picks.slice(0, 3);
  if (selection.length === 0) return null;

  return (
    <section className="border-t border-hairline px-8 py-20 md:px-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-labblue">
          Research pairings
        </p>
        <h2 className="font-display text-3xl md:text-4xl">
          Frequently Bought Together
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {selection.map((edge) => (
            <ProductCard key={edge.node.handle} product={edge} />
          ))}
        </div>
      </div>
    </section>
  );
}
