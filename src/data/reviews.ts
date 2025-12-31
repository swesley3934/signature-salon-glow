export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  service: string;
  date: string;
  avatar?: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    name: "Jennifer M.",
    rating: 5,
    text: "Sharon is absolutely amazing! She transformed my hair with the most beautiful balayage. The salon has such a welcoming atmosphere, and the results exceeded my expectations. I've finally found my forever stylist!",
    service: "Balayage",
    date: "December 2024",
  },
  {
    id: 2,
    name: "Amanda R.",
    rating: 5,
    text: "Best bridal updo I could have ever imagined! Sharon listened to exactly what I wanted and created a masterpiece. She even did a trial run to make sure everything was perfect for my big day.",
    service: "Bridal Updo",
    date: "November 2024",
  },
  {
    id: 3,
    name: "Michelle T.",
    rating: 5,
    text: "I've been coming to SC Signature for years now. The Brazilian Blowout treatment has completely changed my hair game. My hair is so much more manageable and looks incredible for months!",
    service: "Brazilian Blowout",
    date: "October 2024",
  },
  {
    id: 4,
    name: "Sarah K.",
    rating: 5,
    text: "The Gold Facial was absolutely divine! My skin has never looked better. Sharon really knows her craft and makes you feel pampered from start to finish. Highly recommend!",
    service: "Gold Facial",
    date: "September 2024",
  },
  {
    id: 5,
    name: "Lisa P.",
    rating: 5,
    text: "Got my highlights done here and I'm in love! The color is exactly what I wanted - natural-looking and dimensional. Sharon took her time and made sure every detail was perfect.",
    service: "Full Foil Highlights",
    date: "August 2024",
  },
  {
    id: 6,
    name: "Diana L.",
    rating: 5,
    text: "The threading service is quick, precise, and virtually painless. I won't go anywhere else for my eyebrows. Sharon has the steadiest hands and always gets my brow shape just right!",
    service: "Threading",
    date: "July 2024",
  },
];
