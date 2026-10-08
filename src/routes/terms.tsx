import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

const title = "Terms & Conditions | Regent Peptides";
const description =
  "The terms governing the sale of Regent Peptides research compounds, including eligibility, pricing, delivery and liability.";

export const Route = createFileRoute("/terms")({
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
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      intro="These terms govern your use of regentpeptides.com and every order placed through it. By placing an order you confirm that you accept them in full."
      sections={[
        {
          heading: "Company details",
          body: (
            <p>
              This website is owned and operated by Oxford Research Syndicate
              Ltd, a company registered in England &amp; Wales under company
              number 17207898. Registered office: 131a Movers Lane, Barking,
              Essex, IG11 7UQ, United Kingdom. Regent Peptides is a trading name
              of Oxford Research Syndicate Ltd.
            </p>
          ),
        },
        {
          heading: "Eligibility",
          body: (
            <p>
              You must be at least 18 years old and purchasing in a professional
              or research capacity. All products are supplied for laboratory
              research use only and are not for human or veterinary consumption.
            </p>
          ),
        },
        {
          heading: "Orders and acceptance",
          body: (
            <p>
              An order is an offer to buy. A contract is formed only when we
              issue a dispatch confirmation. We may decline any order at our
              discretion, including where stock, pricing or compliance checks
              require it.
            </p>
          ),
        },
        {
          heading: "Pricing and payment",
          body: (
            <p>
              Prices are shown in pounds sterling and include VAT where
              applicable. Payment is taken in full at checkout. Obvious pricing
              errors may be corrected before dispatch, with a full refund
              offered if you do not wish to proceed.
            </p>
          ),
        },
        {
          heading: "Delivery",
          body: (
            <p>
              Estimated delivery times are indicative. Risk passes to you on
              delivery. See our Shipping Policy for dispatch windows and
              carriers.
            </p>
          ),
        },
        {
          heading: "Liability",
          body: (
            <p>
              We accept no liability for loss arising from misuse of research
              compounds, use outside a controlled laboratory setting, or any use
              involving humans or animals. Nothing limits liability for death or
              personal injury caused by negligence, or for fraud.
            </p>
          ),
        },
        {
          heading: "Governing law",
          body: (
            <p>
              These terms are governed by the laws of England and Wales, and the
              courts of England and Wales have exclusive jurisdiction.
            </p>
          ),
        },
      ]}
    />
  );
}
