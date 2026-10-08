import { Link } from "@tanstack/react-router";
import { BrandLogo } from "./BrandLogo";

const COLUMNS: Array<{
  heading: string;
  links: Array<{ label: string; to: string }>;
}> = [
  {
    heading: "Shop",
    links: [
      { label: "All peptides", to: "/collection" },
      { label: "Bulk enquiry", to: "/contact" },
      { label: "Shipping", to: "/shipping" },
      { label: "Returns", to: "/returns" },
    ],
  },
  {
    heading: "Quality",
    links: [
      { label: "Quality standards", to: "/quality" },
      { label: "Lab reports", to: "/lab-reports" },
      { label: "Research library", to: "/research" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "FAQ", to: "/faq" },
      { label: "Sitemap", to: "/sitemap" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms", to: "/terms" },
      { label: "Privacy", to: "/privacy-policy" },
      { label: "Cookies", to: "/cookie-policy" },
      { label: "Research disclaimer", to: "/disclaimer" },
      { label: "Cancellation", to: "/cancellation" },
    ],
  },
];

const ASSURANCES = [
  ["Independently tested", "HPLC and mass spectrometry by Janoshik Analytical"],
  ["Batch documented", "Certificate of Analysis per batch reference"],
  ["UK registered company", "Oxford Research Syndicate Ltd, no. 17207898"],
  ["Tracked UK delivery", "Royal Mail Tracked 24, dispatched same day before 3pm"],
];

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      {/* Assurance band */}
      <div className="border-b border-white/10 px-6 md:px-10">
        <dl className="mx-auto grid max-w-7xl gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {ASSURANCES.map(([label, note]) => (
            <div key={label}>
              <dt className="text-[14px] font-semibold text-white">{label}</dt>
              <dd className="mt-1 text-[13px] leading-relaxed text-white/55">{note}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="px-6 pb-10 pt-14 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))]">
            <div>
              <BrandLogo inverted />
              <p className="mt-6 max-w-xs text-[14px] leading-relaxed text-white/60">
                A UK supplier of research peptides and laboratory compounds, supported by
                independent analytical testing and batch-specific documentation.
              </p>
              <p className="mt-6 text-[14px] text-white/80">concierge@regentpeptides.com</p>
              <p className="mt-1 text-[13px] text-white/50">
                Monday to Friday, 09:00 to 17:00 UK time
              </p>
            </div>

            {COLUMNS.map((column) => (
              <div key={column.heading}>
                <h3 className="mb-4 text-[13px] font-semibold text-white">{column.heading}</h3>
                <ul className="space-y-2.5 text-[14px]">
                  {column.links.map((link) => (
                    <li key={link.label + link.to}>
                      <Link
                        to={link.to}
                        className="text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 border-t border-white/10 pt-6 text-[12.5px] leading-relaxed text-white/45">
            <p>
              Regent Peptides is a trading name of Oxford Research Syndicate Ltd, registered in
              England &amp; Wales, company number 17207898. Registered office: 131a Movers Lane,
              Barking, Essex, IG11 7UQ, United Kingdom.
            </p>
            <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <p>© {new Date().getFullYear()} Oxford Research Syndicate Ltd</p>
              <p>For research use only. Not for human consumption.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
