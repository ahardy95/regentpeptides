/**
 * Thin wrapper around the globally installed Meta Pixel (`fbq`).
 * The base code lives in src/routes/__root.tsx — this file never initialises
 * a pixel, it only fires standard events on the existing global fbq.
 */

const CURRENCY = "GBP";

type FbqParams = Record<string, unknown>;

/** Short window used to swallow accidental duplicate fires (double clicks, re-renders). */
const DEDUPE_MS = 1500;
const recent = new Map<string, number>();

function shouldFire(key: string): boolean {
  const now = Date.now();
  const last = recent.get(key);
  if (last && now - last < DEDUPE_MS) return false;
  recent.set(key, now);
  return true;
}

function track(event: string, params: FbqParams, dedupeKey: string) {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbq !== "function") return;
  if (!shouldFire(`${event}:${dedupeKey}`)) return;
  try {
    fbq("track", event, params);
  } catch {
    /* tracking must never break the store */
  }
}

/** Numeric ID from a Shopify gid, falling back to the raw value. */
function shortId(gid: string): string {
  const parts = gid.split("/");
  return parts[parts.length - 1] || gid;
}

export function trackViewContent(input: {
  id: string;
  name: string;
  price: string | number;
}) {
  const id = shortId(input.id);
  track(
    "ViewContent",
    {
      content_ids: [id],
      content_name: input.name,
      content_type: "product",
      value: Number(input.price) || 0,
      currency: CURRENCY,
    },
    id
  );
}

export function trackAddToCart(input: {
  id: string;
  name: string;
  price: string | number;
  quantity: number;
}) {
  const id = shortId(input.id);
  const value = (Number(input.price) || 0) * input.quantity;
  track(
    "AddToCart",
    {
      content_ids: [id],
      content_name: input.name,
      content_type: "product",
      contents: [{ id, quantity: input.quantity }],
      value,
      currency: CURRENCY,
    },
    `${id}:${input.quantity}`
  );
}

export function trackInitiateCheckout(
  items: Array<{
    variantId: string;
    quantity: number;
    price: { amount: string };
  }>
) {
  if (items.length === 0) return;
  const ids = items.map((i) => shortId(i.variantId));
  const numItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const value = items.reduce(
    (sum, i) => sum + (Number(i.price.amount) || 0) * i.quantity,
    0
  );
  track(
    "InitiateCheckout",
    {
      content_ids: ids,
      content_type: "product",
      contents: items.map((i) => ({
        id: shortId(i.variantId),
        quantity: i.quantity,
      })),
      value,
      currency: CURRENCY,
      num_items: numItems,
    },
    `${ids.join(",")}:${numItems}:${value}`
  );
}
