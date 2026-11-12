// Verified company information.
// Sources: panyamcements.in (Nov 2026 audit) and the company brochure
// (/public/Brouchure/Big Brouchure 2.pdf). Do not add claims that are not in a source.

export const company = {
  legalName: "Panyam Cements & Mineral Industries Ltd.",
  shortName: "Panyam Cement",
  tagline: "Lasting Strength for Generations",
  founded: 1955,
  incorporated: "23 June 1955",
  firstBag: 1957,
  cin: "L26940AP1955PLC000546",
  parentGroup: "Accord Group",
  capacity: "1 Million Metric Tonnes per Annum",
  capacityShort: "1 MTPA",
  limestone: "Narji limestone",
  region: "Rayalaseema, Andhra Pradesh",
  presence: ["Andhra Pradesh", "Telangana", "Karnataka", "Tamil Nadu", "Kerala", "Goa"],
  brochure: "/Brouchure/Big%20Brouchure%202.pdf",
  offices: [
    {
      id: "works",
      title: "Registered Office & Cement Works",
      lines: ["Cement Nagar – 518206", "Nandyal District, Andhra Pradesh"],
      contact: "Sri N Srinivasa Rao, Vice President",
      phones: ["08516 293622 (Admin)", "08516 293625 (Marketing)"],
      email: "pcmil2021@panyamcements.in",
      map: "https://www.google.com/maps/search/?api=1&query=Panyam+Cements+Cement+Nagar+518206",
    },
    {
      id: "corporate",
      title: "Corporate Office",
      lines: ["H.No. 1-65, 1st Floor, Plot No. 539, Road No. 11", "Kakateeya Hills, Madhapur", "Hyderabad – 500081, Telangana"],
      contact: "Sri P Anil Kumar, Finance Department",
      phones: ["040 4954 4944"],
      email: "pcmilcao@panyamcements.in",
      map: "https://www.google.com/maps/search/?api=1&query=Kakateeya+Hills+Madhapur+Hyderabad+500081",
    },
    {
      id: "marketing",
      title: "Marketing Office",
      lines: ["H.No. 1-65, 1st Floor, Plot No. 539, Road No. 11", "Kakateeya Hills, Madhapur", "Hyderabad – 500081, Telangana"],
      contact: "Sri P. Kumar Raja, A.G.M – Marketing",
      phones: ["040 4954 4944"],
      email: "marketing@panyamcements.in",
    },
    {
      id: "purchase",
      title: "Purchase Office",
      lines: ["H.No. 1-65, 1st Floor, Plot No. 539, Road No. 11", "Kakateeya Hills, Madhapur", "Hyderabad – 500081, Telangana"],
      contact: "Sri R. Subhash",
      phones: ["040 4954 4944"],
      email: "purchase@panyamcements.in",
    },
  ],
  investorContact: {
    name: "Ch Seshi Kumar",
    role: "Company Secretary & Compliance Officer",
    email: "pcmilcao@panyamcements.in",
    phone: "040 4954 4944",
  },
  registrar: {
    name: "XL Softech Systems Ltd",
    lines: ["Plot No 3, Sagar Society, Banjara Hills, Road No 2", "Hyderabad, Telangana 500034"],
    contact: "Sri R. Ram Prasad, Compliance Officer",
    phone: "040 2354 5914",
    email: "xlfield@gmail.com",
    website: "https://www.xlsoftech.com",
  },
  primaryPhone: "040 4954 4944",
  primaryPhoneHref: "tel:+914049544944",
  salesEmail: "marketing@panyamcements.in",
} as const;

export const board = [
  { name: "Dr. Jagathrakshakan Srinisha", din: "01728749", role: "Managing Director" },
  { name: "Mr. Narayanasamy Elamaran", din: "01744259", role: "Director (Non-Executive)" },
  { name: "Mr. Vasudevan Raghavan", din: "02745060", role: "Director (Independent)" },
  { name: "Mr. Ramachandran Balachandran", din: "01648200", role: "Director (Independent)" },
] as const;

