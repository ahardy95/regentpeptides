import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { serverStorefrontApiRequest } from "./shopify.server";
import { ShopifyProductEdge, ShopifyProductNode } from "./shopify.config";

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          productType
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      productType
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

// Handles that should never appear in storefront listings (cart-only offers)
const HIDDEN_HANDLES = new Set(["bacteriostatic-water-cart-offer-20-off"]);

export const getProducts = createServerFn({ method: "GET" }).handler(
  async () => {
    const data = await serverStorefrontApiRequest(PRODUCTS_QUERY, { first: 100 });
    const edges = (data?.data?.products?.edges as ShopifyProductEdge[]) ?? [];
    return edges.filter((edge) => !HIDDEN_HANDLES.has(edge.node.handle));
  }
);

export const getProductByHandle = createServerFn({ method: "GET" })
  .validator(z.object({ handle: z.string() }))
  .handler(async ({ data }) => {
    const result = await serverStorefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, {
      handle: data.handle,
    });
    return (result?.data?.productByHandle as ShopifyProductNode | null) ?? null;
  });
