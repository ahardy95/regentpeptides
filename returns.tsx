import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

const title = "Returns & Refund Policy | Regent Peptides";
const description =
  "How returns, damaged deliveries and refunds are handled for Regent Peptides research compounds.";

export const Route = createFileRoute("/returns")({
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
  component: ReturnsPage,
});

function ReturnsPage() {
  return (
    <LegalLayout
      title="Returns & Refund Policy"
      intro="Because peptides are sealed, temperature-sensitive research goods, returns are limited. Where something is wrong with your order, we put it right quickly."
      sections={[
        {
          heading: "Unopened, unused items",
          body: (
            <p>
              Sealed vials in their original, undamaged packaging may be
              returned within 14 days of delivery. Contact
              orders@regentpeptides.com for a returns reference before sending
              anything back.
            </p>
          ),
        },
        {
          heading: "Items we cannot accept",
          body: (
            <p>
              Opened, reconstituted, unsealed or otherwise handled vials cannot
              be returned for health, safety and integrity reasons, except where
              faulty or not as described.
            </p>
          ),
        },
        {
          heading: "Damaged or incorrect orders",
          body: (
            <p>
              Report breakages, missing items or incorrect products within 48
              hours of delivery with photographs of the parcel and contents. We
              will replace or refund in full, including postage.
            </p>
          ),
        },
        {
          heading: "Refunds",
          body: (
            <p>
              Approved refunds are issued to the original payment method within
              5–10 working days of the return being received and inspected.
              Return postage is at your cost unless the item was faulty or
              incorrect.
            </p>
          ),
        },
      ]}
    />
  );
}
