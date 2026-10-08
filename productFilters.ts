import type { ShopifyProductEdge } from "./shopify.config";

export const CATEGORIES = [
  "Weight Management",
  "Healing & Recovery",
  "Longevity & Anti-Ageing",
  "Growth & Performance",
  "Skin & Cosmetic",
  "Supplies",
  "Other Research",
] as const;

export type Category = (typeof CATEGORIES)[number];

const RULES: Array<{ category: Category; match: RegExp }> = [
  {
    category: "Supplies",
    match: /\b(bacteriostatic|water|syringe|needle|kit|vial pack|alcohol)\b/i,
  },
  {
    category: "Weight Management",
    match:
      /\b(retatrutide|reta|tirzepatide|tirz|semaglutide|sema|cagrilintide|survodutide|aod|tesofensine|mazdutide)\b/i,
  },
  {
    category: "Healing & Recovery",
    match: /\b(bpc(-?157)?|tb-?500|thymosin beta|kpv|larazotide|pentosan|ll-?37|aicar|klow)\b/i,
  },
  {
    category: "Longevity & Anti-Ageing",
    match:
      /\b(epitalon|epithalon|nad|ss-?31|mots-?c|humanin|thymalin|thymosin alpha|glutathione|foxo4|rapamycin)\b/i,
  },
  {
    category: "Growth & Performance",
    match:
      /\b(ipamorelin|cjc(-?1295)?|tesamorelin|sermorelin|hexarelin|ghrp(-?\d+)?|hgh|igf(-?1)?|mk-?677|follistatin|myostatin|pt-?141|kisspeptin)\b/i,
  },
  {
    category: "Skin & Cosmetic",
    match: /\b(ghk(-?cu)?|melanotan|snap-?8|argireline|matrixyl|glow)\b/i,
  },
];


export function categoryOf(title: string): Category {
  for (const rule of RULES) {
    if (rule.match.test(title)) return rule.category;
  }
  return "Other Research";
}

export const PRICE_BANDS = [
  { label: "Under £50", min: 0, max: 50 },
  { label: "£50 – £100", min: 50, max: 100 },
  { label: "£100 – £200", min: 100, max: 200 },
  { label: "£200+", min: 200, max: Number.POSITIVE_INFINITY },
] as const;

export type SortKey = "featured" | "price-asc" | "price-desc" | "name-asc";

export const SORT_OPTIONS: Array<{ value: SortKey; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name-asc", label: "Name: A–Z" },
];

export function priceOf(edge: ShopifyProductEdge) {
  return Number.parseFloat(edge.node.priceRange.minVariantPrice.amount) || 0;
}

export function sortProducts(list: ShopifyProductEdge[], sort: SortKey) {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => priceOf(a) - priceOf(b));
    case "price-desc":
      return copy.sort((a, b) => priceOf(b) - priceOf(a));
    case "name-asc":
      return copy.sort((a, b) => a.node.title.localeCompare(b.node.title));
    default: {
      // Featured order: GLP-1 compounds (Tirzepatide, Semaglutide, Retatrutide)
      // start the third row of the 3-column grid (positions 7-9).
      const isGlp = (e: ShopifyProductEdge) =>
        /\b(tirzepatide|tirz|semaglutide|sema|retatrutide|reta)\b/i.test(
          `${e.node.title} ${e.node.handle}`
        );
      const glp = copy.filter(isGlp);
      const rest = copy.filter((e) => !isGlp(e));
      if (glp.length === 0) return copy;
      return [...rest.slice(0, 6), ...glp, ...rest.slice(6)];
    }

  }
}

