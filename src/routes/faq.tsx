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

      <main>
        <section className="flex flex-col border-t border-hairline pt-[110px] md:flex-row lg:pt-[156px]">
          <div className="w-full border-hairline p-8 md:w-[40%] md:border-r md:p-16">
            <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-labblue">
              Frequently Asked
            </p>
            <h1 className="font-display text-5xl leading-[1.1] md:text-6xl">
              Questions, <span className="">answered.</span>
            </h1>
            <p className="mt-8 max-w-sm leading-relaxed text-steel">
              If something isn't covered here, our London concierge will answer
              directly — usually the same working day.
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-block w-fit border-b border-navy pb-1 text-[10px] uppercase tracking-[0.3em] transition-colors hover:text-labblue"
            >
              Contact Us
            </Link>
          </div>

          <div className="w-full p-8 md:w-[60%] md:p-16">
            <div className="max-w-2xl space-y-16">
              {FAQ_CATEGORIES.map((category) => (
                <section key={category.name}>
                  <h2 className="text-[10px] uppercase tracking-[0.3em] text-labblue">
                    {category.name}
                  </h2>
                  <dl className="mt-6 divide-y divide-hairline border-t border-hairline">
                    {category.items.map((item) => (
                      <div key={item.q} className="py-8">
                        <dt className="font-display text-xl text-ink md:text-2xl">
                          {item.q}
                        </dt>
                        <dd className="mt-3 leading-relaxed text-steel">
                          {item.a}
                        </dd>
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
