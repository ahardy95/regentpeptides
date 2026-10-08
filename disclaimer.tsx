import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

const title = "Disclaimer | Regent Peptides";
const description =
  "Regent Peptides compounds are supplied strictly for laboratory research use only and not for human or veterinary consumption.";

export const Route = createFileRoute("/disclaimer")({
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
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <LegalLayout
      title="Disclaimer"
      intro="Everything sold by Regent Peptides is a research chemical intended for qualified laboratory use. Please read this notice before ordering."
      sections={[
        {
          heading: "Research use only",
          body: (
            <p>
              Products are supplied for in-vitro laboratory research and
              analytical purposes only. They are not medicines, supplements,
              cosmetics or food, and are not for human or veterinary
              consumption.
            </p>
          ),
        },
        {
          heading: "No medical advice",
          body: (
            <p>
              Nothing on this site is medical advice or a claim of therapeutic
              benefit. References to published research are provided for
              scientific context only.
            </p>
          ),
        },
        {
          heading: "Purchaser responsibility",
          body: (
            <p>
              The purchaser is solely responsible for safe handling, storage,
              use and disposal, and for compliance with all laws and
              institutional requirements applicable in their jurisdiction.
            </p>
          ),
        },
        {
          heading: "No liability",
          body: (
            <p>
              Regent Peptides accepts no liability for any loss, injury or
              damage resulting from improper use, misuse, or use outside a
              controlled research environment.
            </p>
          ),
        },
      ]}
    />
  );
}
