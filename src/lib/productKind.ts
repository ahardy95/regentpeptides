import type { ShopifyProductNode } from "./shopify.config";

export type ProductKind = "peptide" | "compound" | "supply";

const SUPPLY_TITLE = /\b(bacteriostatic|sterile water|diluent|syringe|needle|swab)\b/i;

/**
 * Classifies a catalogue item from its Shopify product type, falling back to
 * the title. Supplies (diluents, consumables) must never be described with
 * peptide language such as "lyophilised" or "batch tested".
 */
export function productKind(
  product: Pick<ShopifyProductNode, "title"> & { productType?: string | undefined }
): ProductKind {
  const type = (product.productType ?? "").toLowerCase();
  if (type.includes("accessory") || type.includes("suppl") || type.includes("diluent"))
    return "supply";
  if (SUPPLY_TITLE.test(product.title)) return "supply";
  if (type.includes("peptide")) return "peptide";
  if (type.includes("compound")) return "compound";
  return "peptide";
}

/** Short form descriptor shown on cards, driven by the product type. */
export function formBadge(kind: ProductKind): string {
  switch (kind) {
    case "supply":
      return "STERILE DILUENT";
    case "compound":
      return "RESEARCH COMPOUND";
    default:
      return "LYOPHILISED";
  }
}
