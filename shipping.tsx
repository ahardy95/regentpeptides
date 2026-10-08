import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

const title = "Shipping Policy | Regent Peptides";
const description =
  "Dispatch times, carriers, packaging and tracking for Regent Peptides orders across the United Kingdom.";

export const Route = createFileRoute("/shipping")({
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
  component: ShippingPage,
});

function ShippingPage() {
  return (
    <LegalLayout
      title="Shipping Policy"
      intro="Orders are packed and dispatched from London to United Kingdom addresses only. Everything travels tracked and discreetly packaged."
      sections={[
        {
          heading: "Dispatch times",
          body: (
            <p>
              Orders placed before 3pm on a working day are dispatched the same
              day. Orders placed after that, or at weekends and bank holidays,
              are dispatched on the next working day.
            </p>
          ),
        },
        {
          heading: "Delivery rates",
          body: (
            <p>
              Standard tracked delivery is £4.99 and Express is £6.99, charged
              at checkout. We do not currently offer free delivery. The
              estimated delivery dates shown at checkout are the ones that apply
              to your order.
            </p>
          ),
        },
        {
          heading: "Where we deliver",
          body: (
            <p>
              United Kingdom only. Highlands, islands and Northern Ireland may
              take one additional working day. We do not ship internationally at
              present. Tracking is emailed on dispatch.
            </p>
          ),
        },

        {
          heading: "Packaging",
          body: (
            <p>
              Plain outer packaging with no reference to contents. Vials are
              protected and, where the compound requires it, shipped with
              insulation and cool packs.
            </p>
          ),
        },
        {
          heading: "Delays and lost parcels",
          body: (
            <p>
              If tracking has not updated for three working days, contact
              orders@regentpeptides.com and we will open a carrier investigation
              and arrange a replacement where appropriate.
            </p>
          ),
        },
      ]}
    />
  );
}
