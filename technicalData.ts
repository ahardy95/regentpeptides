import type { ShopifyProductNode, ShopifyProductVariant } from "./shopify.config";

interface PeptideProfile {
  match: string[];
  appearance?: string;
  solubility?: string;
  purity?: string;
  storageNote?: string;
}

const PROFILES: PeptideProfile[] = [
  {
    match: ["ghk-cu", "ghk cu", "ghkcu"],
    appearance: "Blue lyophilised powder (copper-peptide complex)",
    solubility: "Soluble in sterile or bacteriostatic water",
  },
  {
    match: ["bacteriostatic", "sterile water", "diluent"],
    appearance: "Clear, colourless sterile solution",
    solubility: "Miscible with aqueous buffers",
    purity: "USP-grade diluent, 0.9% benzyl alcohol",
    storageNote: "15–25 °C, protected from light",
  },
  {
    match: ["melanotan", "pt-141", "bremelanotide"],
    appearance: "White to pale yellow lyophilised powder",
  },
];

function profileFor(title: string): PeptideProfile | undefined {
  const t = title.toLowerCase();
  return PROFILES.find((p) => p.match.some((m) => t.includes(m)));
}

export interface TechnicalDataGroup {
  heading: string;
  rows: Array<[string, string]>;
}

export function technicalDataFor(
  product: Pick<ShopifyProductNode, "title" | "handle">,
  variant?: ShopifyProductVariant | null
): TechnicalDataGroup[] {
  const profile = profileFor(product.title);
  const dose =
    variant && variant.title && variant.title !== "Default Title"
      ? variant.title.replace(/\s+/g, "").toLowerCase()
      : null;
  const catalogue = [product.handle, dose].filter(Boolean).join("-");
  const isDiluent = /bacteriostatic|sterile water|diluent/i.test(product.title);

  return [
    {
      heading: "Identification",
      rows: [
        ["Product Name", product.title],
        ["Catalogue Number", catalogue],
        ...(dose ? ([["Presentation", `${variant?.title} per vial`]] as Array<[string, string]>) : []),
      ],
    },
    {
      heading: "Physical & Chemical Properties",
      rows: [
        [
          "Appearance",
          profile?.appearance ?? "White to off-white lyophilised powder",
        ],
        [
          "Purity",
          profile?.purity ?? "≥99% by RP-HPLC",
        ],
        ["Identity", isDiluent ? "Compendial specification" : "Confirmed by mass spectrometry"],
        [
          "Solubility",
          profile?.solubility ??
            "Readily soluble in bacteriostatic or sterile water",
        ],
      ],
    },
    {
      heading: "Research Use & Safety",
      rows: [
        [
          "Intended Use",
          "For laboratory research use only. Not for human or veterinary use.",
        ],
        [
          "Caution",
          "Handle using appropriate PPE and in compliance with relevant laboratory safety standards.",
        ],
      ],
    },
    {
      heading: "Storage, Handling & Stability",
      rows: [
        [
          "Storage Temperature, Unopened",
          profile?.storageNote ?? "-20 °C recommended for long-term storage",
        ],
        [
          "Storage Temperature, Opened",
          isDiluent
            ? "2–25 °C, keep vial sealed between draws"
            : "-20 °C, minimise freeze-thaw cycles",
        ],
        ["Shelf Life", "2 years unopened under recommended conditions"],
        [
          "Reconstitution Stability",
          isDiluent
            ? "Use within 28 days of first puncture"
            : "Stable for up to 28 days at 2–8 °C in aqueous solution under sterile conditions",
        ],
        ["Batch / Lot", "Supplied on the batch Certificate of Analysis"],
      ],
    },
  ];
}
