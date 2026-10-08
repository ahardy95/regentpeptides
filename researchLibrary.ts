export const RESEARCH_CATEGORIES = [
  "Peptide Science",
  "Laboratory Methods",
  "Quality & Purity",
  "Compound Profiles",
  "Storage & Handling",
] as const;

export type ResearchCategory = (typeof RESEARCH_CATEGORIES)[number];

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface ResearchArticle {
  slug: string;
  title: string;
  /** Search-facing title, used in <title> and schema headline. */
  seoTitle: string;
  description: string;
  category: ResearchCategory;
  readTime: string;
  reference: string;
  summary: string;
  /** ISO date of first publication / last substantive update. */
  published: string;
  updated: string;
  intro: string;
  sections: ArticleSection[];
  /** Product handles this article should link to. */
  products: string[];
  /** Slugs of related articles. */
  related: string[];
}

import { ARTICLE_BODIES } from "./researchArticles";

const META: Array<Omit<ResearchArticle, "intro" | "sections" | "products" | "related">> = [
  {
    slug: "understanding-peptide-purity",
    title: "Understanding Peptide Purity",
    seoTitle: "Peptide Purity Explained: What 99% Actually Means (HPLC)",
    description:
      "What a peptide purity percentage really measures, how HPLC area-percent is calculated, why the method matters, and what a figure like 99% does and does not tell you.",
    category: "Quality & Purity",
    readTime: "6 min",
    reference: "RL-001",
    summary:
      "How purity is defined analytically, what a stated percentage represents, and why the analytical method matters as much as the figure itself.",
    published: "2026-08-28",
    updated: "2026-10-08",
  },
  {
    slug: "what-is-hplc-analysis",
    title: "What Is HPLC Analysis?",
    seoTitle: "What Is HPLC Analysis? How Peptide Purity Is Measured",
    description:
      "High-performance liquid chromatography explained for peptide testing: how separation works, what retention time and peak area mean, and how to read a chromatogram.",
    category: "Laboratory Methods",
    readTime: "7 min",
    reference: "RL-002",
    summary:
      "High-performance liquid chromatography explained: separation principles, retention time, peak area and how chromatograms are interpreted.",
    published: "2026-08-28",
    updated: "2026-10-08",
  },
  {
    slug: "how-peptide-batch-testing-works",
    title: "How Peptide Batch Testing Works",
    seoTitle: "How Research Peptides Are Batch Tested: Sampling to Certificate",
    description:
      "The step-by-step process behind an independent peptide batch test, from sampling and identity confirmation to purity quantification and certificate release.",
    category: "Quality & Purity",
    readTime: "5 min",
    reference: "RL-003",
    summary:
      "The sequence of sampling, identity confirmation and purity quantification applied to an individual manufacturing batch.",
    published: "2026-08-28",
    updated: "2026-10-08",
  },
  {
    slug: "understanding-certificates-of-analysis",
    title: "Understanding Certificates of Analysis",
    seoTitle: "How to Read a Peptide Certificate of Analysis (COA)",
    description:
      "A field-by-field guide to a peptide COA: identity, analytical method, batch reference, purity result, and the limits of what a certificate can confirm.",
    category: "Quality & Purity",
    readTime: "6 min",
    reference: "RL-004",
    summary:
      "A field-by-field walkthrough of a COA: identity, method, batch reference, result values and the limits of what documentation can confirm.",
    published: "2026-08-28",
    updated: "2026-10-08",
  },
  {
    slug: "laboratory-storage-lyophilised-peptides",
    title: "Laboratory Storage of Lyophilised Peptides",
    seoTitle: "How to Store Lyophilised Peptides: Temperature, Light and Moisture",
    description:
      "Storage conditions for freeze-dried research peptides before and after reconstitution: temperature, light, moisture, freeze–thaw cycles and labelling practice.",
    category: "Storage & Handling",
    readTime: "4 min",
    reference: "RL-005",
    summary:
      "Temperature, light and moisture considerations for lyophilised material held under laboratory conditions.",
    published: "2026-08-28",
    updated: "2026-10-08",
  },
  {
    slug: "peptide-bonds-and-sequence-notation",
    title: "Peptide Bonds and Sequence Notation",
    seoTitle: "Peptide Bonds and Sequence Notation: How Peptides Are Written",
    description:
      "Amino acid residues, peptide bond formation, N- and C-termini, one- and three-letter codes, and the modifications that appear in research peptide names.",
    category: "Peptide Science",
    readTime: "8 min",
    reference: "RL-006",
    summary:
      "Amino acid residues, peptide bond formation and the conventions used to express a sequence in research literature.",
    published: "2026-08-28",
    updated: "2026-10-08",
  },
  {
    slug: "mass-spectrometry-identity",
    title: "Mass Spectrometry for Identity Confirmation",
    seoTitle: "Mass Spectrometry for Peptide Identity: Why Purity Isn't Enough",
    description:
      "How mass spectrometry confirms that a peptide is what its label says, why HPLC purity alone cannot, and how the two methods are read together on a certificate.",
    category: "Laboratory Methods",
    readTime: "6 min",
    reference: "RL-007",
    summary:
      "How molecular mass data is used alongside chromatography to confirm that a compound is what the label states.",
    published: "2026-08-28",
    updated: "2026-10-08",
  },
  {
    slug: "compound-profile-bpc-157",
    title: "Compound Profile: BPC-157",
    seoTitle: "BPC-157 Explained: Sequence, Stability and Research Overview",
    description:
      "What BPC-157 is: its 15-amino-acid sequence, gastric origin, acid stability, molecular weight, and the areas of preclinical research in which it is studied.",
    category: "Compound Profiles",
    readTime: "6 min",
    reference: "RL-008",
    summary:
      "Identity, molecular formula, research classification and published literature references for the pentadecapeptide BPC-157.",
    published: "2026-08-28",
    updated: "2026-10-08",
  },
  {
    slug: "compound-profile-ghk-cu",
    title: "Compound Profile: GHK-Cu",
    seoTitle: "GHK-Cu Explained: Copper Peptide Chemistry and Research Overview",
    description:
      "The copper tripeptide GHK-Cu: discovery, coordination chemistry, why it is blue, molecular weight, and its use in dermatological and fibroblast research.",
    category: "Compound Profiles",
    readTime: "6 min",
    reference: "RL-009",
    summary:
      "Copper tripeptide identity, coordination chemistry and how the compound is characterised in analytical literature.",
    published: "2026-08-28",
    updated: "2026-10-08",
  },
  {
    slug: "reconstitution-solvents",
    title: "Reconstitution Solvents in a Laboratory Context",
    seoTitle: "How to Reconstitute Peptides: Bacteriostatic vs Sterile Water",
    description:
      "Solvent choice for reconstituting lyophilised peptides, the difference between bacteriostatic and sterile water, how to calculate concentration, and documentation practice.",
    category: "Storage & Handling",
    readTime: "6 min",
    reference: "RL-010",
    summary:
      "Solvent classes used for laboratory preparation of lyophilised material, and documentation practice for prepared solutions.",
    published: "2026-08-28",
    updated: "2026-10-08",
  },
  {
    slug: "compound-profile-tirzepatide",
    title: "Compound Profile: Tirzepatide",
    seoTitle: "Tirzepatide Explained: Dual GIP/GLP-1 Agonist Research Overview",
    description:
      "What tirzepatide is: a 39-amino-acid dual GIP and GLP-1 receptor agonist, its structure and fatty-acid modification, and how it is studied in metabolic research.",
    category: "Compound Profiles",
    readTime: "7 min",
    reference: "RL-011",
    summary:
      "Structure, receptor pharmacology and research context for the dual GIP/GLP-1 agonist tirzepatide.",
    published: "2026-10-08",
    updated: "2026-10-08",
  },
  {
    slug: "compound-profile-retatrutide",
    title: "Compound Profile: Retatrutide",
    seoTitle: "Retatrutide Explained: Triple GIP/GLP-1/Glucagon Agonist Overview",
    description:
      "What retatrutide is: a 39-amino-acid triple agonist at the GIP, GLP-1 and glucagon receptors, how it differs from tirzepatide, and the research it appears in.",
    category: "Compound Profiles",
    readTime: "7 min",
    reference: "RL-012",
    summary:
      "Structure, three-receptor pharmacology and research context for retatrutide, with comparison to tirzepatide and semaglutide.",
    published: "2026-10-08",
    updated: "2026-10-08",
  },
  {
    slug: "compound-profile-semaglutide",
    title: "Compound Profile: Semaglutide",
    seoTitle: "Semaglutide Explained: GLP-1 Analogue Structure and Research Overview",
    description:
      "What semaglutide is: a 31-amino-acid GLP-1 analogue with a C18 fatty-diacid side chain, its molecular identity, and its role as the reference compound in incretin research.",
    category: "Compound Profiles",
    readTime: "6 min",
    reference: "RL-013",
    summary:
      "Structure, half-life engineering and research context for the GLP-1 receptor agonist semaglutide.",
    published: "2026-10-08",
    updated: "2026-10-08",
  },
  {
    slug: "compound-profile-tb-500",
    title: "Compound Profile: TB-500",
    seoTitle: "TB-500 Explained: Thymosin Beta-4 Fragment and Research Overview",
    description:
      "What TB-500 is: the synthetic actin-binding fragment of thymosin beta-4, its seven-residue sequence, molecular weight, and the cell-migration research it appears in.",
    category: "Compound Profiles",
    readTime: "5 min",
    reference: "RL-014",
    summary:
      "Identity and research context for TB-500, the synthetic 17–23 fragment of thymosin beta-4, including its relationship to BPC-157 in the literature.",
    published: "2026-10-08",
    updated: "2026-10-08",
  },
  {
    slug: "glp-1-agonists-compared",
    title: "GLP-1 Agonists Compared: Semaglutide, Tirzepatide and Retatrutide",
    seoTitle: "Semaglutide vs Tirzepatide vs Retatrutide: Research Comparison",
    description:
      "A structural and pharmacological comparison of the three most-studied incretin peptides: receptor targets, sequence length, half-life engineering and what the literature compares.",
    category: "Peptide Science",
    readTime: "8 min",
    reference: "RL-015",
    summary:
      "Single, dual and triple receptor agonists side by side: what differs structurally and what the comparative literature examines.",
    published: "2026-10-08",
    updated: "2026-10-08",
  },
];

export const RESEARCH_ARTICLES: ResearchArticle[] = META.map((m) => {
  const body = ARTICLE_BODIES[m.slug];
  if (!body) throw new Error(`Missing article body for ${m.slug}`);
  return { ...m, ...body };
});

export function articleBySlug(slug: string): ResearchArticle | undefined {
  return RESEARCH_ARTICLES.find((a) => a.slug === slug);
}
