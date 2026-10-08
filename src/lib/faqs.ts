export type Faq = { q: string; a: string };

export const FAQ_CATEGORIES: { name: string; items: Faq[] }[] = [
  {
    name: "Orders & Shipping",
    items: [
      {
        q: "How long does delivery take?",
        a: "Orders placed before 3pm on a working day are dispatched the same day. UK delivery is by Royal Mail Tracked 24 (Standard £4.99) or Express (£6.99), charged at checkout. Delivery dates shown at checkout are the ones that apply to your order.",
      },
      {
        q: "Is delivery free?",
        a: "No. Delivery is charged at checkout — Standard £4.99 or Express £6.99.",
      },
      {
        q: "When are orders dispatched?",
        a: "Monday to Friday, excluding bank holidays. The cut-off for same-day dispatch is 3pm.",
      },
      {
        q: "Will I receive tracking?",
        a: "Yes, tracking is emailed on dispatch.",
      },
      {
        q: "What if my order hasn't arrived?",
        a: "Contact our team within 14 days and we'll resolve it the same working day.",
      },
      {
        q: "Do you ship internationally?",
        a: "No. We currently ship within the United Kingdom only.",
      },
      {
        q: "What if my product shows up damaged?",
        a: "Get in touch with your order number, a clear photo of the damage and a brief description. We'll arrange a reshipment of the damaged product as quickly as possible.",
      },
      {
        q: "Can I place a bulk order?",
        a: "Yes, we offer bulk purchasing for research laboratories. Get in touch with the products and quantities you need and we'll come back with pricing and lead times.",
      },
    ],
  },
  {
    name: "Payments",
    items: [
      {
        q: "Which payment methods do you accept?",
        a: "Payment is taken on Shopify's hosted checkout. The methods available to you are the ones shown on the checkout page at the time of your order.",
      },
      {
        q: "Is checkout secure?",
        a: "Yes. Payment is processed on Shopify's PCI-compliant hosted checkout with end-to-end encryption. We never see or store your card details.",
      },
    ],
  },

  {
    name: "Product & Quality",
    items: [
      {
        q: "Do you provide a Certificate of Analysis (CoA)?",
        a: "In-house CoAs are available to download on every product page. They are not batch-specific, they confirm peptide identity and minimum purity based on our internal HPLC and MS testing. CoAs are not shipped with orders. A typical CoA includes peptide identity (sequence, molecular formula and weight), HPLC purity (typically ≥98%), MS or LC-MS confirmation, appearance of the lyophilised product, and a batch/lot reference. If a CoA is missing from a product page, get in touch and we'll sort it. Researchers needing batch-level verification are encouraged to arrange independent testing.",
      },
      {
        q: "What is the difference between peptide purity and peptide yield?",
        a: "Purity is the proportion of the target peptide relative to all peptide-related species, measured by HPLC — a purity of 98% means 98% is the correct sequence and 2% are related impurities. This is the main quality metric. Yield is the total mass recovered from a synthesis run after purification, a manufacturing figure, not a quality indicator. We specify products by purity, not yield, and yield figures are not published.",
      },
      {
        q: "Why does a 5mg vial appear nearly empty? Can it be verified by weight?",
        a: "This is completely normal. 5mg is a tiny amount of material, roughly a few grains of fine salt, and in a standard 2ml or 3ml vial it appears as a thin film, a small disc, or barely visible powder at the bottom. Weighing the vial isn't a reliable check: lab balance tolerances often exceed the peptide mass at this scale, the glass, stopper, crimp seal and residual moisture dwarf the peptide weight, and tare weights vary vial-to-vial even within the same batch. The proper way to verify content is analytical testing (HPLC or mass spectrometry) — see the in-house CoA on each product page. If you have a concern about a specific vial, send the order reference and photos and we'll look into it.",
      },
      {
        q: "Why does my vial appear different or lack a vacuum seal?",
        a: "Minor cosmetic differences between vials are normal and don't indicate a quality issue. The freeze-dried cake can range from a compact disc to a looser powder, and cap colours sometimes differ between batches. Not every vial is sealed under vacuum, some are nitrogen-flushed instead, and this varies by peptide and production run. Vacuum or no vacuum, quality and purity are unaffected provided the vial has been stored correctly (sealed, refrigerated, away from light). If something looks wrong — a broken seal or visible contamination — send us photos and we'll investigate.",
      },
      {
        q: "What vial sizes are available?",
        a: "Vial sizes and peptide quantities vary by product and are listed on each product page. Common sizes are 2mg, 5mg, 10mg and 15mg, with some products available in larger quantities. All vials are laboratory-grade borosilicate glass with crimped aluminium seals and rubber stoppers. If you need a quantity not listed on the site, let us know.",
      },
      {
        q: "How should peptides be handled and stored?",
        a: "Proper handling keeps peptides in good condition. Temperature: store freeze-dried peptides at 2–8°C (fridge) for short-term use, or -20°C (freezer) for long-term storage. Light: keep away from direct light, UV can degrade tryptophan and tyrosine residues in particular. Moisture: keep vials sealed until use, as freeze-dried peptides absorb moisture from the air, accelerating degradation. Handling: let refrigerated or frozen vials reach room temperature before opening to prevent condensation forming inside. After reconstitution: aliquot into single-use volumes where possible and store frozen, avoiding repeated freeze-thaw cycles. Treat all products as research chemicals in line with your institutional safety guidelines. MSDS sheets are available on request for any product.",
      },
      {
        q: "Where are products made?",
        a: "Produced in audited UK facilities to strict quality and research standards.",
      },
    ],
  },
  {
    name: "Compliance",
    items: [
      {
        q: "Are your products legal in the UK?",
        a: "Yes. All products are research-grade compounds compliant with UK and EU regulations, supplied strictly for in-vitro laboratory research.",
      },
      {
        q: "Do you make medical claims?",
        a: "No. Products are research compounds and not intended to diagnose, treat, cure or prevent disease.",
      },
    ],
  },
  {
    name: "Support",
    items: [
      {
        q: "How do I contact you?",
        a: "Use the contact form and our London team will reply within 4 working hours.",
      },
      {
        q: "Do you accept returns?",
        a: "Sealed vials in their original, undamaged packaging can be returned within 14 days of delivery — email orders@regentpeptides.com for a returns reference first. Opened, reconstituted or unsealed vials cannot be returned unless faulty or not as described. Full details are on our Returns & Refund Policy page.",

      },
      {
        q: "Do you issue refunds?",
        a: "Refunds are handled case-by-case by our customer service team. When asking about a refund, please include your order number and a description of the issue along with any supporting photos.",
      },
    ],
  },
];

export const FAQS: Faq[] = FAQ_CATEGORIES.flatMap((c) => c.items);
