import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

const title = "Cookie Policy | Regent Peptides";
const description =
  "The cookies Regent Peptides uses, what they do, and how to control them in your browser.";

export const Route = createFileRoute("/cookie-policy")({
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
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      intro="Cookies are small files stored on your device. We use a small number of them to keep the site working and to understand how it is used."
      sections={[
        {
          heading: "Strictly necessary",
          body: (
            <p>
              These keep your basket contents, secure your session and enable
              checkout. The site cannot function without them, so they cannot be
              switched off.
            </p>
          ),
        },
        {
          heading: "Analytics",
          body: (
            <p>
              We do not currently run any analytics or advertising cookies on
              this site. If that changes, this policy will be updated and a
              consent prompt will be shown before any such cookie is set.
            </p>
          ),
        },

        {
          heading: "Third parties",
          body: (
            <p>
              Our payment and commerce providers may set their own cookies
              during checkout. These are governed by their respective privacy
              notices.
            </p>
          ),
        },
        {
          heading: "Managing cookies",
          body: (
            <p>
              You can delete or block cookies through your browser settings.
              Blocking strictly necessary cookies will prevent orders from being
              completed.
            </p>
          ),
        },
      ]}
    />
  );
}
