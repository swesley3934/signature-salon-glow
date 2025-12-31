export interface Service {
  name: string;
  price: string;
  duration: string;
  note?: string;
  deposit?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  services: Service[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "hair",
    title: "Hair Services",
    icon: "Scissors",
    description: "Expert cuts and styling for every occasion",
    services: [
      { name: "Women's Haircut", price: "$60+", duration: "60 min" },
      { name: "Men's Haircut", price: "$40+", duration: "30 min" },
      { name: "Girl Haircut", price: "$45+", duration: "45 min" },
      { name: "Boy's Haircut", price: "Varies", duration: "30 min" },
      { name: "Women's Shampoo Blow Dry", price: "$40+", duration: "30 min" },
      { name: "Formal Style", price: "$60+", duration: "45 min" },
      { name: "Bridal Updo", price: "$125+", duration: "60 min", deposit: "$75" },
      { name: "Silk Press", price: "Varies", duration: "120 min" },
    ],
  },
  {
    id: "color",
    title: "Color Services",
    icon: "Palette",
    description: "Vibrant colors and stunning highlights",
    services: [
      { name: "Single Process Color", price: "Varies", duration: "90 min" },
      { name: "Retouch - Single Process Color", price: "$70+", duration: "60 min" },
      { name: "Full Foil Highlights", price: "$180+", duration: "180 min", note: "Toner Included" },
      { name: "Partial Foils", price: "$150+", duration: "150 min" },
      { name: "Express Foil", price: "$100+", duration: "60 min", note: "Includes Toner" },
      { name: "Partial Foil+All Over Color", price: "$200+", duration: "150 min", note: "Toner Included" },
      { name: "Balayage", price: "$200+", duration: "120 min" },
      { name: "Platinum Card", price: "$200+", duration: "300 min", note: "Toner Included" },
      { name: "Partial Foil Men", price: "$100+", duration: "60 min" },
      { name: "Toner", price: "Varies", duration: "15+ min" },
    ],
  },
  {
    id: "treatments",
    title: "Treatments",
    icon: "Sparkles",
    description: "Rejuvenating hair treatments",
    services: [
      { name: "Brazilian Blowout", price: "$275+", duration: "120 min" },
      { name: "Split End Treatment", price: "$70+", duration: "45 min" },
      { name: "Texture Perm", price: "$100+", duration: "105 min" },
      { name: "Deep Conditioning - Women", price: "Varies", duration: "45 min" },
      { name: "Scalp Massage", price: "$60+", duration: "45 min", note: "Herbal oil+Shampoo+Blow Dry" },
      { name: "BondRx Treatment", price: "$20+", duration: "10 min", note: "With Other Service" },
    ],
  },
  {
    id: "threading",
    title: "Threading",
    icon: "Eye",
    description: "Precise and gentle hair removal",
    services: [
      { name: "Threading", price: "Varies", duration: "10+ min", note: "Brows, Lip, Forehead, Chin, Sideburns, Full Face" },
      { name: "Lip Threading", price: "$10+", duration: "10 min" },
      { name: "Chin Threading", price: "Varies", duration: "10 min" },
    ],
  },
  {
    id: "waxing",
    title: "Waxing",
    icon: "Droplet",
    description: "Smooth, long-lasting results",
    services: [
      { name: "Waxing", price: "Varies", duration: "10+ min", note: "Brows, Full Face, Under Arms, Arms, Legs, Bikini" },
    ],
  },
  {
    id: "facials",
    title: "Facials",
    icon: "Heart",
    description: "Luxurious skincare treatments",
    services: [
      { name: "Herbal Facial", price: "$80+", duration: "60 min" },
      { name: "Gold/Diamond Facial", price: "$100+", duration: "60 min" },
      { name: "Chemical Peel", price: "$170+", duration: "60 min", deposit: "$50" },
      { name: "Facial Cleanse", price: "$50+", duration: "10 min" },
    ],
  },
  {
    id: "makeup",
    title: "Makeup",
    icon: "Brush",
    description: "Flawless looks for any occasion",
    services: [
      { name: "Make-up", price: "$60+", duration: "60 min", note: "Evening, Party, Prom, Bridal, Special Occasion" },
    ],
  },
  {
    id: "specialty",
    title: "Specialty",
    icon: "Crown",
    description: "Unique services for special needs",
    services: [
      { name: "Men's Hairpiece Hair Cut", price: "$60+", duration: "45 min" },
      { name: "Women's Wig Cut", price: "$80+", duration: "45 min" },
      { name: "Beard Trim", price: "$10+", duration: "15 min" },
      { name: "Additional Services", price: "$20+", duration: "10 min" },
    ],
  },
];
