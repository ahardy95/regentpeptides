import { Link } from "@tanstack/react-router";
import { BrandLogo } from "./BrandLogo";

const COLUMNS: Array<{
  heading: string;
  links: Array<{ label: string; to: string }>;
}> = [
  {
    heading: "Shop",
    links: [
      { label: "All Peptides", to: "/collection" },
      { label: "Bulk Enquiry", to: "/contact" },
    ],
  },
  {
    heading: "Quality",
    links: [
      { label: "Quality Standards", to: "/quality" },
      { label: "Lab Reports", to: "/lab-reports" },
      { label: "Batch Verification", to: "/lab-reports" },
    ],
  },
  {
    heading: "Research",
    links: [
      { label: "Research Library", to: "/research" },
      { label: "Storage Information", to: "/faq" },
      { label: "About Us", to: "/about" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Shipping", to: "/shipping" },
      { label: "FAQs", to: "/faq" },
      { label: "Sitemap", to: "/sitemap" },
    ],
  },

  {
    heading: "Legal",
    links: [
      { label: "Terms", to: "/terms" },
      { label: "Privacy", to: "/privacy-policy" },
      { label: "Research Disclaimer", to: "/disclaimer" },
      { label: "Returns", to: "/returns" },
      { label: "Cookie Policy", to: "/cookie-policy" },
      { label: "Cancellation", to: "/cancellation" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy px-6 pb-10 pt-16 text-platinum md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_repeat(5,minmax(0,1fr))]">
          <div>
            <BrandLogo inverted />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-platinum/80">
              A UK supplier of research peptides and laboratory compounds,
              supported by independent analytical testing and batch-specific
              documentation.
            </p>
            <p className="mt-6 text-[10px] uppercase tracking-[0.22em] text-cyan">
              United Kingdom · Est. 2026
            </p>
            <p className="mt-5 max-w-xs text-[11px] leading-relaxed text-platinum/60">
              Regent Peptides is a trading name of Oxford Research Syndicate
              Ltd, registered in England &amp; Wales, company number 17207898.
              Registered office: 131a Movers Lane, Barking, Essex, IG11 7UQ,
              United Kingdom.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <h3 className="mb-5 font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-white">
                {column.heading}
              </h3>
              <ul className="space-y-3 text-[13px]">
                {column.links.map((link) => (
                  <li key={link.label + link.to}>
                    <Link
                      to={link.to}
                      className="text-platinum/80 transition-colors hover:text-cyan"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.22em] md:flex-row md:items-center md:justify-between">
          <p>© Oxford Research Syndicate Ltd · Regent Peptides</p>
          <p className="text-platinum/70">
            For research use only. Not for human consumption.
          </p>
        </div>
      </div>
    </footer>
  );
}
