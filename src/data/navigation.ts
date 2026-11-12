export interface NavChild { label: string; href: string; description?: string }
export interface NavItem { label: string; href: string; children?: NavChild[] }

export const navigation: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about#story", description: "Seven decades since 1955" },
      { label: "Leadership", href: "/about#leadership", description: "Board and management" },
      { label: "Legacy Projects", href: "/about#legacy", description: "Dams and railways built with Panyam" },
      { label: "Accord Group", href: "/about#group", description: "Our parent group" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Panyam Prestige", href: "/products/panyam-prestige", description: "OPC 53 Grade" },
      { label: "Panyam Super", href: "/products/panyam-super", description: "OPC 43 Grade" },
      { label: "Panyam Power", href: "/products/panyam-power", description: "PPC — fly-ash based" },
      { label: "Panyam 53-S", href: "/products/panyam-53s", description: "Railway sleeper grade" },
      { label: "Cement Calculator", href: "/calculator", description: "Estimate bags for your project" },
    ],
  },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Network", href: "/network" },
  {
    label: "Media",
    href: "/gallery",
    children: [
      { label: "Gallery", href: "/gallery", description: "Plant, products and brand" },
      { label: "Blog & Updates", href: "/blog", description: "Building guides and news" },
      { label: "FAQ", href: "/faq", description: "Answers to common questions" },
      { label: "Brochure", href: "/Brouchure/Big%20Brouchure%202.pdf", description: "Download the company brochure (PDF)" },
    ],
  },
  { label: "Investors", href: "/investors" },
  { label: "Careers", href: "/careers" },
];
