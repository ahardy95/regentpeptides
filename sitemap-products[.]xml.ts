import { createFileRoute } from "@tanstack/react-router";
import { serverStorefrontApiRequest } from "@/lib/shopify.server";

const SITE_URL = "https://regentpeptides.com";

const HANDLES_QUERY = `
  query SitemapProducts($first: Int!) {
    products(first: $first) {
      edges { node { handle updatedAt } }
    }
  }
`;

/**
 * Product sitemap, generated from the live catalogue so new compounds are
 * indexed without a manual edit. Static pages live in /sitemap.xml.
 */
export const Route = createFileRoute("/sitemap-products.xml")({
  server: {
    handlers: {
      GET: async () => {
        let urls = "";
        try {
          const data = await serverStorefrontApiRequest(HANDLES_QUERY, { first: 250 });
          const edges =
            (data?.data?.products?.edges as Array<{
              node: { handle: string; updatedAt?: string };
            }>) ?? [];
          urls = edges
            .filter((e) => !e.node.handle.includes("cart-offer"))
            .map(
              (e) =>
                `  <url><loc>${SITE_URL}/product/${e.node.handle}</loc>${
                  e.node.updatedAt ? `<lastmod>${e.node.updatedAt.slice(0, 10)}</lastmod>` : ""
                }<changefreq>weekly</changefreq><priority>0.8</priority></url>`
            )
            .join("\n");
        } catch {
          urls = "";
        }
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        return new Response(body, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
