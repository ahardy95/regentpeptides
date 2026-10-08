import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

const title = "Privacy Policy | Regent Peptides";
const description =
  "How Regent Peptides collects, uses, stores and protects your personal data under UK GDPR.";

export const Route = createFileRoute("/privacy-policy")({
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
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro="Oxford Research Syndicate Ltd, trading as Regent Peptides, is the data controller for personal information collected through this website. This notice explains what we collect, why, and the rights you hold under UK GDPR."
      sections={[
        {
          heading: "Who we are",
          body: (
            <p>
              Oxford Research Syndicate Ltd, registered in England &amp; Wales
              under company number 17207898, registered office 131a Movers Lane,
              Barking, Essex, IG11 7UQ, United Kingdom. Regent Peptides is a
              trading name of the company. Data protection enquiries:
              privacy@regentpeptides.com.
            </p>
          ),
        },
        {
          heading: "Information we collect",
          body: (
            <p>
              Name, delivery and billing address, email address, telephone
              number, order history and correspondence. Payment card details are
              processed directly by our payment provider and are never stored on
              our systems.
            </p>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <p>
              To process and dispatch orders, provide customer support, meet
              legal and accounting obligations, prevent fraud, and — where you
              have opted in — send occasional updates about the catalogue.
            </p>
          ),
        },
        {
          heading: "Lawful basis",
          body: (
            <p>
              Performance of a contract for order fulfilment, legal obligation
              for record keeping, legitimate interests for fraud prevention and
              service improvement, and consent for marketing communications.
            </p>
          ),
        },
        {
          heading: "Sharing",
          body: (
            <p>
              We share data only with couriers, payment processors and IT
              providers acting on our instructions. We never sell personal data.
            </p>
          ),
        },
        {
          heading: "Retention",
          body: (
            <p>
              Order and transaction records are kept for six years to satisfy UK
              tax law. Marketing consent records are kept until you withdraw
              consent.
            </p>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <p>
              You may request access, correction, erasure, restriction,
              portability, or object to processing. Email
              privacy@regentpeptides.com. You may also complain to the
              Information Commissioner's Office.
            </p>
          ),
        },
      ]}
    />
  );
}
