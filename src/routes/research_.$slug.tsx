import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useCartSync } from "@/lib/cartStore";
import { articleBySlug, RESEARCH_ARTICLES } from "@/lib/researchLibrary";
import { productContentFor } from "@/lib/productContent";

const SITE_URL = "https://regentpeptides.com";

export const Route = createFileRoute("/research_/$slug")({
  loader: ({ params }) => {
    const article = articleBySlug(params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => {
    const a = loaderData;
    if (!a) return { meta: [{ title: "Research Library | Regent Peptides" }] };
    const url = `${SITE_URL}/research/${a.slug}`;
    const title = `${a.seoTitle} | Regent Peptides`;
    return {
      meta: [
        { title },
        { name: "description", content: a.description },
        { property: "og:title", content: title },
        { property: "og:description", content: a.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:published_time", content: a.published },
        { property: "article:modified_time", content: a.updated },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.seoTitle,
            description: a.description,
            url,
            datePublished: a.published,
            dateModified: a.updated,
            articleSection: a.category,
            image: [`${SITE_URL}/og.jpg`],
            author: { "@type": "Organization", name: "Regent Peptides", url: SITE_URL },
            publisher: { "@id": `${SITE_URL}/#organization` },
            mainEntityOfPage: url,
            isAccessibleForFree: true,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              {
                "@type": "ListItem",
                position: 2,
                name: "Research library",
                item: `${SITE_URL}/research`,
              },
              { "@type": "ListItem", position: 3, name: a.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  useCartSync();
  const article = Route.useLoaderData();

  const related = article.related
    .map((slug) => RESEARCH_ARTICLES.find((x) => x.slug === slug))
    .filter((x): x is (typeof RESEARCH_ARTICLES)[number] => Boolean(x));
  const products = article.products
    .map((handle) => ({ handle, content: productContentFor(handle) }))
    .filter((p) => p.content);

  const updated = new Date(article.updated).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-labwhite text-ink">
      <SiteHeader />
      <main className="pt-[102px] lg:pt-[160px]">
        <article>
          <header className="border-b border-hairline bg-white px-6 py-16 md:px-10 md:py-20">
            <div className="mx-auto max-w-7xl">
              <nav aria-label="Breadcrumb" className="text-[13px] text-steel">
                <Link to="/research" className="hover:text-navy">
                  Research library
                </Link>
                <span className="mx-2 text-platinum">/</span>
                <span>{article.category}</span>
              </nav>
              <h1 className="headline mt-5 max-w-3xl text-[36px] text-navy md:text-[52px]">
                {article.title}
              </h1>
              <p className="mt-6 max-w-2xl text-[17px] leading-[1.6] text-steel">{article.intro}</p>
              <p className="mt-6 text-[13px] text-steel">
                {article.readTime} read · Updated {updated} · Ref. {article.reference}
              </p>
            </div>
          </header>

          <div className="bg-white px-6 py-16 md:px-10 md:py-20">
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[240px_1fr_260px] lg:gap-16">
              <nav className="hidden lg:block" aria-label="Contents">
                <ol className="sticky top-[180px] space-y-2 border-l border-hairline pl-5 text-[13px] text-steel">
                  {article.sections.map((s) => (
                    <li key={s.heading}>
                      <a href={`#${slugify(s.heading)}`} className="hover:text-navy">
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="max-w-2xl">
                {article.sections.map((s) => (
                  <section
                    key={s.heading}
                    id={slugify(s.heading)}
                    className="scroll-mt-[190px] mb-12"
                  >
                    <h2 className="text-[24px] font-medium tracking-[-0.015em] text-navy">
                      {s.heading}
                    </h2>
                    <div className="mt-4 space-y-4 text-[16px] leading-[1.7] text-steel">
                      {s.paragraphs.map((p) => (
                        <p key={p.slice(0, 48)}>{p}</p>
                      ))}
                    </div>
                  </section>
                ))}

                <p className="border-t border-hairline pt-6 text-[13px] leading-relaxed text-steel">
                  Educational reference for laboratory work. Regent Peptides products are supplied
                  for in-vitro research use only and are not for human or veterinary use. Nothing on
                  this page is administration guidance.
                </p>
              </div>

              <aside className="lg:sticky lg:top-[180px] lg:self-start">
                {products.length > 0 ? (
                  <div className="border border-hairline bg-labwhite p-6">
                    <p className="text-[13px] text-steel">Compounds in this article</p>
                    <ul className="mt-3 space-y-2.5">
                      {products.map((p) => (
                        <li key={p.handle}>
                          <Link
                            to="/product/$handle"
                            params={{ handle: p.handle }}
                            className="link-line text-[15px] font-medium text-navy"
                          >
                            {p.content!.name}
                          </Link>
                          <p className="text-[12.5px] text-steel">{p.content!.tagline}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {related.length > 0 ? (
                  <div className="mt-6 border-t border-hairline pt-5">
                    <p className="text-[13px] text-steel">Related reading</p>
                    <ul className="mt-3 space-y-2">
                      {related.map((r) => (
                        <li key={r.slug}>
                          <Link
                            to="/research/$slug"
                            params={{ slug: r.slug }}
                            className="link-line text-[14.5px] text-labblue"
                          >
                            {r.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </aside>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
