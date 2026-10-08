export const RESEARCH_CATEGORIES = [
  "Peptide Science",
  "Laboratory Methods",
  "Quality & Purity",
  "Compound Profiles",
  "Storage & Handling",
] as const;

export type ResearchCategory = (typeof RESEARCH_CATEGORIES)[number];

export interface ResearchArticle {
  title: string;
  category: ResearchCategory;
  readTime: string;
  reference: string;
  summary: string;
}

export const RESEARCH_ARTICLES: ResearchArticle[] = [
  {
    title: "Understanding Peptide Purity",
    category: "Quality & Purity",
    readTime: "6 min",
    reference: "RL-001",
    summary:
      "How purity is defined analytically, what a stated percentage represents, and why the analytical method matters as much as the figure itself.",
  },
  {
    title: "What Is HPLC Analysis?",
    category: "Laboratory Methods",
    readTime: "7 min",
    reference: "RL-002",
    summary:
      "High-performance liquid chromatography explained: separation principles, retention time, peak area and how chromatograms are interpreted.",
  },
  {
    title: "How Peptide Batch Testing Works",
    category: "Quality & Purity",
    readTime: "5 min",
    reference: "RL-003",
    summary:
      "The sequence of sampling, identity confirmation and purity quantification applied to an individual manufacturing batch.",
  },
  {
    title: "Understanding Certificates of Analysis",
    category: "Quality & Purity",
    readTime: "6 min",
    reference: "RL-004",
    summary:
      "A field-by-field walkthrough of a COA: identity, method, batch reference, result values and the limits of what documentation can confirm.",
  },
  {
    title: "Laboratory Storage of Lyophilised Peptides",
    category: "Storage & Handling",
    readTime: "4 min",
    reference: "RL-005",
    summary:
      "Temperature, light and moisture considerations for lyophilised material held under laboratory conditions.",
  },
  {
    title: "Peptide Bonds and Sequence Notation",
    category: "Peptide Science",
    readTime: "8 min",
    reference: "RL-006",
    summary:
      "Amino acid residues, peptide bond formation and the conventions used to express a sequence in research literature.",
  },
  {
    title: "Mass Spectrometry for Identity Confirmation",
    category: "Laboratory Methods",
    readTime: "6 min",
    reference: "RL-007",
    summary:
      "How molecular mass data is used alongside chromatography to confirm that a compound is what the label states.",
  },
  {
    title: "Compound Profile: BPC-157",
    category: "Compound Profiles",
    readTime: "5 min",
    reference: "RL-008",
    summary:
      "Identity, molecular formula, research classification and published literature references for the pentadecapeptide BPC-157.",
  },
  {
    title: "Compound Profile: GHK-Cu",
    category: "Compound Profiles",
    readTime: "5 min",
    reference: "RL-009",
    summary:
      "Copper tripeptide identity, coordination chemistry and how the compound is characterised in analytical literature.",
  },
  {
    title: "Reconstitution Solvents in a Laboratory Context",
    category: "Storage & Handling",
    readTime: "5 min",
    reference: "RL-010",
    summary:
      "Solvent classes used for laboratory preparation of lyophilised material, and documentation practice for prepared solutions.",
  },
];
