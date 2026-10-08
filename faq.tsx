import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FAQS, FAQ_CATEGORIES } from "@/lib/faqs";

const title = "FAQ | Regent Peptides";
const description =
  "Answers on purity testing, batch verification, dosages, storage, delivery and ordering from Regent Peptides.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div className="min-h-screen bg-labwhite text-ink">
      <SiteHeader />

      <main className="pt-[102px] lg:pt-[160px]">
        <section className="border-b border-hairline bg-white px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="eyebrow text-labblue">Help</p>
            <h1 className="headline mt-5 text-[40px] text-navy md:text-[56px]">
              Questions, <em className="text-labblue">answered.</em>
            </h1>
            <p className="mt-6 max-w-xl text-[16px] leading-[1.6] text-steel">
              If something isn’t covered here, our London desk will answer directly, usually the
              same working day.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex border border-navy/30 px-6 py-3 text-[14px] font-medium text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              Contact us
            </Link>
          </div>
        </section>

        <section className="bg-white px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[240px_1fr] lg:gap-20">
            <nav className="hidden lg:block" aria-label="Categories">
              <ol className="sticky top-[180px] space-y-2 border-l border-hairline pl-5 text-[13px] text-steel">
                {FAQ_CATEGORIES.map((category) => (
                  <li key={category.name}>
                    <a
                      href={`#${category.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                      className="hover:text-navy"
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="max-w-2xl space-y-16">
              {FAQ_CATEGORIES.map((category) => (
                <section
                  key={category.name}
                  id={category.name.toLowerCase().replace(/[^a-z]+/g, "-")}
                  className="scroll-mt-[190px]"
                >
                  <h2 className="text-[22px] font-medium tracking-[-0.01em] text-navy">
                    {category.name}
                  </h2>
                  <dl className="mt-5 divide-y divide-hairline border-y border-hairline">
                    {category.items.map((item) => (
                      <div key={item.q} className="py-6">
                        <dt className="text-[16px] font-medium text-navy">{item.q}</dt>
                        <dd className="mt-2 text-[15px] leading-[1.65] text-steel">{item.a}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
