import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

const title = "Cancellation Policy | Regent Peptides";
const description =
  "How and when you can cancel a Regent Peptides order before or after dispatch.";

export const Route = createFileRoute("/cancellation")({
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
  component: CancellationPage,
});

function CancellationPage() {
  return (
    <LegalLayout
      title="Cancellation Policy"
      intro="Orders can be cancelled free of charge until they are packed. After dispatch, the Returns & Refund Policy applies instead."
      sections={[
        {
          heading: "Before dispatch",
          body: (
            <p>
              Email orders@regentpeptides.com quoting your order number. If the
              parcel has not yet been packed we will cancel it and refund in
              full, usually within 24 hours.
            </p>
          ),
        },
        {
          heading: "After dispatch",
          body: (
            <p>
              Once tracking is issued the order cannot be cancelled. Refuse
              delivery or return the sealed parcel unopened under the Returns &
              Refund Policy.
            </p>
          ),
        },
        {
          heading: "Cancellations by us",
          body: (
            <p>
              We may cancel an order where stock is unavailable, a pricing error
              occurred, or compliance checks are not satisfied. You will be
              refunded in full and notified by email.
            </p>
          ),
        },
        {
          heading: "Refund timing",
          body: (
            <p>
              Cancellation refunds are returned to the original payment method
              and typically clear within 5–10 working days depending on your
              bank.
            </p>
          ),
        },
      ]}
    />
  );
}
