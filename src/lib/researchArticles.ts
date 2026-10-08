/**
 * Full article bodies for the research library, keyed by slug.
 *
 * Editorial rules: educational reference for laboratory work only. No
 * dosing, administration or outcome claims in humans. Where a figure is
 * approximate it is marked as such.
 */

interface ArticleBody {
  intro: string;
  sections: Array<{ heading: string; paragraphs: string[] }>;
  products: string[];
  related: string[];
}

export const ARTICLE_BODIES: Record<string, ArticleBody> = {
  /* ------------------------------------------------------------------ */
  "understanding-peptide-purity": {
    intro:
      "Almost every research peptide listing carries a purity figure, usually somewhere between 98% and 99.9%. The number is useful, but only if you know what it measures, how it was produced, and what it leaves out. This article explains how purity is defined analytically and how to read it critically.",
    sections: [
      {
        heading: "What purity actually measures",
        paragraphs: [
          "In peptide analysis, purity is almost always reported as HPLC area-percent: the sample is separated by high-performance liquid chromatography, a UV detector records every component that elutes from the column, and the area under the main peak is expressed as a percentage of the total area of all peaks. A result of 99.2% means that, of everything the detector saw, 99.2% was the main component.",
          "That definition carries three important caveats. First, it is relative, not absolute: it tells you the proportion of UV-absorbing material that is the target peptide, not the mass of peptide in the vial. Second, it only counts what the detector can see at the chosen wavelength, typically 214 or 220 nm where the peptide bond absorbs. Third, it says nothing about non-peptide content such as residual water, counter-ions or salts, which is why a 99% pure peptide can still have a peptide content by weight of 80–90%.",
        ],
      },
      {
        heading: "Why the method matters as much as the number",
        paragraphs: [
          "Two laboratories can report different purity figures for the same vial if they use different gradients, columns, wavelengths or integration settings. A shallow gradient resolves closely related impurities (deletion sequences, oxidised variants) that a fast gradient merges into the main peak, so a faster method tends to flatter the result. Detection at 280 nm sees only aromatic residues and will miss impurities that lack them.",
          "For this reason a credible certificate states the method: column type, mobile phases, gradient, flow rate, detection wavelength and injection volume. A purity figure with no method behind it cannot be compared with anything and should be treated as a claim rather than a measurement.",
        ],
      },
      {
        heading: "Purity is not identity",
        paragraphs: [
          "A single sharp peak at 99% proves that the sample is homogeneous. It does not prove that the homogeneous material is the compound on the label. A pure sample of the wrong peptide, or a sequence with one residue substituted, can look identical by HPLC. Identity is confirmed separately by mass spectrometry, which measures molecular weight and, in tandem mode, can sequence the peptide. A complete batch record therefore shows both an HPLC purity result and a mass-spectrometry identity result, and the two are read together.",
        ],
      },
      {
        heading: "Common impurities in synthetic peptides",
        paragraphs: [
          "Solid-phase synthesis introduces a predictable family of impurities. Deletion sequences arise when a coupling step fails and a residue is skipped. Truncated sequences are chains that stopped growing. Incompletely deprotected peptides retain a side-chain protecting group. Oxidation affects methionine, cysteine and tryptophan. Racemisation can occur at histidine and cysteine during coupling. Most are removed by preparative HPLC after synthesis, but traces remain and appear as small peaks near the main peak on the analytical chromatogram.",
          "Purity above 98% is standard for well-made research peptides. The difference between 98% and 99.5% is rarely meaningful for most laboratory applications; what matters far more is that the result was produced by a documented, independent method and that identity was confirmed alongside it.",
        ],
      },
      {
        heading: "How Regent Peptides reports purity",
        paragraphs: [
          "Every batch we release is analysed by an independent laboratory, Janoshik Analytical, using HPLC for purity and mass spectrometry for identity. The batch reference on your vial links to the certificate, which can be viewed on the laboratory's own verification site rather than only on ours. You can search current records on our lab reports page.",
        ],
      },
    ],
    products: ["bpc-157", "tirzepatide"],
    related: [
      "what-is-hplc-analysis",
      "mass-spectrometry-identity",
      "understanding-certificates-of-analysis",
    ],
  },

  /* ------------------------------------------------------------------ */
  "what-is-hplc-analysis": {
    intro:
      "High-performance liquid chromatography is the standard technique for measuring peptide purity, and the chromatogram it produces is the single most informative document on a certificate of analysis. This article explains how the technique separates a sample and how to read the result.",
    sections: [
      {
        heading: "The principle of separation",
        paragraphs: [
          "HPLC separates the components of a dissolved sample by pumping it at high pressure through a column packed with microscopic particles. For peptides the column is almost always reversed-phase: the particles are coated with hydrophobic carbon chains (C18 is most common), and the mobile phase is a mixture of water and an organic solvent such as acetonitrile, both containing a small amount of acid, typically 0.1% trifluoroacetic acid.",
          "Each component interacts with the hydrophobic surface to a different degree. More hydrophobic molecules cling to the column longer; more polar ones are washed through sooner. By gradually increasing the proportion of organic solvent over the run, a 'gradient', components are released in order of increasing hydrophobicity and arrive at the detector one after another.",
        ],
      },
      {
        heading: "Retention time",
        paragraphs: [
          "The time between injection and a component reaching the detector is its retention time. Under fixed conditions it is characteristic of a molecule, which is why a certificate often compares the sample's retention time with that of a reference standard. A match supports identity; a shift indicates a different compound or a changed method. Retention time alone is not definitive, since different molecules can co-elute, but it is a useful first check.",
        ],
      },
      {
        heading: "Peak area and purity",
        paragraphs: [
          "A UV detector set at 214 or 220 nm, where the peptide bond absorbs, records absorbance against time. Each component produces a peak, and the detector software integrates the area under every peak. Purity is the area of the main peak divided by the total area of all peaks. Peaks that elute just before or after the main peak are usually closely related impurities: deletion sequences, oxidised forms, or incompletely deprotected variants.",
          "Integration settings matter. The threshold below which a bump is not counted as a peak, and where the baseline is drawn under a cluster of peaks, both change the result. A good laboratory reports its integration parameters or uses a standard protocol so that results are reproducible.",
        ],
      },
      {
        heading: "Reading a chromatogram",
        paragraphs: [
          "A clean chromatogram shows one dominant, symmetrical peak with a flat baseline and only small satellite peaks. Broad or tailing peaks suggest aggregation or poor column performance. A second substantial peak indicates a significant impurity, a second compound or a degradation product. Peaks at the very start (the solvent front) are usually salts and non-retained material and are often excluded from the purity calculation; whether they are excluded should be stated.",
          "Because the appearance of a chromatogram depends entirely on the method, the method parameters should be printed alongside it. Column, gradient, flow rate, wavelength and injection volume are the minimum. Without them a chromatogram is a picture, not data.",
        ],
      },
      {
        heading: "What HPLC cannot tell you",
        paragraphs: [
          "HPLC quantifies how much of the UV-absorbing material is a single component. It does not identify that component, does not measure non-absorbing content such as water and counter-ions, and does not detect endotoxin or microbial contamination. Identity requires mass spectrometry; net peptide content requires amino-acid analysis or a nitrogen assay; sterility and endotoxin require their own tests. On our certificates HPLC purity and mass-spectrometry identity are reported together.",
        ],
      },
    ],
    products: ["bpc-157", "ghk-cu"],
    related: ["understanding-peptide-purity", "mass-spectrometry-identity"],
  },

  /* ------------------------------------------------------------------ */
  "how-peptide-batch-testing-works": {
    intro:
      "A batch number on a vial is only as meaningful as the process behind it. This article walks through what happens between a peptide being synthesised and its certificate of analysis being released, and what each step is designed to catch.",
    sections: [
      {
        heading: "What a batch is",
        paragraphs: [
          "A batch (or lot) is a quantity of material produced in a single, continuous manufacturing run under the same conditions. Everything in the batch is assumed to be homogeneous, which is what allows a sample taken from it to represent the whole. Each batch receives a unique reference that follows it from synthesis to the label on the vial, and every document generated along the way is filed against that reference.",
        ],
      },
      {
        heading: "Step one: sampling",
        paragraphs: [
          "After synthesis, purification and lyophilisation, a sample is drawn from the batch for analysis. Where material has been filled into vials, the sample is a sealed vial from the run rather than loose powder, so that the test reflects what a customer receives. The sample is logged with the batch reference and dispatched to the testing laboratory with a chain-of-custody record.",
        ],
      },
      {
        heading: "Step two: identity confirmation",
        paragraphs: [
          "The first question is whether the material is the compound it is supposed to be. Mass spectrometry measures the molecular weight of the sample and compares it with the theoretical mass calculated from the sequence. For a peptide such as BPC-157 the expected monoisotopic mass is known precisely, and a match within the instrument's tolerance confirms identity. Where there is any doubt, tandem MS fragments the peptide and reads the sequence directly.",
        ],
      },
      {
        heading: "Step three: purity quantification",
        paragraphs: [
          "The sample is then run by reversed-phase HPLC and the area of the main peak is expressed as a percentage of all peaks. The method parameters are recorded. For a batch to be released, purity must meet the specification, which for our catalogue is a minimum of 98% with most batches above 99%. The chromatogram is attached to the certificate so that the result can be inspected rather than taken on trust.",
        ],
      },
      {
        heading: "Step four: review and release",
        paragraphs: [
          "Results are reviewed against the specification. If identity is confirmed and purity meets the limit, a certificate of analysis is issued for the batch. If either fails, the batch is quarantined and not released. Only after release are vials labelled with the final batch reference and made available for dispatch.",
          "Our testing is performed by Janoshik Analytical, an independent laboratory, and each certificate is published on the laboratory's own verification site. That matters: a certificate hosted only by the seller can be edited; one hosted by the lab cannot.",
        ],
      },
      {
        heading: "Checking a batch yourself",
        paragraphs: [
          "Take the batch reference from your vial label, search it on our lab reports page, and open the certificate. Confirm that the compound name and strength match the label, that the method is stated, that the purity result is above specification, and that mass spectrometry confirms identity. If anything does not match, contact us with the batch reference and we will investigate.",
        ],
      },
    ],
    products: ["bpc-157", "retatrutide"],
    related: ["understanding-certificates-of-analysis", "understanding-peptide-purity"],
  },

  /* ------------------------------------------------------------------ */
  "understanding-certificates-of-analysis": {
    intro:
      "A certificate of analysis is the document that turns a supplier's claim into evidence. Most researchers glance at the purity figure and stop. This guide walks through every field on a typical peptide COA, what each one is for, and where the document's limits lie.",
    sections: [
      {
        heading: "Header: who, what and when",
        paragraphs: [
          "The top of the certificate identifies the testing laboratory, the client who submitted the sample, the sample description as received, the date of analysis and the certificate or report number. Check that the laboratory is independent of the supplier and that the sample description matches your product. A certificate that names a different strength or a different compound is not your certificate, regardless of whose logo is on it.",
        ],
      },
      {
        heading: "Batch reference",
        paragraphs: [
          "The batch or lot number ties the certificate to a specific manufacturing run. It must match the reference on your vial exactly. Certificates without a batch number, or with a batch number that does not appear on the product, cannot be linked to what you hold and provide no assurance about it.",
        ],
      },
      {
        heading: "Identity",
        paragraphs: [
          "The identity section reports the method used to confirm the compound, usually mass spectrometry, with the observed molecular weight alongside the theoretical value. For BPC-157 the theoretical average mass is about 1,419.5 g/mol; an observed mass within the instrument's stated tolerance confirms the sequence. Some certificates also report the retention time against a reference standard as supporting evidence.",
        ],
      },
      {
        heading: "Purity and method",
        paragraphs: [
          "The purity result is given as HPLC area-percent, and a good certificate prints the chromatogram and the method parameters next to it: column, mobile phases, gradient, flow rate, detection wavelength. The specification limit (for example ≥ 98%) should be shown so that the result can be read as pass or fail, not just as a number.",
        ],
      },
      {
        heading: "Additional tests",
        paragraphs: [
          "Depending on the laboratory and the request, a certificate may include peptide content by weight, water content, counter-ion content (TFA or acetate), appearance, solubility and, where relevant, endotoxin. These are separate analyses from purity and are not implied by it. If a field is absent, the test was not performed.",
        ],
      },
      {
        heading: "What a COA cannot confirm",
        paragraphs: [
          "A certificate describes a sample at the time of testing. It does not confirm how the batch was stored afterwards, that every vial in the batch is identical (though a homogeneous batch should be), or that the material is suitable for any particular use. It is evidence of identity and purity at release, which is exactly what it should be used for.",
          "Every Regent Peptides certificate is issued by Janoshik Analytical and is viewable on their verification site. Search by batch reference on our lab reports page.",
        ],
      },
    ],
    products: ["semaglutide", "ghk-cu"],
    related: ["how-peptide-batch-testing-works", "mass-spectrometry-identity"],
  },

  /* ------------------------------------------------------------------ */
  "laboratory-storage-lyophilised-peptides": {
    intro:
      "Lyophilised (freeze-dried) peptides are stable for long periods when stored correctly, and surprisingly fragile when they are not. This note summarises the conditions that preserve material before and after reconstitution.",
    sections: [
      {
        heading: "Why lyophilisation",
        paragraphs: [
          "Freeze-drying removes water from a frozen solution by sublimation under vacuum, leaving a porous solid. Without water, the hydrolysis and microbial growth that degrade peptides in solution essentially stop. A lyophilised peptide in a sealed vial, kept cold and dry, typically remains within specification for years; the same peptide in solution may degrade in days.",
        ],
      },
      {
        heading: "Temperature",
        paragraphs: [
          "For short-term storage, 2–8 °C in a refrigerator is adequate for most lyophilised peptides. For long-term storage, −20 °C is the usual recommendation, and some laboratories use −80 °C for particularly labile sequences. Unopened vials can be shipped at ambient temperature for a few days without measurable loss, which is why tracked 24-hour delivery is sufficient; what matters is that the vial goes into cold storage on arrival.",
        ],
      },
      {
        heading: "Light and oxygen",
        paragraphs: [
          "Residues such as tryptophan, methionine and cysteine are sensitive to light and oxidation. Vials should be kept in the dark, in their box or an opaque container. Keep the stopper sealed until use; once a vial is opened, the headspace contains air and the clock starts on oxidation-sensitive sequences.",
        ],
      },
      {
        heading: "Moisture and condensation",
        paragraphs: [
          "The most common cause of avoidable degradation is condensation. A cold vial opened in warm air immediately collects moisture on the powder, and that water begins hydrolysis. Always allow a vial to reach room temperature before opening it, which takes fifteen to thirty minutes on the bench. The same applies to the diluent.",
        ],
      },
      {
        heading: "After reconstitution",
        paragraphs: [
          "Once dissolved, a peptide is far less stable. Prepared solutions should be refrigerated at 2–8 °C, protected from light and used within the period supported by the laboratory's own stability data; a few weeks is typical, longer for some sequences, shorter for others. Repeated freeze–thaw cycles damage peptides, so if a solution must be frozen it should be divided into single-use aliquots first. Label every prepared solution with compound, concentration, solvent, date and batch reference.",
        ],
      },
      {
        heading: "Signs of a problem",
        paragraphs: [
          "A lyophilised cake that has collapsed, discoloured, or become sticky has likely taken on moisture. A solution that is cloudy or contains particulates should not be used. GHK-Cu is the exception that proves the rule: its blue colour is expected and a loss of colour, not its presence, is the warning sign.",
        ],
      },
    ],
    products: ["bacteriostatic-water", "ghk-cu"],
    related: ["reconstitution-solvents", "understanding-peptide-purity"],
  },

  /* ------------------------------------------------------------------ */
  "peptide-bonds-and-sequence-notation": {
    intro:
      "Peptide names and sequences follow conventions that are second nature to chemists and opaque to everyone else. This primer covers the vocabulary needed to read a sequence, understand a modification, and interpret the structural information on a certificate.",
    sections: [
      {
        heading: "Amino acids and the peptide bond",
        paragraphs: [
          "A peptide is a chain of amino acids. Each amino acid has an amine group, a carboxylic acid group and a side chain that gives it its identity. When the carboxyl group of one amino acid reacts with the amine group of the next, a molecule of water is lost and an amide linkage forms between them: the peptide bond. Repeating this reaction produces a chain with a free amine at one end, the N-terminus, and a free carboxylic acid at the other, the C-terminus. Sequences are always written from N-terminus to C-terminus.",
        ],
      },
      {
        heading: "One-letter and three-letter codes",
        paragraphs: [
          "The twenty standard amino acids each have a three-letter and a one-letter code. Glycine is Gly or G, histidine His or H, lysine Lys or K. GHK-Cu is therefore the tripeptide glycyl-histidyl-lysine. BPC-157 written out is Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val, or GEPPPGKPADDAGLV in one-letter form. Three-letter codes are used when a sequence contains unusual residues that have no single-letter code.",
        ],
      },
      {
        heading: "Peptide, polypeptide, protein",
        paragraphs: [
          "The boundaries are conventional rather than chemical. Chains of up to roughly fifty residues are called peptides; longer chains are polypeptides; a polypeptide folded into a stable functional structure is a protein. Di-, tri-, tetra- and pentapeptides name chains of two to five residues; a pentadecapeptide such as BPC-157 has fifteen. Tirzepatide and retatrutide at thirty-nine residues and tesamorelin at forty-four sit near the top of the peptide range.",
        ],
      },
      {
        heading: "Common modifications",
        paragraphs: [
          "Research peptide names often include modifications. An 'Ac-' prefix means the N-terminus is acetylated, which removes its positive charge and protects it from aminopeptidases; TB-500 is Ac-LKKTETQ. A '-NH2' suffix means the C-terminus is an amide rather than a free acid, which likewise improves stability; ipamorelin and SS-31 are C-terminal amides. A 'D-' before a residue indicates the D-enantiomer rather than the natural L-form, used to resist enzymatic cleavage, as in the D-Arg of SS-31 and the D-Phe of ipamorelin.",
          "Non-standard residues appear with their own abbreviations: Aib is 2-aminoisobutyric acid, used in semaglutide, tirzepatide and ipamorelin; Dmt is 2′,6′-dimethyltyrosine in SS-31; Nle is norleucine in PT-141; 2-Nal is 2-naphthylalanine in ipamorelin. Lipidated peptides such as semaglutide and tirzepatide carry a fatty-diacid chain attached to a lysine side chain through a linker, which is described in the name of the full chemical entity rather than in the one-letter sequence.",
        ],
      },
      {
        heading: "Cyclic peptides",
        paragraphs: [
          "Some peptides are closed into a ring by a bond between two side chains or between the termini. PT-141 is cyclised through a lactam bridge between an aspartate and a lysine side chain, written as cyclo[Asp-His-D-Phe-Arg-Trp-Lys]. Cyclisation restricts the shape the peptide can adopt and usually increases its stability and receptor selectivity.",
        ],
      },
      {
        heading: "Why this matters for a certificate",
        paragraphs: [
          "Mass spectrometry confirms identity by matching the observed molecular weight to the theoretical value calculated from the exact sequence including every modification. A missing acetyl group, a free acid instead of an amide, or an L-residue where a D-residue was specified changes the expected mass or the chromatographic behaviour. Knowing how to read the sequence is what lets you check that the certificate describes the molecule you intended to buy.",
        ],
      },
    ],
    products: ["ipamorelin", "ss-31", "pt-141"],
    related: ["mass-spectrometry-identity", "understanding-peptide-purity"],
  },

  /* ------------------------------------------------------------------ */
  "mass-spectrometry-identity": {
    intro:
      "HPLC tells you how pure a sample is. Mass spectrometry tells you what it is. This article explains how molecular mass data confirms identity, why a purity figure on its own is not enough, and how the two results are read together on a certificate.",
    sections: [
      {
        heading: "The problem purity cannot solve",
        paragraphs: [
          "A single peak on an HPLC chromatogram shows that a sample is dominated by one component. It cannot tell you which component. A pure sample of a peptide with one residue swapped, one residue missing, or a protecting group left on will run as a clean single peak, often at a retention time close to the correct compound. Identity has to be established by a method that measures something intrinsic to the molecule, and the most practical such property is its mass.",
        ],
      },
      {
        heading: "How a mass spectrometer works",
        paragraphs: [
          "The instrument converts molecules in the sample into gas-phase ions, separates those ions according to their mass-to-charge ratio, and records how many arrive at each value. For peptides the ions are usually produced by electrospray ionisation, which transfers the molecule intact from solution into the gas phase, typically carrying several protons. A peptide of mass 4,113 Da might be observed as ions at m/z 1,372 (three charges) and 1,029 (four charges); the software deconvolutes these back to the neutral molecular mass.",
        ],
      },
      {
        heading: "Matching to the theoretical mass",
        paragraphs: [
          "Every peptide has a theoretical mass that can be calculated exactly from its sequence and modifications. Semaglutide's average molecular weight is about 4,113.6 g/mol; tirzepatide's is about 4,813.5; BPC-157's is about 1,419.5. If the observed mass agrees with the theoretical mass within the instrument's resolution, the sample has the expected elemental composition. A difference of 16 Da suggests an oxidation; a difference matching the mass of one residue suggests a deletion; a difference of 42 Da suggests an extra acetyl group. The size of the discrepancy therefore points to the type of error.",
        ],
      },
      {
        heading: "Tandem mass spectrometry and sequencing",
        paragraphs: [
          "Matching mass confirms composition but not the order of residues, since two sequences with the same amino acids in a different order have identical mass. Where sequence confirmation is required, tandem MS (MS/MS) selects the peptide ion, fragments it by collision with gas, and measures the fragments. Because the chain breaks predictably at peptide bonds, the series of fragment masses reads out the sequence residue by residue. This is used for verification of new synthesis routes and where a supplier's identity is in question.",
        ],
      },
      {
        heading: "Reading the two results together",
        paragraphs: [
          "A complete certificate shows an HPLC purity result with its chromatogram and a mass-spectrometry identity result with the observed and theoretical masses. Read them as a pair: purity answers 'how much of this is one thing', identity answers 'is that one thing the right molecule'. A high purity with no identity test, or an identity match on a sample that is only 90% pure, each tells half the story. Every batch Regent Peptides releases is tested for both by Janoshik Analytical, and both results appear on the certificate linked to the vial's batch reference.",
        ],
      },
    ],
    products: ["retatrutide", "tesamorelin"],
    related: ["what-is-hplc-analysis", "understanding-certificates-of-analysis"],
  },

  /* ------------------------------------------------------------------ */
  "compound-profile-bpc-157": {
    intro:
      "BPC-157 is one of the most widely discussed research peptides and one of the least well described. This profile sets out what the molecule is, where it comes from, why it behaves unusually for a peptide of its size, and the areas of preclinical literature in which it appears.",
    sections: [
      {
        heading: "Identity",
        paragraphs: [
          "BPC-157 (Body Protection Compound-157) is a synthetic pentadecapeptide with the sequence Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val. Its molecular formula is C62H98N16O22 and its average molecular weight is approximately 1,419.5 g/mol. It is supplied as a white lyophilised powder and is readily soluble in water. The compound is also referred to in the literature as PL 14736 and, in its arginine-salt form, as Pentadecapeptide BPC 157.",
        ],
      },
      {
        heading: "Origin",
        paragraphs: [
          "The sequence was identified in the early 1990s by a research group at the University of Zagreb as a fragment of a larger protein present in human gastric juice. Unlike most short peptides it is stable in gastric acid, which was an early point of interest and distinguishes it from the majority of research peptides, which degrade rapidly in acidic or protease-rich environments.",
        ],
      },
      {
        heading: "Research classification",
        paragraphs: [
          "BPC-157 is categorised as a cytoprotective or gastroprotective peptide in the literature. It has no known receptor in the classical sense; proposed mechanisms in published work involve the nitric-oxide system, growth-factor receptor expression, and the organisation of the actin cytoskeleton in migrating cells. These remain areas of active investigation rather than settled pharmacology.",
        ],
      },
      {
        heading: "Areas of published research",
        paragraphs: [
          "The preclinical literature is extensive and spans several decades. The largest body of work concerns tissue-repair models: tendon, ligament and muscle injury in rodents, and fibroblast migration and outgrowth in cell culture. A second strand concerns the gastrointestinal tract, reflecting the compound's origin, including models of ulceration and inflammatory bowel conditions. Further work examines angiogenesis in chick chorioallantoic membrane and rodent assays, and interactions with the nitric-oxide pathway. The great majority of these studies are in animal or in-vitro systems; controlled human data is very limited, and the compound is not an approved medicine in any jurisdiction.",
        ],
      },
      {
        heading: "Analytical characterisation",
        paragraphs: [
          "BPC-157 runs as a single, well-resolved peak on reversed-phase HPLC. Its acid stability simplifies handling during analysis. Identity is confirmed by mass spectrometry against the theoretical mass; the absence of methionine, cysteine or tryptophan means it is comparatively resistant to oxidation. Regent Peptides supplies BPC-157 in 5 mg and 10 mg vials, UK manufactured, with every batch tested by Janoshik Analytical for purity and identity; the certificate is linked to the batch reference on the vial.",
        ],
      },
      {
        heading: "Relationship to TB-500",
        paragraphs: [
          "BPC-157 is frequently studied, and sold, alongside TB-500. The two are structurally unrelated: TB-500 is a seven-residue fragment of thymosin beta-4 with an actin-binding motif, while BPC-157 is a gastric-derived pentadecapeptide. The pairing in the literature reflects an interest in whether their proposed mechanisms are complementary in repair models rather than any chemical similarity. We supply both individually and as a combined 20 mg blend.",
        ],
      },
    ],
    products: ["bpc-157", "bpc-157-tb-500-mix", "tb-500"],
    related: ["compound-profile-tb-500", "understanding-peptide-purity", "reconstitution-solvents"],
  },

  /* ------------------------------------------------------------------ */
  "compound-profile-ghk-cu": {
    intro:
      "GHK-Cu is a copper complex of a naturally occurring tripeptide and one of the most-published compounds in dermatological and wound research. This profile covers its discovery, chemistry, the reason for its distinctive colour, and how it is characterised analytically.",
    sections: [
      {
        heading: "Identity",
        paragraphs: [
          "GHK is the tripeptide glycyl-L-histidyl-L-lysine, molecular formula C14H24N6O4, molecular weight approximately 340.4 g/mol. GHK-Cu is its complex with a copper(II) ion, giving a molecular weight of roughly 403.9 g/mol. It is supplied as a blue lyophilised powder that dissolves to give a blue solution; the colour is intrinsic to the copper complex and is expected.",
        ],
      },
      {
        heading: "Discovery",
        paragraphs: [
          "The peptide was isolated from human plasma in 1973 by Loren Pickart, who observed that plasma from younger donors had an effect on liver cells in culture that plasma from older donors lacked, and traced the activity to this tripeptide. Its concentration in plasma declines with age, an observation that has shaped much of the subsequent research.",
        ],
      },
      {
        heading: "Coordination chemistry",
        paragraphs: [
          "GHK binds copper(II) with high affinity through the imidazole nitrogen of histidine, the terminal amine of glycine and the deprotonated amide nitrogen between them, forming a square-planar complex. The lysine side chain is not involved in copper binding and remains free. This binding geometry gives the complex its blue colour, with an absorption maximum in the visible region, and is the basis for its description in the literature as a copper-delivery molecule.",
        ],
      },
      {
        heading: "Areas of published research",
        paragraphs: [
          "The largest body of work concerns skin and connective tissue. In fibroblast culture GHK-Cu is reported to increase synthesis of collagen, elastin and glycosaminoglycans, and it appears in numerous wound-model studies in animals. Gene-expression profiling studies have examined its effect on large numbers of genes in cultured cells. It is a standard reference compound in cosmetic formulation research and appears in a wide range of topical products. As with other research peptides, controlled human data outside the cosmetic context is limited.",
        ],
      },
      {
        heading: "Analytical characterisation",
        paragraphs: [
          "GHK-Cu is analysed by reversed-phase HPLC for purity and by mass spectrometry for identity, with the copper complex giving a characteristic signature. The visible blue colour is itself a crude identity check: a colourless powder sold as GHK-Cu is either the free peptide or a different compound. Regent Peptides supplies GHK-Cu in 50 mg and 100 mg vials, UK manufactured, with every batch independently tested by Janoshik Analytical.",
        ],
      },
      {
        heading: "Handling notes",
        paragraphs: [
          "The complex is stable as a lyophilised solid when kept dry, cold and in the dark. In solution it should be refrigerated. Because copper can interact with reducing agents and some buffers, laboratories preparing solutions for assay work normally use plain sterile or bacteriostatic water and avoid thiol-containing additives.",
        ],
      },
    ],
    products: ["ghk-cu", "klow"],
    related: ["laboratory-storage-lyophilised-peptides", "peptide-bonds-and-sequence-notation"],
  },

  /* ------------------------------------------------------------------ */
  "reconstitution-solvents": {
    intro:
      "Lyophilised peptides must be dissolved before they can be used in most laboratory work. The choice of solvent, the volume added and the way it is recorded all affect the usefulness of the resulting solution. This note covers the common solvents and the arithmetic of concentration.",
    sections: [
      {
        heading: "Bacteriostatic water",
        paragraphs: [
          "Bacteriostatic water is sterile water containing 0.9% benzyl alcohol as a preservative. The benzyl alcohol inhibits bacterial growth, which is why it is the standard choice when a reconstituted vial will be stored and drawn from more than once. It is supplied in multi-use vials, typically 3 ml, 10 ml or 30 ml. It is unsuitable for a small number of cell-culture applications where benzyl alcohol would interfere, and for those sterile water is used instead.",
        ],
      },
      {
        heading: "Sterile water",
        paragraphs: [
          "Sterile water for injection contains no preservative. It is appropriate when a solution will be prepared and used in one session, or when a preservative would be incompatible with the downstream assay. Once opened it should not be stored, since there is nothing to prevent microbial growth.",
        ],
      },
      {
        heading: "Other solvents",
        paragraphs: [
          "Some peptides are poorly soluble in plain water. Acidic peptides may dissolve better with a small amount of dilute ammonium bicarbonate or buffer; basic peptides with dilute acetic acid; very hydrophobic sequences may require a small proportion of DMSO or acetonitrile before dilution with water. These are specialist cases, and the supplier's solubility note on the technical data sheet should be followed. All compounds in our catalogue dissolve readily in bacteriostatic or sterile water.",
        ],
      },
      {
        heading: "Technique",
        paragraphs: [
          "Allow both the peptide vial and the diluent to reach room temperature before opening, to avoid condensation on the cold powder. Introduce the diluent slowly down the inside wall of the vial rather than directly onto the cake, then swirl gently until the solution is clear. Do not shake; vigorous agitation can cause foaming and aggregation. A cloudy solution or visible particulates indicate incomplete dissolution or a problem with the material.",
        ],
      },
      {
        heading: "Calculating concentration",
        paragraphs: [
          "Concentration is the vial content divided by the diluent volume. A 5 mg vial reconstituted with 2 ml gives 2.5 mg/ml, which is 2,500 mcg/ml. Each 0.1 ml of that solution, which is 10 units on a U-100 insulin-type syringe, contains 250 mcg. The same 5 mg vial reconstituted with 1 ml gives 5 mg/ml, or 500 mcg per 0.1 ml. Choosing the diluent volume therefore sets the working concentration; a larger volume gives a more dilute solution that is easier to measure in small increments. Each peptide page on our site includes a reconstitution reference that performs this calculation for any vial content and diluent volume.",
        ],
      },
      {
        heading: "Documentation",
        paragraphs: [
          "Every prepared solution should be labelled with the compound, the batch reference from the vial, the solvent used, the resulting concentration, the date of preparation and the initials of the person who prepared it. Record the same information in the laboratory notebook. Prepared solutions are refrigerated at 2–8 °C, protected from light, and discarded at the end of the period supported by the laboratory's own stability data. This is laboratory practice for research material and does not constitute administration guidance.",
        ],
      },
    ],
    products: ["bacteriostatic-water", "bpc-157"],
    related: ["laboratory-storage-lyophilised-peptides", "understanding-peptide-purity"],
  },

  /* ------------------------------------------------------------------ */
  "compound-profile-tirzepatide": {
    intro:
      "Tirzepatide is the most-studied dual-receptor incretin peptide and the subject of a large and fast-growing research literature. This profile sets out its structure, the engineering that gives it a long half-life, how it differs from single-receptor GLP-1 agonists, and the research contexts in which it appears.",
    sections: [
      {
        heading: "Identity",
        paragraphs: [
          "Tirzepatide (also LY3298176) is a synthetic linear peptide of 39 amino acids. Its molecular formula is C225H348N48O68 and its average molecular weight is approximately 4,813.5 g/mol. The peptide backbone is based on the sequence of GIP, glucose-dependent insulinotropic polypeptide, with substitutions that confer GLP-1 receptor activity, and it contains two Aib (2-aminoisobutyric acid) residues at positions 2 and 13 that protect it from degradation by dipeptidyl peptidase-4.",
        ],
      },
      {
        heading: "Half-life engineering",
        paragraphs: [
          "At lysine 20 the peptide carries a C20 fatty diacid (eicosanedioic acid) joined through a linker of γ-glutamic acid and two units of 2-[2-(2-aminoethoxy)ethoxy]acetic acid. The fatty diacid binds reversibly to serum albumin, which protects the peptide from renal clearance and enzymatic degradation and extends its circulating half-life in published pharmacokinetic work to around five days. The same strategy is used in semaglutide (C18 diacid) and retatrutide (C20 diacid).",
        ],
      },
      {
        heading: "Receptor pharmacology",
        paragraphs: [
          "Tirzepatide is described in the literature as an imbalanced dual agonist: it binds the GIP receptor with affinity comparable to native GIP and the GLP-1 receptor with lower affinity than native GLP-1, and it shows biased signalling at the GLP-1 receptor, favouring cAMP production over β-arrestin recruitment. Much of the mechanistic research examines what the GIP receptor component contributes beyond GLP-1 agonism alone, a question that remains open.",
        ],
      },
      {
        heading: "Areas of published research",
        paragraphs: [
          "The research literature spans receptor signalling studies in cell lines expressing the GIP and GLP-1 receptors; glucose homeostasis and insulin secretion models in isolated islets and in rodents; energy balance, adiposity and hepatic lipid models in preclinical systems; and a large clinical trial programme that is published and referenced widely. In the research-peptide context the compound is used in receptor pharmacology and in comparative work against semaglutide and retatrutide.",
        ],
      },
      {
        heading: "Analytical characterisation",
        paragraphs: [
          "Tirzepatide's size and lipidation make it more demanding to analyse than short peptides. On reversed-phase HPLC the fatty-diacid chain increases retention markedly, and the method must be chosen to resolve the main peak from deamidated and oxidised variants. Mass spectrometry confirms the full modified structure by matching the observed mass to the theoretical value, which includes the linker and fatty acid. Regent Peptides supplies tirzepatide in seven vial strengths, UK manufactured, with every batch tested by Janoshik Analytical and the certificate linked to the batch reference.",
        ],
      },
      {
        heading: "Status",
        paragraphs: [
          "Tirzepatide is an approved prescription medicine in several jurisdictions under brand names, and the approved product is manufactured, tested and supplied under pharmaceutical regulation. The research-grade peptide supplied here is not that product, is not a medicine, and is supplied solely for in-vitro laboratory research. It is not for human use.",
        ],
      },
    ],
    products: ["tirzepatide", "retatrutide", "semaglutide"],
    related: [
      "compound-profile-retatrutide",
      "glp-1-agonists-compared",
      "mass-spectrometry-identity",
    ],
  },

  /* ------------------------------------------------------------------ */
  "compound-profile-retatrutide": {
    intro:
      "Retatrutide extends the incretin-agonist approach to a third receptor. This profile covers its structure, how the glucagon receptor component distinguishes it from tirzepatide, and the research contexts in which the compound is studied.",
    sections: [
      {
        heading: "Identity",
        paragraphs: [
          "Retatrutide (LY3437943) is a synthetic linear peptide of 39 amino acids with the molecular formula C221H342N46O68 and an average molecular weight of approximately 4,731 g/mol. Like tirzepatide it is built on a GIP-derived backbone with Aib substitutions for protease resistance, and it carries a C20 fatty-diacid side chain on a lysine residue for albumin binding and extended half-life.",
        ],
      },
      {
        heading: "Three-receptor pharmacology",
        paragraphs: [
          "The feature that defines retatrutide in the literature is activity at the glucagon receptor in addition to the GIP and GLP-1 receptors. Published in-vitro characterisation describes it as a potent GIP receptor agonist with lower, but meaningful, activity at the GLP-1 and glucagon receptors. Glucagon receptor agonism is of research interest for its effects on hepatic energy expenditure and lipid metabolism, and the central question in much of the comparative work is what this third activity adds to dual agonism.",
        ],
      },
      {
        heading: "Comparison with tirzepatide and semaglutide",
        paragraphs: [
          "Semaglutide is a single GLP-1 receptor agonist of 31 residues. Tirzepatide adds GIP receptor activity in a 39-residue peptide. Retatrutide adds glucagon receptor activity in a 39-residue peptide of similar size and lipidation. The three are therefore a natural series for comparative pharmacology, and a substantial part of the recent literature consists of head-to-head work in receptor assays and preclinical metabolic models.",
        ],
      },
      {
        heading: "Areas of published research",
        paragraphs: [
          "Research on retatrutide concentrates on multi-receptor signalling in cell lines; hepatic steatosis and lipid metabolism in rodent models, where glucagon receptor activity is of particular interest; energy expenditure and adiposity models; and a clinical trial programme that is more recent and smaller than tirzepatide's but widely referenced. The compound is not approved as a medicine at the time of writing.",
        ],
      },
      {
        heading: "Analytical characterisation",
        paragraphs: [
          "As with tirzepatide, the lipidated 39-residue structure requires a well-chosen HPLC method to resolve closely related impurities, and identity is confirmed by mass spectrometry against the theoretical mass of the fully modified peptide. Regent Peptides supplies retatrutide in six vial strengths, UK manufactured, with each batch tested by Janoshik Analytical and documented against its batch reference.",
        ],
      },
      {
        heading: "Status",
        paragraphs: [
          "Retatrutide is an investigational compound. The research-grade peptide supplied here is not a medicine and is supplied solely for in-vitro laboratory research. It is not for human use.",
        ],
      },
    ],
    products: ["retatrutide", "tirzepatide", "semaglutide"],
    related: [
      "compound-profile-tirzepatide",
      "glp-1-agonists-compared",
      "how-peptide-batch-testing-works",
    ],
  },

  /* ------------------------------------------------------------------ */
  "compound-profile-semaglutide": {
    intro:
      "Semaglutide is the reference compound in incretin research: the GLP-1 analogue against which newer dual and triple agonists are compared. This profile covers its structure, the modifications that give it a week-long half-life, and its place in the literature.",
    sections: [
      {
        heading: "Identity",
        paragraphs: [
          "Semaglutide is a synthetic analogue of human GLP-1(7-37), a 31-amino-acid peptide. Its molecular formula is C187H291N45O59 and its average molecular weight is approximately 4,113.6 g/mol. Relative to native GLP-1 it has two amino-acid substitutions: Aib (2-aminoisobutyric acid) at position 8, which blocks cleavage by dipeptidyl peptidase-4, and arginine at position 34, which removes a lysine so that the fatty-acid chain can be attached site-specifically at the remaining lysine 26.",
        ],
      },
      {
        heading: "Half-life engineering",
        paragraphs: [
          "At lysine 26 the peptide carries a C18 fatty diacid (octadecanedioic acid) attached through a linker of γ-glutamic acid and two 8-amino-3,6-dioxaoctanoic acid units. This chain binds reversibly to serum albumin, protecting the peptide from renal clearance and extending its half-life in published pharmacokinetic work to approximately one week. The approach was developed from liraglutide, an earlier analogue with a C16 monoacid, and was subsequently applied to tirzepatide and retatrutide.",
        ],
      },
      {
        heading: "Receptor pharmacology",
        paragraphs: [
          "Semaglutide is a full agonist at the GLP-1 receptor with affinity comparable to native GLP-1. It has no activity at the GIP or glucagon receptors, which is what makes it the baseline for the dual- and triple-agonist comparisons that dominate recent incretin literature. GLP-1 receptor activation in published work stimulates glucose-dependent insulin secretion in islet models and acts at receptors in the central nervous system and gastrointestinal tract.",
        ],
      },
      {
        heading: "Areas of published research",
        paragraphs: [
          "The literature is very large and includes receptor-signalling studies in cell lines, islet and glucose-homeostasis models, energy-balance and adiposity models in rodents, and an extensive clinical programme. In the research-peptide context the compound is used in receptor pharmacology, as a comparator for newer agonists, and in combination studies with amylin analogues such as cagrilintide.",
        ],
      },
      {
        heading: "Analytical characterisation",
        paragraphs: [
          "Semaglutide is analysed by reversed-phase HPLC, where the lipidated chain extends retention, and by mass spectrometry against the theoretical mass of the full modified structure. Regent Peptides supplies semaglutide in two vial strengths, UK manufactured, with each batch independently tested by Janoshik Analytical.",
        ],
      },
      {
        heading: "Status",
        paragraphs: [
          "Semaglutide is an approved prescription medicine in many jurisdictions under several brand names. The research-grade peptide supplied here is not that product, is not a medicine, and is supplied solely for in-vitro laboratory research. It is not for human use.",
        ],
      },
    ],
    products: ["semaglutide", "cagrilintide", "tirzepatide"],
    related: [
      "glp-1-agonists-compared",
      "compound-profile-tirzepatide",
      "understanding-certificates-of-analysis",
    ],
  },

  /* ------------------------------------------------------------------ */
  "compound-profile-tb-500": {
    intro:
      "TB-500 is sold and studied under a name that obscures what it is. This profile explains its relationship to thymosin beta-4, its actual sequence and mass, and the research in which it appears, including its frequent pairing with BPC-157.",
    sections: [
      {
        heading: "Identity",
        paragraphs: [
          "TB-500 is a synthetic peptide corresponding to residues 17–23 of thymosin beta-4 (Tβ4), with an acetylated N-terminus: Ac-Leu-Lys-Lys-Thr-Glu-Thr-Gln, or Ac-LKKTETQ. Its molecular formula is C38H68N10O14 and its molecular weight is approximately 889 g/mol. Thymosin beta-4 itself is a 43-amino-acid protein of about 4,963 g/mol; TB-500 is therefore a small fragment of it, not the full protein, despite the two names often being used interchangeably in supplier listings.",
        ],
      },
      {
        heading: "Why this fragment",
        paragraphs: [
          "Thymosin beta-4 is the most abundant actin-sequestering protein in most cells: it binds monomeric G-actin and regulates its availability for polymerisation into filaments. The actin-binding activity has been mapped to a short central motif, LKKTET, and the 17–23 fragment reproduces this motif. The fragment is therefore used in research as a minimal actin-binding peptide and as a proxy for Tβ4 in models where the full protein is impractical to synthesise.",
        ],
      },
      {
        heading: "Areas of published research",
        paragraphs: [
          "Research on thymosin beta-4 and its fragments concerns actin dynamics and cell migration in culture, wound-model studies in animals including dermal and corneal models, and cardiovascular models of tissue repair. Much of this literature uses the full protein; work specifically on the 17–23 fragment examines whether the actin-binding motif alone reproduces its effects. Controlled human data on the fragment is minimal.",
        ],
      },
      {
        heading: "Pairing with BPC-157",
        paragraphs: [
          "TB-500 and BPC-157 are routinely studied together and we supply them both individually and as a combined 20 mg blend. They are chemically unrelated: one is a seven-residue thymosin fragment acting on the actin cytoskeleton, the other a fifteen-residue gastric-derived peptide with proposed activity on nitric-oxide and growth-factor pathways. The pairing reflects research interest in whether distinct mechanisms are complementary in repair models rather than any similarity between the molecules.",
        ],
      },
      {
        heading: "Analytical characterisation",
        paragraphs: [
          "TB-500 is a hydrophilic peptide that elutes early on reversed-phase HPLC and gives a clean single peak. Identity is confirmed by mass spectrometry; the acetyl group adds 42 Da to the mass of the unmodified sequence, which is a straightforward check that the correct modified peptide is present. Regent Peptides supplies TB-500 in 5 mg and 10 mg vials, UK manufactured and independently tested batch by batch by Janoshik Analytical.",
        ],
      },
    ],
    products: ["tb-500", "bpc-157", "bpc-157-tb-500-mix"],
    related: ["compound-profile-bpc-157", "peptide-bonds-and-sequence-notation"],
  },

  /* ------------------------------------------------------------------ */
  "glp-1-agonists-compared": {
    intro:
      "Semaglutide, tirzepatide and retatrutide are a series: one, two and three receptors, engineered with the same half-life strategy and compared against each other throughout the recent literature. This article lays the three side by side structurally and pharmacologically, as a reference for laboratories working with any of them.",
    sections: [
      {
        heading: "The incretin receptors",
        paragraphs: [
          "GLP-1 (glucagon-like peptide-1) and GIP (glucose-dependent insulinotropic polypeptide) are gut hormones released after a meal that potentiate glucose-dependent insulin secretion; together they are called incretins. Glucagon is the pancreatic hormone that raises blood glucose and increases hepatic energy expenditure. Each has its own G-protein-coupled receptor. The three peptides in this comparison differ in which of these receptors they activate.",
        ],
      },
      {
        heading: "Structure side by side",
        paragraphs: [
          "Semaglutide: 31 amino acids, a GLP-1(7-37) analogue, C187H291N45O59, about 4,113.6 g/mol, C18 fatty diacid at lysine 26, Aib at position 8. Tirzepatide: 39 amino acids, a GIP-based backbone, C225H348N48O68, about 4,813.5 g/mol, C20 fatty diacid at lysine 20, Aib at positions 2 and 13. Retatrutide: 39 amino acids, a GIP-based backbone, C221H342N46O68, about 4,731 g/mol, C20 fatty diacid on a lysine side chain, Aib substitutions for protease resistance.",
          "The shared design elements are deliberate. Aib at the second position blocks dipeptidyl peptidase-4, the enzyme that inactivates native incretins within minutes. The fatty-diacid chain binds serum albumin, extending circulating half-life from minutes to days. The differences lie in the backbone sequence, which determines receptor selectivity.",
        ],
      },
      {
        heading: "Receptor profile",
        paragraphs: [
          "Semaglutide activates the GLP-1 receptor only. Tirzepatide activates the GIP receptor with high affinity and the GLP-1 receptor with lower affinity, and is described as a biased agonist at the latter. Retatrutide activates the GIP receptor most potently, with additional activity at the GLP-1 and glucagon receptors. The series therefore moves from one receptor to three, and the open scientific questions are what each additional receptor contributes: the GIP component in tirzepatide, and the glucagon component in retatrutide.",
        ],
      },
      {
        heading: "What the comparative literature examines",
        paragraphs: [
          "In vitro, the three are compared in receptor-binding and cAMP assays in cell lines expressing each receptor individually, which is where the selectivity figures above come from. In preclinical models they are compared for effects on glucose homeostasis, energy expenditure, adiposity and hepatic lipid content. Clinically, tirzepatide has been compared directly with semaglutide in published trials, and retatrutide's programme is more recent. For a research laboratory the practical point is that the three are best understood as variations on one design rather than three unrelated compounds.",
        ],
      },
      {
        heading: "Analytical considerations",
        paragraphs: [
          "All three are large, lipidated peptides that require a well-developed reversed-phase HPLC method to resolve the main peak from deamidated, oxidised and truncated variants, and all three are identity-confirmed by mass spectrometry against the theoretical mass of the full modified structure. Regent Peptides supplies all three, UK manufactured, with every batch tested by Janoshik Analytical; semaglutide in two strengths, retatrutide in six and tirzepatide in seven.",
        ],
      },
      {
        heading: "Status",
        paragraphs: [
          "Semaglutide and tirzepatide are approved prescription medicines in several jurisdictions; retatrutide is investigational. The research-grade peptides supplied here are not those products, are not medicines, and are supplied solely for in-vitro laboratory research. They are not for human use.",
        ],
      },
    ],
    products: ["semaglutide", "tirzepatide", "retatrutide"],
    related: [
      "compound-profile-tirzepatide",
      "compound-profile-retatrutide",
      "compound-profile-semaglutide",
    ],
  },
};
