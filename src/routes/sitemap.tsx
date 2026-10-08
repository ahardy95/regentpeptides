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
      { label: "About", to: "/about" },
      { label: "Quality", to: "/quality" },
      { label: "Lab reports", to: "/lab-reports" },
      { label: "Research library", to: "/research" },
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

      <main className="pt-[102px] lg:pt-[160px]">
        <section className="border-b border-hairline bg-white px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="eyebrow text-labblue">Sitemap</p>
            <h1 className="headline mt-5 text-[40px] text-navy md:text-[56px]">Every page.</h1>
            <p className="mt-6 max-w-xl text-[16px] leading-[1.6] text-steel">
              A complete index of the Regent Peptides site.
            </p>
          </div>
        </section>
        <section className="bg-white px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 sm:grid-cols-3">
            {GROUPS.map((group) => (
              <div key={group.heading}>
                <h2 className="text-[13px] text-steel">{group.heading}</h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-[16px] text-navy transition-colors hover:text-labblue"
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
