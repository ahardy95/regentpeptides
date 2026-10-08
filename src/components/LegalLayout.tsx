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

      <main>
        <section className="flex flex-col border-t border-hairline pt-[110px] md:flex-row lg:pt-[156px]">
          <div className="w-full border-hairline p-8 md:w-[40%] md:border-r md:p-16">
            <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-labblue">
              {eyebrow}
            </p>
            <h1 className="font-display text-4xl leading-[1.1] md:text-6xl">
              {title}
            </h1>
            <p className="mt-8 max-w-sm leading-relaxed text-steel">
              {intro}
            </p>
            <p className="mt-10 text-[10px] uppercase tracking-[0.25em] text-labblue">
              Last updated · {updated}
            </p>
          </div>

          <div className="w-full p-8 md:w-[60%] md:p-16">
            <div className="max-w-2xl space-y-12">
              {sections.map((section, i) => (
                <article key={section.heading}>
                  <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-labblue">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="font-display text-2xl text-ink md:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 leading-relaxed text-steel">
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
