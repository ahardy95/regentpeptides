import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Suspense, lazy, useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { SHOPIFY_STORE_PERMANENT_DOMAIN } from "@/lib/shopify.config";
const NewsletterPopup = lazy(() =>
  import("@/components/NewsletterPopup").then((m) => ({ default: m.NewsletterPopup })),
);
// @ts-ignore - plain JS drop-in
import { captureRegentAttribution } from "@/lib/regent-attribution.js";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-labwhite px-6 text-ink">
      <div className="max-w-md text-center">
        <p className="eyebrow text-labblue">404</p>
        <h1 className="headline mt-4 text-[40px] text-navy md:text-[48px]">
          That page isn’t here.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-steel">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center bg-navy px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-labblue"
          >
            Back to home
          </Link>
          <Link
            to="/collection"
            className="inline-flex items-center border border-navy/30 px-6 py-3 text-[14px] font-medium text-navy transition-colors hover:border-navy"
          >
            Browse peptides
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-navy px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-labblue"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-navy/30 px-5 py-2.5 text-[14px] font-medium text-navy transition-colors hover:border-navy"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const SITE_URL = "https://regentpeptides.com";

function canonicalFor(pathname: string) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return clean === "/" ? `${SITE_URL}/` : `${SITE_URL}${clean}`;
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: ({ matches }) => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Regent Peptides — UK Research Peptides" },
      {
        name: "description",
        content:
          "Premium UK research peptides, independently tested for purity and supplied with batch-specific quality documentation. For research use only.",
      },
      { name: "author", content: "Regent Peptides" },
      { property: "og:title", content: "Regent Peptides — UK Research Peptides" },
      {
        property: "og:description",
        content:
          "Precision compounds, verified research. Third-party tested, batch traceable, UK manufactured.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@RegentPeptides" },
      { property: "og:image", content: "https://regentpeptides.com/og.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:site_name", content: "Regent Peptides" },
      { name: "twitter:image", content: "https://regentpeptides.com/og.jpg" },
      { name: "theme-color", content: "#1b1f1d" },
    ],
    links: [
      {
        rel: "canonical",
        href: canonicalFor(matches[matches.length - 1]?.pathname ?? "/"),
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}`,
        crossOrigin: "anonymous",
      },
      { rel: "dns-prefetch", href: `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}` },
      { rel: "preconnect", href: "https://cdn.shopify.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://shop.app" },
      { rel: "dns-prefetch", href: "https://checkout.shopify.com" },
      { rel: "icon", href: "/favicon.png?v=rp", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              name: "Regent Peptides",
              legalName: "Oxford Research Syndicate Ltd",
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              email: "concierge@regentpeptides.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "131a Movers Lane",
                addressLocality: "Barking",
                addressRegion: "Essex",
                postalCode: "IG11 7UQ",
                addressCountry: "GB",
              },
              identifier: {
                "@type": "PropertyValue",
                name: "Companies House number",
                value: "17207898",
              },
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: SITE_URL,
              name: "Regent Peptides",
              publisher: { "@id": `${SITE_URL}/#organization` },
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_URL}/collection?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1998756970840036');
fbq('track', 'PageView');`,
          }}
        />
        {/* End Meta Pixel Code */}
      </head>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://www.facebook.com/tr?id=1998756970840036&ev=PageView&noscript=1"
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useEffect(() => {
    try {
      captureRegentAttribution();
    } catch {
      /* never break the store */
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Suspense fallback={null}>
        <NewsletterPopup />
      </Suspense>
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}
