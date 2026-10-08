import { useEffect } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";
import { storefrontApiRequest } from "./client-storefront";
import { trackAddToCart } from "./metaPixel";
// @ts-ignore - plain JS drop-in
import { regentCartAttributes } from "./regent-attribution.js";
import type {
  ShopifyProductEdge,
  ShopifyProductVariant,
} from "./shopify.config";

export interface CartItem {
  lineId: string | null;
  product: ShopifyProductEdge;
  variantId: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  quantity: number;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface AddedNotice {
  title: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  isSyncing: boolean;
  addedNotice: AddedNotice | null;
  dismissAddedNotice: () => void;
  addItem: (item: Omit<CartItem, "lineId">) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  clearCart: () => void;
  syncCart: () => Promise<void>;
  getCheckoutUrl: () => string | null;
}

const CART_QUERY = `
  query cart($id: ID!) {
    cart(id: $id) {
      id
      totalQuantity
    }
  }
`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set("channel", "online_store");
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

const WELCOME_CODES_KEY = "regent-welcome-codes";

function withWelcomeDiscount(
  checkoutUrl: string | null,
  items: CartItem[]
): string | null {
  if (!checkoutUrl || typeof window === "undefined") return checkoutUrl;
  try {
    const raw = window.localStorage.getItem(WELCOME_CODES_KEY);
    if (!raw) return checkoutUrl;
    const codes = JSON.parse(raw) as { high?: string | null; low?: string | null };
    const subtotal = items.reduce(
      (sum, item) => sum + Number.parseFloat(item.price.amount) * item.quantity,
      0
    );
    const code =
      subtotal >= 80 && codes.high
        ? codes.high
        : subtotal >= 30
          ? codes.low || null
          : null;
    if (!code) return checkoutUrl;
    const url = new URL(checkoutUrl);
    url.searchParams.set("discount", code);
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

function isCartNotFoundError(
  userErrors: Array<{ field: string[] | null; message: string }>
): boolean {
  return userErrors.some(
    (e) =>
      e.message.toLowerCase().includes("cart not found") ||
      e.message.toLowerCase().includes("does not exist")
  );
}

async function createShopifyCart(
  item: CartItem
): Promise<{ cartId: string; checkoutUrl: string; lineId: string } | null> {
  const data = await storefrontApiRequest(CART_CREATE_MUTATION, {
    input: {
      lines: [{ quantity: item.quantity, merchandiseId: item.variantId }],
      attributes: regentCartAttributes(),
    },
  });

  if (!data) return null;

  if (data?.data?.cartCreate?.userErrors?.length > 0) {
    console.error("Cart creation failed:", data.data.cartCreate.userErrors);
    return null;
  }

  const cart = data?.data?.cartCreate?.cart;
  if (!cart?.checkoutUrl) return null;

  const lineId = cart.lines.edges[0]?.node?.id;
  if (!lineId) return null;

  return {
    cartId: cart.id,
    checkoutUrl: formatCheckoutUrl(cart.checkoutUrl),
    lineId,
  };
}

async function addLineToShopifyCart(
  cartId: string,
  item: CartItem
): Promise<{ success: boolean; lineId?: string; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ quantity: item.quantity, merchandiseId: item.variantId }],
  });

  if (!data) return { success: false };

  const userErrors = data?.data?.cartLinesAdd?.userErrors || [];
  if (isCartNotFoundError(userErrors))
    return { success: false, cartNotFound: true };
  if (userErrors.length > 0) {
    console.error("Add line failed:", userErrors);
    return { success: false };
  }

  const lines = data?.data?.cartLinesAdd?.cart?.lines?.edges || [];
  const newLine = lines.find(
    (l: { node: { merchandise: { id: string } } }) =>
      l.node.merchandise.id === item.variantId
  );
  return { success: true, lineId: newLine?.node?.id };
}

async function updateShopifyCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });

  if (!data) return { success: false };

  const userErrors = data?.data?.cartLinesUpdate?.userErrors || [];
  if (isCartNotFoundError(userErrors))
    return { success: false, cartNotFound: true };
  if (userErrors.length > 0) {
    console.error("Update line failed:", userErrors);
    return { success: false };
  }
  return { success: true };
}

async function removeLineFromShopifyCart(
  cartId: string,
  lineId: string
): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_REMOVE_MUTATION, {
    cartId,
    lineIds: [lineId],
  });

  if (!data) return { success: false };

  const userErrors = data?.data?.cartLinesRemove?.userErrors || [];
  if (isCartNotFoundError(userErrors))
    return { success: false, cartNotFound: true };
  if (userErrors.length > 0) {
    console.error("Remove line failed:", userErrors);
    return { success: false };
  }
  return { success: true };
}

