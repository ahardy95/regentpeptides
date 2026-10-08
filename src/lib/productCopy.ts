/**
 * Neutral, non-claim product summaries and pairing hints used on product pages.
 * Copy is deliberately descriptive only — no efficacy or outcome claims.
 */

interface CopyRule {
  match: RegExp;
  summary: string;
  /** Regexes for compounds/supplies commonly ordered alongside this item. */
  pairs: RegExp[];
}

const WATER = /(bacteriostatic|sterile water)/i;
const SYRINGE = /(syringe|needle)/i;

const RULES: CopyRule[] = [
  {
    match: /(retatrutide|reta\b)/i,
    summary:
      "Retatrutide is a synthetic multi-receptor peptide studied in metabolic research models. Supplied as a lyophilised powder in a sealed vial, identity and purity tested by batch.",
    pairs: [WATER, /(tirzepatide|tirz)/i, SYRINGE],
  },
  {
    match: /(tirzepatide|tirz)/i,
    summary:
      "Tirzepatide is a dual-receptor synthetic peptide widely used in metabolic and endocrine laboratory studies. Presented as a lyophilised powder with batch-linked analytical documentation.",
    pairs: [WATER, /(cagrilintide)/i, SYRINGE],
  },
  {
    match: /(semaglutide|sema\b)/i,
    summary:
      "Semaglutide is a long-chain synthetic peptide analogue commonly referenced in metabolic research literature. Supplied lyophilised and sealed under inert conditions.",
    pairs: [WATER, /(cagrilintide)/i, SYRINGE],
  },
  {
    match: /(cagrilintide|survodutide|mazdutide|tesofensine|aod)/i,
    summary:
      "A synthetic research peptide investigated within metabolic study models. Supplied as a lyophilised powder with identity and purity testing recorded per batch.",
    pairs: [WATER, /(tirzepatide|tirz)/i, SYRINGE],
  },
  {
    match: /klow/i,
    summary:
      "KLOW is a blended research preparation combining KPV, BPC-157, TB-500 and GHK-Cu in a single lyophilised vial. Supplied sealed, with identity and purity testing recorded for the blend.",
    pairs: [WATER, /(ghk)/i, SYRINGE],
  },
  {
    match: /(bpc).*(tb-?500)|(tb-?500).*(bpc)|\bmix\b|\bblend\b/i,
    summary:
      "A co-formulated research blend containing BPC-157 and TB-500 in one lyophilised vial, prepared for studies that reference both sequences together. Supplied sealed, with identity and purity testing recorded for the blend.",
    pairs: [WATER, /(ghk)/i, SYRINGE],
  },
  {

    match: /(bpc)/i,
    summary:
      "BPC-157 is a short synthetic peptide sequence frequently referenced in tissue and recovery research. Supplied as a lyophilised powder in a sealed research vial.",
    pairs: [/(tb-?500|thymosin beta)/i, WATER, /(ghk)/i],
  },
  {
    match: /(tb-?500|thymosin beta)/i,
    summary:
      "TB-500 is a synthetic peptide fragment used in laboratory recovery and tissue research. Presented lyophilised, with batch-level analytical records.",
    pairs: [/(bpc)/i, WATER, SYRINGE],
  },
  {
    match: /(ghk)/i,
    summary:
      "GHK-Cu is a copper-bound tripeptide complex, recognisable by its blue lyophilised powder, and is widely studied in dermal and matrix research.",
    pairs: [WATER, /(bpc)/i, /(snap-?8|argireline|melanotan)/i],
  },
  {
    match: /(ipamorelin|cjc|sermorelin|tesamorelin|hexarelin|ghrp)/i,
    summary:
      "A synthetic secretagogue peptide used in endocrine laboratory research. Supplied as a lyophilised powder in a sealed, batch-referenced vial.",
    pairs: [/(cjc)/i, WATER, SYRINGE],
  },
  {
    match: /(epitalon|epithalon|nad|mots-?c|ss-?31|humanin|thymalin|thymosin alpha|glutathione)/i,
    summary:
      "A synthetic peptide studied in cellular and longevity research models. Supplied lyophilised with identity and purity verified for each production batch.",
    pairs: [WATER, /(bpc)/i, SYRINGE],
  },
  {
    match: /(melanotan|pt-?141|bremelanotide|kisspeptin)/i,
    summary:
      "A synthetic melanocortin-family research peptide, supplied as a lyophilised powder in a sealed vial with batch-linked documentation.",
    pairs: [WATER, /(ghk)/i, SYRINGE],
  },
  {
    match: WATER,
    summary:
      "Laboratory diluent supplied as a clear, sterile solution for reconstituting lyophilised research material. Sold for laboratory use only.",
    pairs: [/(bpc)/i, /(tirzepatide|tirz)/i, SYRINGE],
  },
];

const FALLBACK_SUMMARY =
  "A research-grade synthetic peptide supplied as a lyophilised powder in a sealed vial. Every batch is identity- and purity-tested, with a certificate of analysis available on request.";

const FALLBACK_PAIRS: RegExp[] = [WATER, /(bpc)/i, /(ghk)/i];

export function productSummary(title: string): string {
  return RULES.find((r) => r.match.test(title))?.summary ?? FALLBACK_SUMMARY;
}

export function pairingPatterns(title: string): RegExp[] {
  return RULES.find((r) => r.match.test(title))?.pairs ?? FALLBACK_PAIRS;
}

export const HANDLING_NOTE = {
  heading: "Research Handling Guidance",
  body: "Before reconstitution, allow both the lyophilised peptide and your chosen diluent to settle at normal laboratory room temperature. Equalising temperatures in this way supports the structural stability of the compound while it goes into solution.",
  footnote: "Diluents and reconstitution solutions are purchased separately.",
};
