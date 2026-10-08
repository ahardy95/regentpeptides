import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export interface LegalSection {
  heading: string;
  body: ReactNode;
}

interface LegalLayoutProps {
  eyebrow?: string;
  title: string;
  intro: string;
  sections: LegalSection[];
  updated?: string;
}

export function LegalLayout({
  eyebrow = "Legal",
  title,
  intro,
  sections,
  updated = "August 2026",
}: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-labwhite text-ink">
      <SiteHeader />

      <main className="pt-[102px] lg:pt-[160px]">
        <section className="border-b border-hairline bg-white px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="eyebrow text-labblue">{eyebrow}</p>
            <h1 className="headline mt-5 max-w-3xl text-[40px] text-navy md:text-[56px]">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-[1.6] text-steel">{intro}</p>
            <p className="mt-6 text-[13px] text-steel">Last updated {updated}</p>
          </div>
        </section>

        <section className="bg-white px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[240px_1fr] lg:gap-20">
            <nav className="hidden lg:block" aria-label="Sections">
              <ol className="sticky top-[180px] space-y-2 border-l border-hairline pl-5 text-[13px] text-steel">
                {sections.map((section) => (
                  <li key={section.heading}>{section.heading}</li>
                ))}
              </ol>
            </nav>
            <div className="max-w-2xl space-y-12">
              {sections.map((section, i) => (
                <article key={section.heading}>
                  <h2 className="text-[22px] font-medium tracking-[-0.01em] text-navy">
                    <span className="mr-3 text-[13px] font-normal text-steel">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-[15.5px] leading-[1.65] text-steel">
                    {section.body}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