const noopStorage: Storage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  length: 0,
  clear: () => {},
  key: () => null,
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,
      addedNotice: null,
      dismissAddedNotice: () => set({ addedNotice: null }),
      isSyncing: false,

      addItem: async (item) => {
        const { items, cartId, clearCart } = get();
        const existingItem = items.find((i) => i.variantId === item.variantId);

        set({ isLoading: true });
        try {
          if (!cartId) {
            const result = await createShopifyCart({ ...item, lineId: null });
            if (result) {
              set({
                cartId: result.cartId,
                checkoutUrl: result.checkoutUrl,
                items: [{ ...item, lineId: result.lineId }],
              });
              set({
                addedNotice: {
                  title: item.product.node.title,
                  variantTitle: item.variantTitle,
                  price: item.price,
                  quantity: item.quantity,
                },
              });
              trackAddToCart({
                id: item.variantId,
                name: item.product.node.title,
                price: item.price.amount,
                quantity: item.quantity,
              });
            }
          } else if (existingItem) {
            const newQuantity = existingItem.quantity + item.quantity;
            if (!existingItem.lineId) {
              console.error(
                "Cannot update quantity for item without lineId:",
                existingItem
              );
              return;
            }
            const result = await updateShopifyCartLine(
              cartId,
              existingItem.lineId,
              newQuantity
            );
            if (result.success) {
              const currentItems = get().items;
              set({
                items: currentItems.map((i) =>
                  i.variantId === item.variantId
                    ? { ...i, quantity: newQuantity }
                    : i
                ),
                addedNotice: {
                  title: item.product.node.title,
                  variantTitle: item.variantTitle,
                  price: item.price,
                  quantity: item.quantity,
                },
              });
              trackAddToCart({
                id: item.variantId,
                name: item.product.node.title,
                price: item.price.amount,
                quantity: item.quantity,
              });
            } else if (result.cartNotFound) {
              clearCart();
            }
          } else {
            const result = await addLineToShopifyCart(cartId, {
              ...item,
              lineId: null,
            });
            if (result.success) {
              const currentItems = get().items;
              set({
                items: [
                  ...currentItems,
                  { ...item, lineId: result.lineId ?? null },
                ],
              });
              set({
                addedNotice: {
                  title: item.product.node.title,
                  variantTitle: item.variantTitle,
                  price: item.price,
                  quantity: item.quantity,
                },
              });
              trackAddToCart({
                id: item.variantId,
                name: item.product.node.title,
                price: item.price.amount,
                quantity: item.quantity,
              });
            } else if (result.cartNotFound) {
              clearCart();
            }
          }
        } catch (error) {
          console.error("Failed to add item:", error);
          toast.error("Could not add item", {
            description:
              error instanceof Error ? error.message : "Please try again.",
          });
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuantity: async (variantId, quantity) => {
        if (quantity <= 0) {
          await get().removeItem(variantId);
          return;
        }

        const { items, cartId, clearCart } = get();
        const item = items.find((i) => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;

        set({ isLoading: true });
        try {
          const result = await updateShopifyCartLine(
            cartId,
            item.lineId,
            quantity
          );
          if (result.success) {
            const currentItems = get().items;
            set({
              items: currentItems.map((i) =>
                i.variantId === variantId ? { ...i, quantity } : i
              ),
            });
          } else if (result.cartNotFound) {
            clearCart();
          }
        } catch (error) {
          console.error("Failed to update quantity:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (variantId) => {
        const { items, cartId, clearCart } = get();
        const item = items.find((i) => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;

        set({ isLoading: true });
        try {
          const result = await removeLineFromShopifyCart(cartId, item.lineId);
          if (result.success) {
            const currentItems = get().items;
            const newItems = currentItems.filter(
              (i) => i.variantId !== variantId
            );
            if (newItems.length === 0) {
              clearCart();
            } else {
              set({ items: newItems });
            }
          } else if (result.cartNotFound) {
            clearCart();
          }
        } catch (error) {
          console.error("Failed to remove item:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      clearCart: () => set({ items: [], cartId: null, checkoutUrl: null }),
      getCheckoutUrl: () => withWelcomeDiscount(get().checkoutUrl, get().items),

      syncCart: async () => {
        const { cartId, isSyncing, clearCart } = get();
        if (!cartId || isSyncing) return;

        set({ isSyncing: true });
        try {
          const data = await storefrontApiRequest(CART_QUERY, { id: cartId });
          if (!data) return;
          const cart = data?.data?.cart;
          if (!cart || cart.totalQuantity === 0) clearCart();
        } catch (error) {
          console.error("Failed to sync cart with Shopify:", error);
        } finally {
          set({ isSyncing: false });
        }
      },
    }),
    {
      name: "regent-cart",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : noopStorage
      ),
      skipHydration: true,
      partialize: (state) => ({
        items: state.items,
        cartId: state.cartId,
        checkoutUrl: state.checkoutUrl,
      }),
    }
  )
);

/** Restores the saved cart from localStorage after hydration. */
export function useCartHydration() {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);
}

export function useCartSync() {
  const syncCart = useCartStore((state) => state.syncCart);

  useEffect(() => {
    void Promise.resolve(useCartStore.persist.rehydrate()).then(() =>
      syncCart()
    );
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") syncCart();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [syncCart]);
}

export function getDefaultVariant(product: ShopifyProductEdge["node"]) {
  return (
    product.variants.edges.find((v) => v.node.availableForSale)?.node ??
    product.variants.edges[0]?.node
  );
}

export function buildCartItem(
  product: ShopifyProductEdge,
  variant: ShopifyProductVariant,
  quantity = 1
): Omit<CartItem, "lineId"> {
  return {
    product,
    variantId: variant.id,
    variantTitle: variant.title,
    price: variant.price,
    quantity,
    selectedOptions: variant.selectedOptions,
  };
}

const CART_ATTRIBUTES_UPDATE_MUTATION = `
  mutation cartAttributesUpdate($cartId: ID!, $attributes: [AttributeInput!]!) {
    cartAttributesUpdate(cartId: $cartId, attributes: $attributes) {
      cart { id }
      userErrors { field message }
    }
  }
`;

/** Attach stored click IDs (fbc/_fbp etc.) to an existing cart. Never throws. */
export function syncCartAttribution(): void {
  try {
    const cartId = useCartStore.getState().cartId;
    const attributes = regentCartAttributes();
    if (!cartId || attributes.length === 0) return;
    void storefrontApiRequest(CART_ATTRIBUTES_UPDATE_MUTATION, { cartId, attributes }).catch(() => {});
  } catch {
    /* ignore */
  }
}
