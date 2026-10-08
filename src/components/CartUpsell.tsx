import { useEffect, useMemo, useState } from "react";
import { Droplets, Timer } from "lucide-react";
import { storefrontApiRequest } from "@/lib/client-storefront";
import { buildCartItem, useCartStore } from "@/lib/cartStore";
import { formatPrice } from "@/lib/shopify.config";
import type { ShopifyProductNode } from "@/lib/shopify.config";

const OFFER_HANDLE = "bacteriostatic-water-cart-offer-20-off";
const OFFER_WINDOW_MS = 15 * 60 * 1000;
const OFFER_STORAGE_KEY = "regent-bac-offer-started";

const OFFER_QUERY = `
  query BacWaterOffer($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 1) { edges { node { url altText } } }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
            availableForSale
            selectedOptions { name value }
          }
        }
      }
      options { name values }
    }
  }
`;

function useOfferCountdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    let started = Number(sessionStorage.getItem(OFFER_STORAGE_KEY) || 0);
    if (!started || Number.isNaN(started)) {
      started = Date.now();
      sessionStorage.setItem(OFFER_STORAGE_KEY, String(started));
    }
    const tick = () =>
      setRemaining(Math.max(0, started + OFFER_WINDOW_MS - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return remaining;
}

export function CartUpsell() {
  const items = useCartStore((state) => state.items);
  const isLoading = useCartStore((state) => state.isLoading);
  const addItem = useCartStore((state) => state.addItem);
  const [offer, setOffer] = useState<ShopifyProductNode | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const remaining = useOfferCountdown();

  const hasWater = useMemo(
    () =>
      items.some((item) =>
        /bacteriostatic|sterile water/i.test(item.product.node.title)
      ),
    [items]
  );

  useEffect(() => {
    if (hasWater || offer) return;
    let cancelled = false;
    storefrontApiRequest(OFFER_QUERY, { handle: OFFER_HANDLE })
      .then((data) => {
        const node = data?.data?.productByHandle as ShopifyProductNode | null;
        if (!cancelled && node) setOffer(node);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [hasWater, offer]);

  if (hasWater || items.length === 0 || !offer) return null;

  const expired = remaining !== null && remaining <= 0;
  const minutes = Math.floor((remaining ?? 0) / 60000);
  const seconds = Math.floor(((remaining ?? 0) % 60000) / 1000);

  const handleAdd = async (variantId: string) => {
    const variant = offer.variants.edges.find(
      (v) => v.node.id === variantId
    )?.node;
    if (!variant) return;
    setPending(variantId);
    try {
      await addItem(buildCartItem({ node: offer }, variant, 1));
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="mb-6 border border-labblue/40 bg-labblue/5 p-5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-labblue/10 text-labblue">
          <Droplets className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-labblue">
            Add your solvent — money off
          </p>
          <h3 className="mt-1 font-display text-lg leading-tight text-ink">
            Bacteriostatic Water
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-steel">
            Required for reconstituting lyophilised compounds. Sold separately —
            add it now and save on every size.
          </p>

          {!expired && remaining !== null ? (
            <p className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-labblue">
              <Timer className="h-3 w-3" />
              Offer ends in {minutes}:{String(seconds).padStart(2, "0")}
            </p>
          ) : null}

          <div className="mt-4 space-y-2">
            {offer.variants.edges.map(({ node: variant }) => {
              const price = Number.parseFloat(variant.price.amount);
              const compareAt = variant.compareAtPrice
                ? Number.parseFloat(variant.compareAtPrice.amount)
                : null;
              const saving = compareAt && compareAt > price ? compareAt - price : 0;
              return (
                <div
                  key={variant.id}
                  className="flex items-center justify-between gap-3 border border-hairline bg-white px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink">
                      {variant.title}
                    </p>
                    <p className="text-xs text-steel">
                      {compareAt ? (
                        <>
                          <span className="line-through">
                            {formatPrice(
                              compareAt.toFixed(2),
                              variant.price.currencyCode
                            )}
                          </span>{" "}
                        </>
                      ) : null}
                      <span className="font-semibold text-labblue">
                        {formatPrice(
                          variant.price.amount,
                          variant.price.currencyCode
                        )}
                      </span>
                      {saving > 0 ? (
                        <span className="ml-1 font-semibold text-labblue">
                          ·{" "}
                          {formatPrice(
                            saving.toFixed(2),
                            variant.price.currencyCode
                          )}{" "}
                          off
                        </span>
                      ) : null}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAdd(variant.id)}
                    disabled={isLoading || expired || pending === variant.id}
                    className="flex-shrink-0 bg-navy px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {pending === variant.id
                      ? "Adding…"
                      : expired
                        ? "Expired"
                        : "Add"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
