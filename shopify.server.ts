import { SHOPIFY_STOREFRONT_URL, SHOPIFY_STOREFRONT_TOKEN } from "./shopify.config";

export async function serverStorefrontApiRequest(
  query: string,
  variables: Record<string, unknown> = {}
) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        process.env["SHOPIFY_STOREFRONT_TOKEN"] || SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status}`);
  }

  return response.json();
}
