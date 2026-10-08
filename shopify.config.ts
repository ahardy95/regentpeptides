export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN =
  "regent-peptide-hub-o9ts5-9bz14ts3.myshopify.com";
export const SHOPIFY_STOREFRONT_TOKEN =
  "cd7c17fd49eada824788013544568aa6";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

export interface ShopifyProductVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  } | null;
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface ShopifyProductImage {
  url: string;
  altText: string | null;
}

export interface ShopifyProductNode {
  id: string;
  title: string;
  description: string;
  handle: string;
  productType?: string;
  priceRange: {

    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{ node: ShopifyProductImage }>;
  };
  variants: {
    edges: Array<{ node: ShopifyProductVariant }>;
  };
  options: Array<{ name: string; values: string[] }>;
}

export interface ShopifyProductEdge {
  node: ShopifyProductNode;
}

export function formatPrice(amount: string, currencyCode: string) {
  const value = Number.parseFloat(amount);
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currencyCode,
  }).format(value);
}
