export interface Faq { q: string; a: string; category: "Products" | "Buying" | "Company" | "Investors" }

export const faqs: Faq[] = [
  {
    category: "Products",
    q: "Which Panyam cement products are available?",
    a: "Four products: Panyam Prestige (OPC 53 grade), Panyam Super (OPC 43 grade), Panyam Power (Portland Pozzolana Cement, fly-ash based) and Panyam 53-S (railway sleeper grade cement).",
  },
  {
    category: "Products",
    q: "What is the difference between OPC 53 and PPC?",
    a: "OPC 53 (Panyam Prestige) gains strength quickly, which suits RCC work where early de-shuttering matters. PPC (Panyam Power) blends fly ash for lower heat of hydration and long-term durability, which suits foundations, mass concrete, plastering and masonry. Our team can recommend the right product for your job.",
  },
  {
    category: "Products",
    q: "How does Panyam Prestige compare with the BIS standard?",
    a: "Per our published technical specifications, Panyam Prestige achieves 65 MPa at 28 days against the IS 269:2015 requirement of 53 MPa, with fineness of 316 m²/kg against 225 m²/kg.",
  },
  {
    category: "Products",
    q: "What is 53-S sleeper grade cement?",
    a: "53-S is a special grade of OPC used to manufacture pre-stressed concrete railway sleepers. Panyam Cement was the first company to supply railway sleeper grade cement (earlier known as IRST-40).",
  },
  {
    category: "Buying",
    q: "Where is Panyam Cement available?",
    a: "Panyam Cement is marketed across Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Kerala and Goa. Contact our marketing office to find the nearest dealer.",
  },
  {
    category: "Buying",
    q: "How do I place a bulk order or request a quote?",
    a: "Use the Quote option on our enquiry form with the product, quantity and delivery location. Our marketing team will get back to you with pricing and availability.",
  },
  {
    category: "Buying",
    q: "How can I become a Panyam Cement dealer?",
    a: "Choose “Become a dealer” on the enquiry form and share your business details. Our marketing team reviews every application.",
  },
  {
    category: "Buying",
    q: "How many bags of cement do I need?",
    a: "Use our cement calculator for an estimate based on the area, thickness and mix ratio. Always confirm final quantities with your engineer.",
  },
  {
    category: "Company",
    q: "Where is the Panyam Cement plant?",
    a: "Our cement works are at Cement Nagar – 518206, Nandyal District, Andhra Pradesh, in the Rayalaseema region. The corporate office is in Madhapur, Hyderabad.",
  },
  {
    category: "Company",
    q: "What is the plant’s capacity?",
    a: "Panyam Cement has an installed capacity of 1 Million Metric Tonnes per Annum, with a second line in the pipeline.",
  },
  {
    category: "Company",
    q: "Can I visit the plant?",
    a: "Yes. Request a plant visit through the enquiry form and our team will confirm a suitable date.",
  },
  {
    category: "Investors",
    q: "Where can I find financial results and annual reports?",
    a: "All statutory disclosures — annual reports, quarterly results, shareholding patterns, governance reports and notices — are on the Investors page.",
  },
  {
    category: "Investors",
    q: "Who handles investor grievances?",
    a: "Ch Seshi Kumar, Company Secretary & Compliance Officer — pcmilcao@panyamcements.in, 040 4954 4944. Share transfers are handled by XL Softech Systems Ltd.",
  },
];
