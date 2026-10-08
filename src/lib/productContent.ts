/**
 * Unique, compound-specific content for each product page.
 *
 * Written for laboratory research context only: identity, classification,
 * how the material is supplied and tested, and the areas of published
 * literature in which the compound appears. No administration or dosing
 * guidance is given anywhere in this file.
 *
 * Keyed by Shopify handle. Products without an entry fall back to the
 * generic summary in productCopy.ts.
 */

export interface ProductFaq {
  q: string;
  a: string;
}

export interface ProductContent {
  /** Display name used in headings and schema. */
  name: string;
  /** Short line under the title, e.g. "Synthetic pentadecapeptide". */
  tagline: string;
  /** Two or three paragraphs of unique copy. */
  paragraphs: string[];
  /** Identity facts shown in the specification block. */
  identity: Array<[string, string]>;
  /** Areas of published research in which the compound is studied. */
  researchAreas: string[];
  /** Page-specific FAQs (also emitted as FAQPage schema). */
  faqs: ProductFaq[];
  /** Slugs of related research-library articles. */
  related: string[];
}

const COMMON_FAQS = {
  testing: (name: string): ProductFaq => ({
    q: `How is ${name} tested?`,
    a: `Each production batch is sent for independent HPLC purity analysis and mass spectrometry identity confirmation by Janoshik Analytical. The batch reference printed on the vial links to its Certificate of Analysis, which can be viewed on the lab's own verification site.`,
  }),
  supplied: (name: string, sizes: string): ProductFaq => ({
    q: `How is ${name} supplied?`,
    a: `As a sterile lyophilised (freeze-dried) powder in a sealed glass vial, available in ${sizes}. Vials are labelled with compound name, strength and batch reference and are dispatched in plain, tracked packaging from the UK.`,
  }),
  storage: (): ProductFaq => ({
    q: "How should the lyophilised vial be stored?",
    a: "Unopened lyophilised vials should be kept refrigerated at 2–8 °C, or at −20 °C for long-term storage, protected from light. Once reconstituted, solutions should be refrigerated and used within the period appropriate to the laboratory's own stability data.",
  }),
  use: (): ProductFaq => ({
    q: "Is this for human use?",
    a: "No. All Regent Peptides products are supplied strictly for in-vitro laboratory research. They are not medicines and are not for human or veterinary use, diagnosis or treatment.",
  }),
};

