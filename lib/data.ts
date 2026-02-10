export interface Designer {
  id: string;
  name: string;
  location: string;
  bio: string;
  story: string;
  image: string;
  cover: string;
  founded: number;
  socialLinks: {
    instagram?: string;
    website?: string;
  };
}

export interface Product {
  id: string;
  name: string;
  designerId: string;
  price: number;
  category: string;
  image: string;
  gallery: string[];
  description: string;
  materials: string[];
  careInstructions: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  designerNote?: string;
  sizes?: string[];
  variations?: string[];
}

export interface Collection {
  id: string;
  name: string;
  designerId: string;
  description: string;
  coverImage: string;
  productIds: string[];
  isNew: boolean;
}

export const designers: Designer[] = [
  {
    id: "designer-1",
    name: "Elena Craft Studios",
    location: "🇮🇹 Florence",
    bio: "Timeless pieces inspired by Italian heritage",
    story:
      "Inspired by West African silhouettes and European minimalism, Elena Craft Studios creates garments that celebrate artisan craftsmanship. Each piece is hand-finished with sustainable materials sourced directly from ethical suppliers.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    cover:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&h=400&fit=crop",
    founded: 2015,
    socialLinks: {
      instagram: "#",
      website: "#",
    },
  },
  {
    id: "designer-2",
    name: "Marco Leather Works",
    location: "🇮🇹 Milan",
    bio: "Artisan leather crafted with traditional techniques",
    story:
      "Marco Leather Works specializes in hand-tanned vegetable leather, creating pieces that age gracefully. Each bag is a unique testament to traditional Italian leatherworking.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    cover:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&h=400&fit=crop",
    founded: 2010,
    socialLinks: {
      instagram: "#",
      website: "#",
    },
  },
  {
    id: "designer-3",
    name: "Nordic Knits",
    location: "🇸🇪 Stockholm",
    bio: "Minimalist knitwear for the modern wardrobe",
    story:
      "Nordic Knits brings Scandinavian minimalism to contemporary fashion, using organic fibers and timeless designs that transcend seasonal trends.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    cover:
      "https://images.unsplash.com/photo-1556821552-7f41c7d93e89?w=1200&h=400&fit=crop",
    founded: 2018,
    socialLinks: {
      instagram: "#",
      website: "#",
    },
  },
  {
    id: "designer-4",
    name: "Sophia Textiles",
    location: "🇮🇳 New Delhi",
    bio: "Heritage fabrics reimagined for the world",
    story:
      "Sophia Textiles preserves traditional Indian textile techniques while creating contemporary designs for the global market. Every piece supports fair trade artisans.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    cover:
      "https://images.unsplash.com/photo-1591521521207-2b6d26ea0b55?w=1200&h=400&fit=crop",
    founded: 2012,
    socialLinks: {
      instagram: "#",
      website: "#",
    },
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Hand-Woven Linen Blazer",
    designerId: "designer-1",
    price: 385,
    category: "Ready-to-wear",
    image: "/assets/images/istockphoto-971123470-612x612.webp",
    gallery: [
      "assets/images/istockphoto-1352677795-612x612.webp",
      "assets/images/istockphoto-2055853359-612x612.webp",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop",
    ],
    description:
      "Exquisitely crafted blazer using hand-woven Italian linen. Each piece is unique with subtle texture variations. Perfect for layering or wearing as a statement piece.",
    materials: ["Italian Linen", "Mother of Pearl Buttons", "Silk Lining"],
    careInstructions: [
      "Dry clean only",
      "Handle with care",
      "Store in cool, dry place",
    ],
    rating: 4.8,
    reviews: 24,
    inStock: true,
    designerNote:
      "This blazer is inspired by 1920s tailoring, reinvented with sustainable practices.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "2",
    name: "Artisan Leather Crossbody",
    designerId: "designer-2",
    price: 450,
    category: "Accessories",
    image: "assets/images/photo-1607823489624-4929ba2ad176.avif",
    gallery: [
      "assets/images/photo-1674469773220-4bf8f619d70b.avif",
      "assets/images/photo-1709809081557-78f803ce93a0.avif",
    ],
    description:
      "Premium vegetable-tanned leather bag handcrafted with traditional techniques. Develops a rich patina over time, making each piece truly one-of-a-kind.",
    materials: ["Vegetable-Tanned Leather", "Brass Hardware", "Canvas Lining"],
    careInstructions: [
      "Wipe clean with soft cloth",
      "Apply leather conditioner monthly",
      "Avoid water exposure",
    ],
    rating: 4.9,
    reviews: 56,
    inStock: true,
    designerNote:
      "Designed to age beautifully. The patina tells the story of your adventures.",
  },
  {
    id: "3",
    name: "Silk Charmeuse Shirt",
    designerId: "designer-4",
    price: 280,
    category: "Ready-to-wear",
    image: "assets/images/photo-1709809081557-78f803ce93a0.avif",
    gallery: [
      "assets/images/photo-1729166677495-861727ee3a70.avif",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop",
    ],
    description:
      "Luxurious silk charmeuse shirt with a subtle sheen. Perfect for both casual and formal occasions with a flattering drape.",
    materials: ["100% Mulberry Silk", "Mother of Pearl Buttons"],
    careInstructions: [
      "Hand wash in cold water",
      "Lay flat to dry",
      "Iron on low heat",
    ],
    rating: 4.7,
    reviews: 18,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    id: "4",
    name: "Organic Cotton Jeans",
    designerId: "designer-3",
    price: 195,
    category: "Ready-to-wear",
    image: "assets/images/photo-1731595758947-fbcf0bc64b1e.avif",
    gallery: [
      "assets/images/photo-1768212566108-4ce4f329e4d2.avif",
      "https://images.unsplash.com/photo-1506751439663-af96e32a4ec9?w=800&h=1000&fit=crop",
    ],
    description:
      "Timeless blue denim crafted from organic cotton. Features sustainable indigo dyeing and reinforced stitching for durability.",
    materials: ["100% Organic Cotton", "Copper Rivets", "Natural Indigo Dye"],
    careInstructions: [
      "Turn inside out before washing",
      "Cold water wash",
      "Air dry",
    ],
    rating: 4.6,
    reviews: 42,
    inStock: true,
    sizes: ["24", "25", "26", "27", "28", "29", "30", "31", "32"],
  },
  {
    id: "5",
    name: "Merino Wool Sweater",
    designerId: "designer-3",
    price: 240,
    category: "Ready-to-wear",
    image: "assets/images/photo-1760907949889-eb62b7fd9f75.avif",
    gallery: [
      "assets/images/photo-1768212565426-58b089b6386d.avif",
      "assets/images/photo-1763823132521-72f373850de2.avif",
    ],
    description:
      "Sustainable merino wool sweater with a contemporary silhouette. Naturally temperature-regulating and breathable.",
    materials: ["100% Merino Wool"],
    careInstructions: [
      "Hand wash",
      "Lay flat to dry",
      "Store with cedar blocks",
    ],
    rating: 4.8,
    reviews: 31,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "6",
    name: "Embroidered Linen Dress",
    designerId: "designer-1",
    price: 320,
    category: "Ready-to-wear",
    image: "assets/images/photo-1763823132521-72f373850de2.avif",
    gallery: [
      "assets/images/photo-1763823183722-bba1c4f14c4f.avif",
      "assets/images/photo-1763823183722-bba1c4f14c4f.avif",
    ],
    description:
      "Artisan-embroidered linen dress combining traditional craftsmanship with modern design. Each piece features hand-stitched details.",
    materials: ["Linen", "Hand-Embroidered Details", "Organic Cotton Lining"],
    careInstructions: ["Gentle machine wash", "Low temperature", "Hang to dry"],
    rating: 4.9,
    reviews: 27,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "7",
    name: "Leather Ankle Boots",
    designerId: "designer-2",
    price: 520,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1548629221-424e4a44f4f0?w=800&h=1000&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1548629221-424e4a44f4f0?w=800&h=1000&fit=crop",
    ],
    description:
      "Handcrafted leather ankle boots with premium vegetable-tanned leather. Timeless design that works with any wardrobe.",
    materials: ["Vegetable-Tanned Leather", "Leather Sole", "Brass Rivets"],
    careInstructions: [
      "Condition regularly",
      "Use shoe trees",
      "Polish as needed",
    ],
    rating: 4.9,
    reviews: 19,
    inStock: true,
    sizes: ["5", "6", "7", "8", "9", "10", "11", "12"],
  },
  {
    id: "8",
    name: "Silk Scarf Collection",
    designerId: "designer-4",
    price: 120,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1000&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1000&fit=crop",
    ],
    description:
      "Hand-printed silk scarves with traditional patterns. Perfect for elevating any outfit with a touch of elegance.",
    materials: ["100% Silk", "Hand-Printed"],
    careInstructions: ["Hand wash", "Lay flat to dry", "Iron on low heat"],
    rating: 4.7,
    reviews: 43,
    inStock: true,
  },
];

export const collections: Collection[] = [
  {
    id: "col-1",
    name: "Spring Minimalism",
    designerId: "designer-3",
    description: "Light, airy pieces for the new season",
    coverImage:
      "https://images.unsplash.com/photo-1591028603178-5e5c9ecfc28f?w=1200&h=600&fit=crop",
    productIds: ["4", "5"],
    isNew: true,
  },
  {
    id: "col-2",
    name: "Artisan Heritage",
    designerId: "designer-1",
    description: "Timeless pieces celebrating traditional craftsmanship",
    coverImage:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&h=600&fit=crop",
    productIds: ["1", "6"],
    isNew: false,
  },
  {
    id: "col-3",
    name: "Leather Essentials",
    designerId: "designer-2",
    description: "Premium leather goods that age beautifully",
    coverImage:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&h=600&fit=crop",
    productIds: ["2", "7"],
    isNew: true,
  },
  {
    id: "col-4",
    name: "Silk & Textiles",
    designerId: "designer-4",
    description: "Luxurious natural fibers with heritage techniques",
    coverImage:
      "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=1200&h=600&fit=crop",
    productIds: ["3", "8"],
    isNew: false,
  },
];