export const leaders = [
  {
    name: "Dr. Jagathrakshakan Srinisha",
    role: "Managing Director",
    bio: "A doctor by profession (MDS) and a well-known member of the Dental Council of India for accreditation and validation of dental educational institutions. A trustee of a renowned educational trust administering educational institutions and private companies, she brings the expertise and business acumen required to manage the overall business of the Company.",
  },
  {
    name: "Mr. Narayanasamy Elamaran",
    role: "Director",
    bio: "A Mechanical Engineer with over two decades of expertise in the design and construction industry, and promoter of private companies providing solutions to the Indian Ministry of Defence and the Indian Space Research Organisation (ISRO).",
  },
] as const;

/** Milestones taken from the company history on panyamcements.in */
export const timeline = [
  { year: "1955", title: "Incorporated", text: "Promoted by Padmasri Somappa and others, incorporated on 23 June 1955 with a vision to build the infrastructure of the State and of newly independent India." },
  { year: "1957", title: "The first bag", text: "The first bag of Panyam Cement rolls out — a name that has stood for strength, quality and reputation ever since." },
  { year: "1960s–80s", title: "Market leader", text: "Panyam Cement leads the market across South India, Maharashtra and Goa, and builds landmark dams including Srisailam and Nagarjuna Sagar." },
  { year: "1970s", title: "First on the railways", text: "Among the first companies in India to supply cement for concrete railway sleepers — the origin of today's 53-S sleeper grade." },
  { year: "1997", title: "2,200 TPD", text: "Wet-process kilns converted to dry process, taking capacity from 200 TPD to 2,200 TPD across three kilns." },
  { year: "2021", title: "A new beginning", text: "Following the CIRP under the IBC, Dr. Srinisha Jagathrakshakan with RV Consulting Services Pvt. Ltd. and Sagar Power Ltd. become the new promoters and revive the company." },
  { year: "Today", title: "Refurbished & producing", text: "A completely refurbished plant with state-of-the-art kiln and coolers, an installed capacity of 1 MTPA and a second line in the pipeline." },
] as const;

/** Landmark projects named in company sources */
export const legacyProjects = [
  { name: "Srisailam Dam", state: "Andhra Pradesh" },
  { name: "Nagarjuna Sagar Dam", state: "Andhra Pradesh" },
  { name: "Almatti Dam", state: "Karnataka" },
  { name: "Upper Krishna Project", state: "Karnataka" },
  { name: "Malaprabha Dam", state: "Karnataka" },
  { name: "Koyana Project", state: "Maharashtra" },
  { name: "Jayakawadi Project", state: "Maharashtra" },
] as const;

/** "Longstanding relationships" — company brochure */
export const institutionalClients = [
  "Andhra Pradesh Irrigation Department",
  "Andhra Pradesh State Housing Corporation Ltd.",
  "Andhra Pradesh Power Generation Corporation Ltd.",
  "Telangana State Power Generation Corpn. Ltd.",
  "Karnataka Rural Infrastructure Development Ltd.",
  "Bharat Heavy Electricals Ltd.",
  "Shapoorji Pallonji Group",
  "Tata Projects Ltd.",
  "Megha Engineering Ltd.",
  "National Small Industries Corporation Ltd.",
  "Rural Development Trust",
  "Rayalaseema Development Trust",
  "Lanco Group of Industries",
  "Southern Ferro Steel Ltd.",
  "Hutti Gold Mines Company Ltd.",
] as const;

export const salientFeatures = ["Strength", "Workability", "Durability", "Sustainability", "Chemical Resistance", "Finish"] as const;

export const labFacilities = [
  { title: "Central Control Room", text: "Plant operations monitored and controlled from a central control room (CCR)." },
  { title: "X-Ray Analyser", text: "Chemical composition verified by X-ray analysis for consistent raw mix and clinker quality." },
  { title: "Chemical Laboratory", text: "In-house chemical testing of raw materials, clinker and finished cement." },
  { title: "Physical Laboratory", text: "Fineness, setting time and compressive strength tested against BIS requirements." },
] as const;
