import { useEffect, useState } from "react";
import { Check, Minus, Plus, Trash2, X } from "lucide-react";
import { useCartStore, syncCartAttribution } from "@/lib/cartStore";
import { formatPrice } from "@/lib/shopify.config";
import { VialImage } from "@/components/VialImage";
import { CartUpsell } from "@/components/CartUpsell";
import { trackInitiateCheckout } from "@/lib/metaPixel";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const isLoading = useCartStore((state) => state.isLoading);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const getCheckoutUrl = useCartStore((state) => state.getCheckoutUrl);
  const addedNotice = useCartStore((state) => state.addedNotice);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + Number.parseFloat(item.price.amount) * item.quantity,
    0
  );
  const currencyCode = items[0]?.price.currencyCode ?? "GBP";

  const [isRedirecting, setIsRedirecting] = useState(false);

  // Warm up the DNS/TLS connection to the Shopify checkout host while the
  // drawer is open so the redirect feels instant on click.
  useEffect(() => {
    if (!open) return;
    syncCartAttribution();
    const url = getCheckoutUrl();
    if (!url) return;
    let origin: string;
    try {
      origin = new URL(url).origin;
    } catch {
      return;
    }
    const added: HTMLLinkElement[] = [];
    for (const rel of ["preconnect", "dns-prefetch"]) {
      const link = document.createElement("link");
      link.rel = rel;
      link.href = origin;
      if (rel === "preconnect") link.crossOrigin = "anonymous";
      document.head.appendChild(link);
      added.push(link);
    }
    return () => added.forEach((l) => l.remove());
  }, [open, getCheckoutUrl, items.length]);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      trackInitiateCheckout(items);
      syncCartAttribution();
      setIsRedirecting(true);
      window.open(url, "_blank");
      setTimeout(() => setIsRedirecting(false), 1200);
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-white/30 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-8 md:p-10">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-display text-2xl tracking-tight text-ink">
              Your Cart
            </h2>
            <button
              onClick={onClose}
              className="text-steel transition-colors hover:text-ink"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {open && addedNotice ? (
            <div className="mb-6 flex items-center gap-4 border border-labblue/40 bg-labblue/5 p-4">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-labblue text-white">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-labblue">
                  Added to cart
                </p>
                <p className="truncate text-sm font-medium text-ink">
                  {addedNotice.title}
                  {addedNotice.variantTitle &&
                  addedNotice.variantTitle !== "Default Title"
                    ? ` · ${addedNotice.variantTitle}`
                    : ""}
                </p>
              </div>
            </div>
          ) : null}

          {open ? <CartUpsell /> : null}

          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="font-display text-xl text-ink">
                  Your protocol is empty
                </p>
                <p className="mt-2 max-w-xs text-sm text-steel">
                  Add a formulation to begin your regimen.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => {
                  return (
                    <div
                      key={item.variantId}
                      className="flex gap-4 border-b border-hairline pb-6"
                    >
                      <div className="h-24 w-20 flex-shrink-0 overflow-hidden bg-clinical/30">
                        <VialImage
                          title={item.product.node.title}
                          dosage={item.variantTitle}
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h4 className="font-display text-lg text-ink">
                            {item.product.node.title}
                          </h4>
                          <p className="mt-1 text-[10px] uppercase tracking-widest text-steel">
                            {item.variantTitle}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-ink">
                            {formatPrice(item.price.amount, item.price.currencyCode)}
                          </span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateQuantity(item.variantId, item.quantity - 1)
                              }
                              disabled={isLoading}
                              className="flex h-7 w-7 items-center justify-center rounded border border-hairline text-steel transition-colors hover:border-navy hover:text-labblue"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-4 text-center text-sm text-ink">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.variantId, item.quantity + 1)
                              }
                              disabled={isLoading}
                              className="flex h-7 w-7 items-center justify-center rounded border border-hairline text-steel transition-colors hover:border-navy hover:text-labblue"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => removeItem(item.variantId)}
                              disabled={isLoading}
                              className="ml-2 text-steel transition-colors hover:text-red-600"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-8 border-t border-hairline pt-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] text-steel">
                Subtotal
              </span>
              <span className="text-lg font-medium text-ink">
                {formatPrice(totalPrice.toFixed(2), currencyCode)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={items.length === 0 || isLoading || isRedirecting}
              className="w-full bg-navy py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-ink hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isRedirecting ? "Opening secure checkout…" : "Checkout with Shopify"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 block w-full text-center text-[11px] uppercase tracking-[0.2em] text-steel transition-colors hover:text-ink"
            >
              Continue shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
