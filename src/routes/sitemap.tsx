import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const title = "Sitemap | Regent Peptides";
const description =
  "Every page on regentpeptides.com — catalogue, standards, lab testing and legal notices.";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SitemapPage,
});

const GROUPS = [
  {
    heading: "Shop",
    links: [
      { label: "Home", to: "/" },
      { label: "Collection", to: "/collection" },
    ],
  },
  {
    heading: "House",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Lab Testing", to: "/lab-testing" },
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms & Conditions", to: "/terms" },
      { label: "Cookie Policy", to: "/cookie-policy" },
      { label: "Disclaimer", to: "/disclaimer" },
      { label: "Returns & Refund Policy", to: "/returns" },
      { label: "Shipping Policy", to: "/shipping" },
      { label: "Cancellation Policy", to: "/cancellation" },
    ],
  },
] as const;

function SitemapPage() {
  return (
    <div className="min-h-screen bg-labwhite text-ink">
      <SiteHeader />

      <main>
        <section className="flex flex-col border-t border-hairline pt-[110px] md:flex-row lg:pt-[156px]">
          <div className="w-full border-hairline p-8 md:w-[40%] md:border-r md:p-16">
            <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-labblue">
              Sitemap
            </p>
            <h1 className="font-display text-5xl leading-[1.1] md:text-6xl">
              Every <span className="">page.</span>
            </h1>
            <p className="mt-8 max-w-sm leading-relaxed text-steel">
              A complete index of the Regent Peptides site.
            </p>
          </div>

          <div className="grid w-full gap-12 p-8 sm:grid-cols-2 md:w-[60%] md:p-16">
            {GROUPS.map((group) => (
              <div key={group.heading}>
                <h2 className="mb-6 text-[10px] uppercase tracking-[0.3em] text-labblue">
                  {group.heading}
                </h2>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-steel transition-colors hover:text-labblue"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