export const PRODUCT_CONTENT: Record<string, ProductContent> = {
  tirzepatide: {
    name: "Tirzepatide",
    tagline: "Dual GIP / GLP-1 receptor agonist peptide, 39 amino acids",
    paragraphs: [
      "Tirzepatide is a synthetic 39-amino-acid peptide engineered on a GIP (glucose-dependent insulinotropic polypeptide) backbone with activity at both the GIP and GLP-1 receptors. It carries a C20 fatty diacid moiety attached via a linker at lysine 20, which gives the molecule its extended half-life in published pharmacokinetic literature. It is one of the most heavily studied incretin-class peptides of the last five years.",
      "Regent Peptides supplies tirzepatide as a lyophilised powder in sealed vials across seven strengths, each batch manufactured in the UK and released only after independent HPLC purity analysis and mass spectrometry identity confirmation. The batch number on your vial links to its Certificate of Analysis.",
      "In the research literature tirzepatide is studied in the context of incretin receptor pharmacology, glucose homeostasis models, energy balance and adiposity in preclinical systems, and comparative work against single-receptor GLP-1 agonists such as semaglutide. Supplied for laboratory research use only.",
    ],
    identity: [
      ["Sequence length", "39 amino acids"],
      ["Molecular formula", "C225H348N48O68"],
      ["Molecular weight", "≈ 4,813.5 g/mol"],
      ["Classification", "Dual GIP/GLP-1 receptor agonist"],
      ["Form", "Lyophilised powder, sealed vial"],
    ],
    researchAreas: [
      "Incretin receptor pharmacology",
      "Glucose homeostasis models",
      "Energy balance and adiposity (preclinical)",
      "Comparative GLP-1 agonist studies",
    ],
    faqs: [
      {
        q: "What is the difference between tirzepatide and semaglutide in research?",
        a: "Semaglutide is a single-receptor GLP-1 agonist; tirzepatide is engineered to act at both the GIP and GLP-1 receptors. Much of the comparative literature examines what the additional GIP activity contributes in receptor-signalling and metabolic models.",
      },
      COMMON_FAQS.testing("tirzepatide"),
      COMMON_FAQS.supplied("tirzepatide", "seven vial strengths"),
      COMMON_FAQS.storage(),
      COMMON_FAQS.use(),
    ],
    related: [
      "compound-profile-tirzepatide",
      "understanding-peptide-purity",
      "reconstitution-solvents",
    ],
  },

  retatrutide: {
    name: "Retatrutide",
    tagline: "Triple GIP / GLP-1 / glucagon receptor agonist, 39 amino acids",
    paragraphs: [
      "Retatrutide (LY3437943) is a synthetic 39-amino-acid peptide designed to act at three receptors: GIP, GLP-1 and glucagon. Like tirzepatide it carries a fatty-diacid side chain that extends its half-life, but the addition of glucagon receptor activity distinguishes it in the literature as a 'triple agonist' and makes it the subject of some of the most-cited metabolic research currently being published.",
      "We supply retatrutide as a lyophilised powder in sealed vials across six strengths. Every batch is manufactured in the UK and released against an independent HPLC purity result and mass spectrometry identity confirmation from Janoshik Analytical; the batch number on the label is searchable on our lab reports page.",
      "Published research on retatrutide concentrates on multi-receptor incretin signalling, hepatic and adipose energy metabolism in preclinical models, and head-to-head comparison with dual and single agonists. Supplied strictly for laboratory research use.",
    ],
    identity: [
      ["Sequence length", "39 amino acids"],
      ["Molecular formula", "C221H342N46O68"],
      ["Molecular weight", "≈ 4,731 g/mol"],
      ["Classification", "GIP/GLP-1/glucagon triple receptor agonist"],
      ["Form", "Lyophilised powder, sealed vial"],
    ],
    researchAreas: [
      "Multi-receptor incretin signalling",
      "Hepatic and adipose energy metabolism",
      "Glucagon receptor pharmacology",
      "Comparative agonist studies",
    ],
    faqs: [
      {
        q: "How does retatrutide differ from tirzepatide?",
        a: "Both are 39-amino-acid peptides with GIP and GLP-1 receptor activity. Retatrutide additionally activates the glucagon receptor, which is the focus of most research comparing the two.",
      },
      COMMON_FAQS.testing("retatrutide"),
      COMMON_FAQS.supplied("retatrutide", "six vial strengths"),
      COMMON_FAQS.storage(),
      COMMON_FAQS.use(),
    ],
    related: [
      "compound-profile-retatrutide",
      "compound-profile-tirzepatide",
      "mass-spectrometry-identity",
    ],
  },

  semaglutide: {
    name: "Semaglutide",
    tagline: "GLP-1 receptor agonist peptide, 31 amino acids",
    paragraphs: [
      "Semaglutide is a 31-amino-acid analogue of human GLP-1(7-37) with two amino-acid substitutions and a C18 fatty-diacid side chain at lysine 26 that promotes albumin binding and a long circulating half-life. It is the reference compound against which newer multi-receptor agonists are usually compared in the research literature.",
      "Supplied by Regent Peptides as a lyophilised powder in two vial strengths, manufactured in the UK and independently tested batch by batch. The Certificate of Analysis for your batch reference is available on the lab reports page.",
      "Research applications include GLP-1 receptor signalling studies, glucose-dependent insulin secretion models, and use as a comparator in incretin pharmacology. For laboratory research use only.",
    ],
    identity: [
      ["Sequence length", "31 amino acids"],
      ["Molecular formula", "C187H291N45O59"],
      ["Molecular weight", "≈ 4,113.6 g/mol"],
      ["Classification", "GLP-1 receptor agonist"],
      ["Form", "Lyophilised powder, sealed vial"],
    ],
    researchAreas: [
      "GLP-1 receptor signalling",
      "Glucose-dependent insulin secretion models",
      "Reference comparator in incretin studies",
    ],
    faqs: [
      COMMON_FAQS.testing("semaglutide"),
      COMMON_FAQS.supplied("semaglutide", "two vial strengths"),
      COMMON_FAQS.storage(),
      COMMON_FAQS.use(),
    ],
    related: ["compound-profile-semaglutide", "understanding-certificates-of-analysis"],
  },

  cagrilintide: {
    name: "Cagrilintide",
    tagline: "Long-acting amylin analogue peptide",
    paragraphs: [
      "Cagrilintide is a synthetic, lipidated analogue of amylin, the 37-amino-acid pancreatic hormone co-secreted with insulin. It is engineered for an extended half-life and dual activity at amylin and calcitonin receptors, and appears in the literature chiefly in combination studies with GLP-1 agonists such as semaglutide.",
      "Regent Peptides supplies cagrilintide as a lyophilised powder in two strengths, UK manufactured and released against independent HPLC and mass-spectrometry results. Batch documentation is searchable by the reference on your vial.",
      "Research areas include amylin and calcitonin receptor pharmacology, satiety signalling models and amylin–incretin combination studies. Laboratory research use only.",
    ],
    identity: [
      ["Classification", "Amylin / calcitonin receptor agonist (lipidated analogue)"],
      ["Parent hormone", "Amylin (37 amino acids)"],
      ["Form", "Lyophilised powder, sealed vial"],
    ],
    researchAreas: [
      "Amylin and calcitonin receptor pharmacology",
      "Satiety signalling models",
      "Amylin–GLP-1 combination research",
    ],
    faqs: [
      {
        q: "Why is cagrilintide often studied alongside semaglutide?",
        a: "Amylin and GLP-1 act on different receptor systems, and a large part of the published work examines whether the two pathways are additive in metabolic models. Both compounds are available separately from our catalogue.",
      },
      COMMON_FAQS.testing("cagrilintide"),
      COMMON_FAQS.supplied("cagrilintide", "two vial strengths"),
      COMMON_FAQS.storage(),
      COMMON_FAQS.use(),
    ],
    related: ["compound-profile-semaglutide", "understanding-peptide-purity"],
  },

  "bpc-157": {
    name: "BPC-157",
    tagline: "Synthetic pentadecapeptide, 15 amino acids",
    paragraphs: [
      "BPC-157 (Body Protection Compound-157) is a synthetic pentadecapeptide with the sequence Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val, originally derived from a protein found in gastric juice. It is stable in acidic conditions, which is unusual for a peptide of its length and is one reason it features so widely in preclinical literature.",
      "We supply BPC-157 as a lyophilised powder in 5 mg and 10 mg sealed vials, manufactured in the UK. Every batch is HPLC purity tested and identity-confirmed by mass spectrometry at an independent laboratory before release; the batch number printed on the vial links to its Certificate of Analysis.",
      "Published research on BPC-157 spans tissue repair and angiogenesis models, tendon and ligament fibroblast studies, gastrointestinal models and nitric-oxide pathway work, almost all of it in cell culture or animal systems. Supplied for laboratory research use only.",
    ],
    identity: [
      ["Sequence", "GEPPPGKPADDAGLV"],
      ["Sequence length", "15 amino acids"],
      ["Molecular formula", "C62H98N16O22"],
      ["Molecular weight", "≈ 1,419.5 g/mol"],
      ["Form", "Lyophilised powder, sealed vial"],
    ],
    researchAreas: [
      "Tissue repair and angiogenesis models",
      "Tendon and ligament fibroblast studies",
      "Gastrointestinal models",
      "Nitric-oxide pathway research",
    ],
    faqs: [
      {
        q: "What is the difference between BPC-157 and TB-500?",
        a: "They are unrelated molecules that are often studied together. BPC-157 is a 15-amino-acid gastric-derived peptide; TB-500 is a short synthetic fragment of thymosin beta-4, a 43-amino-acid actin-binding protein. We supply both individually and as a combined blend.",
      },
      COMMON_FAQS.testing("BPC-157"),
      COMMON_FAQS.supplied("BPC-157", "5 mg and 10 mg vials"),
      COMMON_FAQS.storage(),
      COMMON_FAQS.use(),
    ],
    related: ["compound-profile-bpc-157", "compound-profile-tb-500", "reconstitution-solvents"],
  },

  "tb-500": {
    name: "TB-500",
    tagline: "Synthetic thymosin beta-4 fragment (Ac-LKKTETQ)",
    paragraphs: [
      "TB-500 is a synthetic peptide corresponding to the actin-binding region of thymosin beta-4 (Tβ4), a naturally occurring 43-amino-acid protein present in most cells. The supplied heptapeptide, N-acetyl-Leu-Lys-Lys-Thr-Glu-Thr-Gln, represents residues 17–23 of Tβ4 and is the segment responsible for G-actin sequestration in the literature.",
      "Regent Peptides supplies TB-500 as a lyophilised powder in 5 mg and 10 mg vials, UK manufactured and independently tested batch by batch. The Certificate of Analysis for each batch is available via the lab reports page.",
      "Research applications include actin dynamics and cell migration assays, wound-model work in cell culture and animal systems, and comparative or combined studies with BPC-157. Laboratory research use only.",
    ],
    identity: [
      ["Sequence", "Ac-Leu-Lys-Lys-Thr-Glu-Thr-Gln"],
      ["Sequence length", "7 amino acids (Tβ4 17–23)"],
      ["Molecular formula", "C38H68N10O14"],
      ["Molecular weight", "≈ 889.0 g/mol"],
      ["Form", "Lyophilised powder, sealed vial"],
    ],
    researchAreas: [
      "Actin dynamics and cell migration assays",
      "Wound-model studies (in vitro and animal)",
      "Combined studies with BPC-157",
    ],
    faqs: [
      {
        q: "Is TB-500 the same as thymosin beta-4?",
        a: "Not quite. Thymosin beta-4 is the full 43-amino-acid protein. TB-500 is the synthetic seven-residue fragment (17–23) that contains its actin-binding motif, which is why the two names are often used interchangeably in supplier listings.",
      },
      COMMON_FAQS.testing("TB-500"),
      COMMON_FAQS.supplied("TB-500", "5 mg and 10 mg vials"),
      COMMON_FAQS.storage(),
      COMMON_FAQS.use(),
    ],
    related: ["compound-profile-tb-500", "compound-profile-bpc-157"],
  },

  "bpc-157-tb-500-mix": {
    name: "BPC-157 / TB-500 Mix",
    tagline: "Combined blend, 10 mg BPC-157 + 10 mg TB-500",
    paragraphs: [
      "This vial combines the two most widely studied repair-model peptides in a single lyophilised preparation: 10 mg of the pentadecapeptide BPC-157 and 10 mg of TB-500, the actin-binding fragment of thymosin beta-4. It is intended for laboratories that run the two compounds together and prefer a single reconstitution rather than two vials.",
      "Manufactured and lyophilised in the UK, each batch of the blend is HPLC tested for purity and identity-confirmed by mass spectrometry at an independent lab, with both components resolved on the certificate.",
      "The combination appears in preclinical literature examining whether the distinct mechanisms of the two peptides are complementary in tissue-repair and cell-migration models. Supplied for research use only; both compounds are also available individually.",
    ],
    identity: [
      ["Composition", "BPC-157 10 mg + TB-500 10 mg"],
      ["Total content", "20 mg per vial"],
      ["Form", "Lyophilised powder, sealed vial"],
    ],
    researchAreas: ["Complementary mechanism studies", "Tissue-repair and migration models"],
    faqs: [
      {
        q: "Why choose the blend over separate vials?",
        a: "Purely convenience for laboratories that study the two compounds together: one vial, one reconstitution, one batch record. Where the two are investigated separately, individual vials give more control over ratio.",
      },
      COMMON_FAQS.testing("the BPC-157 / TB-500 blend"),
      COMMON_FAQS.storage(),
      COMMON_FAQS.use(),
    ],
    related: ["compound-profile-bpc-157", "compound-profile-tb-500", "reconstitution-solvents"],
  },

  klow: {
    name: "KLOW",
    tagline: "Four-peptide research blend, 80 mg",
    paragraphs: [
      "KLOW is a combined research preparation named for its four components: KPV, the anti-inflammatory tripeptide fragment of alpha-MSH; the copper tripeptide GHK-Cu; the actin-binding thymosin fragment TB-500; and BPC-157. It is supplied as a single 80 mg lyophilised vial for laboratories investigating these compounds in combination.",
      "Each batch is manufactured in the UK and released against independent HPLC and mass-spectrometry analysis. Because the vial contains four distinct peptides, the certificate reports each component separately.",
      "The blend is used in preclinical and in-vitro models where repair, inflammation and matrix-remodelling pathways are studied together. Laboratory research use only.",
    ],
    identity: [
      ["Composition", "KPV, GHK-Cu, TB-500, BPC-157"],
      ["Total content", "80 mg per vial"],
      ["Form", "Lyophilised powder, sealed vial"],
    ],
    researchAreas: ["Combined repair and inflammation models", "Matrix-remodelling studies"],
    faqs: [
      {
        q: "What does KLOW stand for?",
        a: "KLOW is the name used across suppliers for this four-peptide blend of KPV, GHK-Cu, TB-500 and BPC-157. The exact composition and quantities are stated on the vial label and on the batch certificate.",
      },
      COMMON_FAQS.testing("KLOW"),
      COMMON_FAQS.storage(),
      COMMON_FAQS.use(),
    ],
    related: ["compound-profile-ghk-cu", "compound-profile-bpc-157"],
  },

  "ghk-cu": {
    name: "GHK-Cu",
    tagline: "Copper tripeptide complex (glycyl-L-histidyl-L-lysine : Cu²⁺)",
    paragraphs: [
      "GHK-Cu is the copper(II) complex of the naturally occurring tripeptide glycyl-L-histidyl-L-lysine, first isolated from human plasma in the 1970s. The peptide binds copper with high affinity through the histidine imidazole and the terminal amine, and the resulting complex has a characteristic blue colour in both powder and solution.",
      "Regent Peptides supplies GHK-Cu as a blue lyophilised powder in 50 mg and 100 mg vials. Batches are manufactured in the UK and independently tested for purity and identity; copper content is confirmed as part of the specification.",
      "GHK-Cu is among the most-published cosmetic and dermatological research peptides, appearing in literature on collagen and glycosaminoglycan synthesis in fibroblast culture, wound-model studies, and gene-expression profiling. It is also widely used as a reference compound in topical formulation research. Supplied for laboratory research use only.",
    ],
    identity: [
      ["Sequence", "Gly-His-Lys : Cu²⁺"],
      ["Molecular formula (GHK)", "C14H24N6O4"],
      ["Molecular weight", "≈ 340.4 g/mol (peptide); ≈ 403.9 g/mol as Cu complex"],
      ["Appearance", "Blue lyophilised powder"],
      ["Form", "Lyophilised powder, sealed vial"],
    ],
    researchAreas: [
      "Collagen and GAG synthesis in fibroblast culture",
      "Dermatological and cosmetic formulation research",
      "Wound-model studies",
      "Gene-expression profiling",
    ],
    faqs: [
      {
        q: "Why is GHK-Cu blue?",
        a: "The colour comes from the copper(II) ion coordinated by the tripeptide. A strong blue in both powder and reconstituted solution is expected; a colourless powder would indicate the free peptide without copper.",
      },
      COMMON_FAQS.testing("GHK-Cu"),
      COMMON_FAQS.supplied("GHK-Cu", "50 mg and 100 mg vials"),
      COMMON_FAQS.storage(),
      COMMON_FAQS.use(),
    ],
    related: ["compound-profile-ghk-cu", "laboratory-storage-lyophilised-peptides"],
  },

  ipamorelin: {
    name: "Ipamorelin",
    tagline: "Selective growth hormone secretagogue pentapeptide",
    paragraphs: [
      "Ipamorelin is a synthetic pentapeptide (Aib-His-D-2-Nal-D-Phe-Lys-NH2) and a selective agonist at the ghrelin / growth hormone secretagogue receptor (GHS-R1a). In the literature it is noted for its receptor selectivity relative to earlier secretagogues such as GHRP-6, which makes it a common reference compound in receptor pharmacology.",
      "Supplied as a lyophilised powder in 10 mg sealed vials, manufactured in the UK and independently tested batch by batch with the certificate linked to the vial's batch reference.",
      "Research applications include GHS-R1a receptor signalling, pituitary cell-culture secretion assays and comparative secretagogue studies. Laboratory research use only.",
    ],
    identity: [
      ["Sequence", "Aib-His-D-2-Nal-D-Phe-Lys-NH2"],
      ["Sequence length", "5 amino acids"],
      ["Molecular formula", "C38H49N9O5"],
      ["Molecular weight", "≈ 711.9 g/mol"],
      ["Form", "Lyophilised powder, sealed vial"],
    ],
    researchAreas: [
      "GHS-R1a receptor pharmacology",
      "Pituitary cell secretion assays",
      "Comparative secretagogue studies",
    ],
    faqs: [
      COMMON_FAQS.testing("ipamorelin"),
      COMMON_FAQS.supplied("ipamorelin", "10 mg vials"),
      COMMON_FAQS.storage(),
      COMMON_FAQS.use(),
    ],
    related: ["peptide-bonds-and-sequence-notation", "understanding-peptide-purity"],
  },

  tesamorelin: {
    name: "Tesamorelin",
    tagline: "Stabilised GHRH(1-44) analogue, 44 amino acids",
    paragraphs: [
      "Tesamorelin is a synthetic analogue of human growth-hormone-releasing hormone (GHRH 1-44) with a trans-3-hexenoic acid modification at the N-terminus that protects it from dipeptidyl peptidase degradation. It is the longest peptide in our catalogue and acts at the GHRH receptor in published pharmacology.",
      "Regent Peptides supplies tesamorelin as a lyophilised powder in two strengths, UK manufactured and released against independent HPLC and mass-spectrometry results.",
      "It appears in research on GHRH receptor signalling, pituitary somatotroph models and visceral adipose tissue in preclinical and clinical literature. Laboratory research use only.",
    ],
    identity: [
      ["Sequence length", "44 amino acids"],
      ["Molecular weight", "≈ 5,135.9 g/mol"],
      ["Classification", "GHRH receptor agonist"],
      ["Form", "Lyophilised powder, sealed vial"],
    ],
    researchAreas: [
      "GHRH receptor signalling",
      "Pituitary somatotroph models",
      "Adipose tissue research",
    ],
    faqs: [
      COMMON_FAQS.testing("tesamorelin"),
      COMMON_FAQS.supplied("tesamorelin", "two vial strengths"),
      COMMON_FAQS.storage(),
      COMMON_FAQS.use(),
    ],
    related: ["mass-spectrometry-identity", "laboratory-storage-lyophilised-peptides"],
  },

  "pt-141": {
    name: "PT-141",
    tagline: "Bremelanotide, cyclic melanocortin receptor agonist",
    paragraphs: [
      "PT-141 (bremelanotide) is a cyclic heptapeptide analogue of alpha-melanocyte-stimulating hormone and a metabolite of Melanotan II. It is an agonist at melanocortin receptors, with published activity at MC4R and MC3R, and is studied as a central-acting melanocortin probe rather than for pigmentation.",
      "Supplied as a lyophilised powder in 10 mg vials, manufactured in the UK and independently tested batch by batch.",
      "Research use centres on melanocortin receptor pharmacology and central signalling models. Laboratory research use only.",
    ],
    identity: [
      ["Sequence", "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-OH"],
      ["Molecular formula", "C50H68N14O10"],
      ["Molecular weight", "≈ 1,025.2 g/mol"],
      ["Classification", "Melanocortin receptor agonist"],
      ["Form", "Lyophilised powder, sealed vial"],
    ],
    researchAreas: ["Melanocortin receptor pharmacology", "Central signalling models"],
    faqs: [
      COMMON_FAQS.testing("PT-141"),
      COMMON_FAQS.supplied("PT-141", "10 mg vials"),
      COMMON_FAQS.storage(),
      COMMON_FAQS.use(),
    ],
    related: ["peptide-bonds-and-sequence-notation"],
  },

  "igf-1-lr3": {
    name: "IGF-1 LR3",
    tagline: "Long R3 insulin-like growth factor-1, 83 amino acids",
    paragraphs: [
      "IGF-1 LR3 is a recombinant analogue of human insulin-like growth factor-1 with an arginine substitution at position 3 and a 13-amino-acid N-terminal extension. These changes reduce binding to IGF-binding proteins, which is why the analogue shows higher potency than native IGF-1 in cell-culture literature and is widely used as a media supplement.",
      "Supplied as a lyophilised powder in two strengths, with independent purity and identity testing on every batch.",
      "Research applications include cell proliferation and survival assays, IGF-1 receptor signalling and serum-free culture media formulation. Laboratory research use only.",
    ],
    identity: [
      ["Sequence length", "83 amino acids"],
      ["Molecular weight", "≈ 9,111 g/mol"],
      ["Classification", "IGF-1 receptor agonist (recombinant analogue)"],
      ["Form", "Lyophilised powder, sealed vial"],
    ],
    researchAreas: [
      "Cell proliferation and survival assays",
      "IGF-1 receptor signalling",
      "Culture media formulation",
    ],
    faqs: [
      COMMON_FAQS.testing("IGF-1 LR3"),
      COMMON_FAQS.supplied("IGF-1 LR3", "two vial strengths"),
      COMMON_FAQS.storage(),
      COMMON_FAQS.use(),
    ],
    related: ["mass-spectrometry-identity"],
  },

  "mots-c": {
    name: "MOTS-c",
    tagline: "Mitochondrial-derived peptide, 16 amino acids",
    paragraphs: [
      "MOTS-c (mitochondrial open reading frame of the 12S rRNA type-c) is a 16-amino-acid peptide encoded within the mitochondrial genome, identified in 2015. It is one of a small family of mitochondrial-derived peptides and is studied as a signalling molecule linking mitochondrial and nuclear gene regulation.",
      "Regent Peptides supplies MOTS-c as a lyophilised powder in two strengths, UK manufactured and independently tested batch by batch.",
      "Published research covers AMPK pathway activation in cell models, metabolic and exercise-physiology studies in animal systems, and nuclear translocation under metabolic stress. Laboratory research use only.",
    ],
    identity: [
      ["Sequence", "MRWQEMGYIFYPRKLR"],
      ["Sequence length", "16 amino acids"],
      ["Molecular weight", "≈ 2,174.6 g/mol"],
      ["Classification", "Mitochondrial-derived peptide"],
      ["Form", "Lyophilised powder, sealed vial"],
    ],
    researchAreas: [
      "AMPK pathway research",
      "Metabolic and exercise-physiology models",
      "Mitochondrial–nuclear signalling",
    ],
    faqs: [
      COMMON_FAQS.testing("MOTS-c"),
      COMMON_FAQS.supplied("MOTS-c", "two vial strengths"),
      COMMON_FAQS.storage(),
      COMMON_FAQS.use(),
    ],
    related: ["understanding-peptide-purity"],
  },

  nad: {
    name: "NAD+",
    tagline: "Nicotinamide adenine dinucleotide, oxidised form",
    paragraphs: [
      "NAD+ is not a peptide but a dinucleotide coenzyme present in every living cell, central to redox metabolism and a substrate for sirtuins, PARPs and CD38. We include it in the catalogue because it is so frequently studied alongside longevity-class peptides.",
      "Supplied as a lyophilised powder in 500 mg and larger vials, with purity confirmed by HPLC on every batch.",
      "Research applications include redox and energy-metabolism assays, sirtuin and PARP enzymology, and cellular ageing models. Laboratory research use only.",
    ],
    identity: [
      ["Molecular formula", "C21H27N7O14P2"],
      ["Molecular weight", "≈ 663.4 g/mol"],
      ["Classification", "Coenzyme (dinucleotide)"],
      ["Form", "Lyophilised powder, sealed vial"],
    ],
    researchAreas: [
      "Redox and energy metabolism",
      "Sirtuin and PARP enzymology",
      "Cellular ageing models",
    ],
    faqs: [
      {
        q: "Is NAD+ a peptide?",
        a: "No. It is a nucleotide coenzyme. We list it in the longevity category because laboratories studying mitochondrial-derived peptides such as MOTS-c and SS-31 often use it in the same experiments.",
      },
      COMMON_FAQS.testing("NAD+"),
      COMMON_FAQS.storage(),
      COMMON_FAQS.use(),
    ],
    related: ["laboratory-storage-lyophilised-peptides"],
  },

  "ss-31": {
    name: "SS-31",
    tagline: "Elamipretide, mitochondria-targeted tetrapeptide",
    paragraphs: [
      "SS-31 (elamipretide) is a synthetic aromatic-cationic tetrapeptide, D-Arg-Dmt-Lys-Phe-NH2, that localises to the inner mitochondrial membrane where it binds cardiolipin. It is one of the most-cited compounds in mitochondrial-medicine research.",
      "Supplied as a lyophilised powder in two strengths, manufactured in the UK and independently tested for purity and identity batch by batch.",
      "Research applications include cardiolipin binding and mitochondrial membrane studies, oxidative stress and electron-transport-chain models, and ischaemia–reperfusion work in preclinical systems. Laboratory research use only.",
    ],
    identity: [
      ["Sequence", "D-Arg-Dmt-Lys-Phe-NH2"],
      ["Sequence length", "4 amino acids"],
      ["Molecular weight", "≈ 639.8 g/mol"],
      ["Classification", "Mitochondria-targeted peptide"],
      ["Form", "Lyophilised powder, sealed vial"],
    ],
    researchAreas: [
      "Cardiolipin and mitochondrial membrane studies",
      "Oxidative stress models",
      "Ischaemia–reperfusion research",
    ],
    faqs: [
      COMMON_FAQS.testing("SS-31"),
      COMMON_FAQS.supplied("SS-31", "two vial strengths"),
      COMMON_FAQS.storage(),
      COMMON_FAQS.use(),
    ],
    related: ["mass-spectrometry-identity"],
  },

  selank: {
    name: "Selank",
    tagline: "Synthetic tuftsin analogue heptapeptide",
    paragraphs: [
      "Selank is a synthetic heptapeptide (Thr-Lys-Pro-Arg-Pro-Gly-Pro) derived from the immunomodulatory tetrapeptide tuftsin with a Pro-Gly-Pro C-terminal extension for stability. It was developed in Russia and appears in the literature alongside Semax as a neuropeptide research tool.",
      "Supplied as a lyophilised powder in three strengths, UK manufactured and independently tested batch by batch.",
      "Research areas include neuropeptide signalling, gene-expression studies in neural tissue and immunomodulation models. Laboratory research use only.",
    ],
    identity: [
      ["Sequence", "Thr-Lys-Pro-Arg-Pro-Gly-Pro"],
      ["Sequence length", "7 amino acids"],
      ["Molecular formula", "C33H57N11O9"],
      ["Molecular weight", "≈ 751.9 g/mol"],
      ["Form", "Lyophilised powder, sealed vial"],
    ],
    researchAreas: [
      "Neuropeptide signalling",
      "Neural gene-expression studies",
      "Immunomodulation models",
    ],
    faqs: [
      COMMON_FAQS.testing("Selank"),
      COMMON_FAQS.supplied("Selank", "three vial strengths"),
      COMMON_FAQS.storage(),
      COMMON_FAQS.use(),
    ],
    related: ["peptide-bonds-and-sequence-notation"],
  },

  semax: {
    name: "Semax",
    tagline: "Synthetic ACTH(4-7) analogue heptapeptide",
    paragraphs: [
      "Semax is a synthetic heptapeptide (Met-Glu-His-Phe-Pro-Gly-Pro) based on the ACTH(4-7) fragment with the same Pro-Gly-Pro extension used in Selank. It has no corticotropic activity and is studied as a neuropeptide affecting BDNF expression and related pathways in published work.",
      "Supplied as a lyophilised powder in two strengths, manufactured in the UK and independently tested for purity and identity.",
      "Research applications include neurotrophin expression models, cerebral ischaemia studies in animal systems and melanocortin-pathway work. Laboratory research use only.",
    ],
    identity: [
      ["Sequence", "Met-Glu-His-Phe-Pro-Gly-Pro"],
      ["Sequence length", "7 amino acids"],
      ["Molecular formula", "C37H51N9O10S"],
      ["Molecular weight", "≈ 813.9 g/mol"],
      ["Form", "Lyophilised powder, sealed vial"],
    ],
    researchAreas: [
      "Neurotrophin expression models",
      "Cerebral ischaemia research",
      "Melanocortin pathways",
    ],
    faqs: [
      COMMON_FAQS.testing("Semax"),
      COMMON_FAQS.supplied("Semax", "two vial strengths"),
      COMMON_FAQS.storage(),
      COMMON_FAQS.use(),
    ],
    related: ["peptide-bonds-and-sequence-notation"],
  },

  "bacteriostatic-water": {
    name: "Bacteriostatic Water",
    tagline: "Sterile water with 0.9% benzyl alcohol, for reconstitution",
    paragraphs: [
      "Bacteriostatic water is sterile, non-pyrogenic water containing 0.9% benzyl alcohol as a preservative, which inhibits bacterial growth in a multi-use vial. It is the standard laboratory diluent for reconstituting lyophilised peptides where a prepared solution will be drawn from more than once.",
      "Supplied in 3 ml and 10 ml sealed vials. Store at room temperature, protected from light, and discard any vial showing particulates or cloudiness.",
      "Use our reconstitution reference on each peptide page to calculate the resulting concentration for a given diluent volume. For laboratory use only.",
    ],
    identity: [
      ["Composition", "Water for injection grade, 0.9% benzyl alcohol"],
      ["Sizes", "3 ml and 10 ml vials"],
      ["Storage", "15–25 °C, protected from light"],
    ],
    researchAreas: ["Reconstitution of lyophilised material"],
    faqs: [
      {
        q: "Bacteriostatic water or sterile water?",
        a: "Sterile water contains no preservative and is suited to single-use preparation. Bacteriostatic water contains 0.9% benzyl alcohol, which inhibits bacterial growth and is preferred where a reconstituted vial will be stored and sampled repeatedly.",
      },
      COMMON_FAQS.use(),
    ],
    related: ["reconstitution-solvents"],
  },
};

export function productContentFor(handle: string): ProductContent | undefined {
  return PRODUCT_CONTENT[handle.toLowerCase()];
}
