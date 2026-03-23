export interface Property {
  id: string;
  name: string;
  developer: string;
  location: string;
  microMarket: "South Mumbai" | "Western Suburbs" | "Central Suburbs" | "Navi Mumbai" | "Thane";
  price: {
    display: string;
    value: number; // in rupees
    isStarting: boolean;
  };
  bhk: number[]; // e.g [2, 3] for 2 & 3 BHK
  areaText: string;
  status: "Ready to Move" | "Under Construction" | "New Launch";
  possessionDate?: string;
  reraId?: string;
  images: string[];
  amenities: string[];
  carpetAreaSqft: number;
  featured: boolean;
  isFurnished: boolean;
  baths: number;
  orientation?: string;
  description: string;
}

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "lodha-world-view",
    name: "Lodha World View",
    developer: "Lodha Group",
    location: "Worli, Mumbai",
    microMarket: "South Mumbai",
    price: { display: "₹12.4 Cr", value: 124000000, isStarting: true },
    bhk: [4, 5],
    areaText: "2,800 sq.ft",
    status: "Ready to Move",
    reraId: "P51900001234",
    images: ["/images/luxury_apartment_exterior_1774281957165.png", "/images/luxury_apartment_living_room_1774281976681.png", "/images/mumbai_skyline_hero_1774281938568.png"],
    amenities: ["Modern Gym", "Covered Parking", "High-speed Lifts", "Infinity Pool", "3-Tier Security", "100% Backup", "Clubhouse", "Kid's Play Area"],
    carpetAreaSqft: 2800,
    featured: true,
    isFurnished: false,
    baths: 4,
    orientation: "Sea Facing",
    description: "Located in the heart of South Mumbai, Lodha World View offers uninterrupted views of the Arabian Sea and the city skyline. Experience ultra-luxury living with 5-star amenities.",
  },
  {
    id: "oberoi-sky-city",
    name: "Oberoi Sky City",
    developer: "Oberoi Realty",
    location: "Borivali East, Mumbai",
    microMarket: "Western Suburbs",
    price: { display: "₹3.85 Cr", value: 38500000, isStarting: false },
    bhk: [3],
    areaText: "1,150 sq.ft",
    status: "Ready to Move",
    reraId: "P51800001111",
    images: ["/images/luxury_apartment_living_room_1774281976681.png", "/images/luxury_apartment_exterior_1774281957165.png", "/images/mumbai_skyline_hero_1774281938568.png"],
    amenities: ["Modern Gym", "Covered Parking", "High-speed Lifts", "Squash Court", "3-Tier Security", "100% Backup", "Clubhouse", "Kid's Play Area"],
    carpetAreaSqft: 1150,
    featured: true,
    isFurnished: false,
    baths: 3,
    orientation: "East Facing",
    description: "Oberoi Sky City integrates premium living spaces with world-class design. Enjoy sprawling landscapes and exceptional connectivity right at the Western Express Highway.",
  },
  {
    id: "piramal-aranya",
    name: "Piramal Aranya",
    developer: "Piramal Realty",
    location: "Byculla, South Mumbai",
    microMarket: "South Mumbai",
    price: { display: "₹5.2 Cr", value: 52000000, isStarting: true },
    bhk: [2, 3],
    areaText: "1,050 sq.ft",
    status: "Under Construction",
    possessionDate: "Dec '26",
    reraId: "P51900003333",
    images: ["/images/piramal_aranya_main.png", "/images/mumbai_skyline_hero_1774281938568.png", "/images/luxury_apartment_living_room_1774281976681.png"],
    amenities: ["Modern Gym", "Covered Parking", "High-speed Lifts", "Swimming Pool", "3-Tier Security", "100% Backup", "Library", "Kid's Play Area"],
    carpetAreaSqft: 1050,
    featured: true,
    isFurnished: false,
    baths: 2,
    orientation: "Harbour Facing",
    description: "Piramal Aranya offers a sanctuary of peace in the bustling city. Overlooking the beautiful Rani Baug, it brings nature and luxury together seamlessly.",
  },
  {
    id: "rustomjee-crown",
    name: "Rustomjee Crown",
    developer: "Rustomjee",
    location: "Prabhadevi, Mumbai",
    microMarket: "South Mumbai",
    price: { display: "₹18.5 Cr", value: 185000000, isStarting: true },
    bhk: [4, 5],
    areaText: "3,200 sq.ft",
    status: "Under Construction",
    possessionDate: "Mar '25",
    reraId: "P51900009999",
    images: ["/images/mumbai_skyline_hero_1774281938568.png", "/images/luxury_apartment_living_room_1774281976681.png", "/images/luxury_apartment_exterior_1774281957165.png"],
    amenities: ["Modern Gym", "Covered Parking", "High-speed Lifts", "Infinity Pool", "3-Tier Security", "100% Backup", "Clubhouse", "Tennis Court"],
    carpetAreaSqft: 3200,
    featured: true,
    isFurnished: true,
    baths: 4,
    orientation: "Sea Facing",
    description: "An ultra-premium gated estate in South Mumbai. Crown offers palatial residences with sprawling private terraces and absolute privacy.",
  },
  {
    id: "hiranandani-powai",
    name: "Hiranandani Gardens",
    developer: "Hiranandani Group",
    location: "Powai, Mumbai",
    microMarket: "Central Suburbs",
    price: { display: "₹2.9 Cr", value: 29000000, isStarting: true },
    bhk: [2, 3],
    areaText: "980 sq.ft",
    status: "Ready to Move",
    reraId: "P51800008080",
    images: ["/images/luxury_apartment_living_room_1774281976681.png", "/images/luxury_apartment_exterior_1774281957165.png", "/images/mumbai_skyline_hero_1774281938568.png"],
    amenities: ["Modern Gym", "Covered Parking", "High-speed Lifts", "Swimming Pool", "3-Tier Security", "100% Backup", "Township Ecosystem", "Hospital nearby"],
    carpetAreaSqft: 980,
    featured: false,
    isFurnished: true,
    baths: 2,
    orientation: "Lake Facing",
    description: "Experience the majestic township living at Powai. Neo-classical architecture, serene lakes, and a self-sustained ecosystem.",
  },
  {
    id: "godrej-bkc",
    name: "Godrej BKC",
    developer: "Godrej Properties",
    location: "BKC, Mumbai",
    microMarket: "Western Suburbs",
    price: { display: "₹7.5 Cr", value: 75000000, isStarting: true },
    bhk: [3, 4],
    areaText: "1,650 sq.ft",
    status: "New Launch",
    possessionDate: "Dec '27",
    reraId: "P51800007777",
    images: ["/images/luxury_apartment_exterior_1774281957165.png", "/images/mumbai_skyline_hero_1774281938568.png", "/images/luxury_apartment_living_room_1774281976681.png"],
    amenities: ["Modern Gym", "Valet Parking", "High-speed Lifts", "Infinity Pool", "5-Tier Security", "100% Backup", "Business Lounge", "Smart Home"],
    carpetAreaSqft: 1650,
    featured: false,
    isFurnished: false,
    baths: 3,
    orientation: "North-East",
    description: "Located in Mumbai's prime financial district, offering walk-to-work convenience and extreme luxury tailored for the corporate elite.",
  }
];

export const MOCK_LOCATIONS = [
  "Worli, Mumbai", "Borivali East, Mumbai", "Byculla, South Mumbai", 
  "Prabhadevi, Mumbai", "Powai, Mumbai", "BKC, Mumbai", "Bandra West, Mumbai",
  "Andheri West, Mumbai"
];
