// Sufrah.pk — Product Catalog Data
// Replace image paths with actual product images

const products = [
  // ===== JEWELRY =====
  {
    id: 1,
    name: "Royal Pearl Necklace",
    category: "jewelry",
    price: 4500,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc0e8b?w=800&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
      "https://images.unsplash.com/photo-1515562141589-67f0d999c0f6?w=800&q=80"
    ],
    description: "A masterpiece of timeless elegance. Hand-strung freshwater pearls cascade in luminous perfection, each one selected for its unique luster and delicate iridescence. The 18k gold-plated clasp features our signature Sufrah motif, a testament to Pakistani craftsmanship at its finest.",
    badge: "Bestseller",
    material: "Freshwater Pearls, 18K Gold Plated",
    care: "Store in a soft pouch. Avoid contact with perfume."
  },
  {
    id: 2,
    name: "Emerald Enchantment Earrings",
    category: "jewelry",
    price: 3200,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80",
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=800&q=80"
    ],
    description: "Inspired by the verdant gardens of Mughal heritage, these drop earrings feature lab-created emeralds set in rose gold filigree. Each pair is hand-finished by our artisans, capturing the romance of centuries-old jewelry traditions.",
    badge: "New",
    material: "Lab-Created Emerald, Rose Gold Plated",
    care: "Clean gently with a soft cloth."
  },
  {
    id: 3,
    name: "Celestial Diamond Ring",
    category: "jewelry",
    price: 5800,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80"
    ],
    description: "A celestial statement of brilliance. The pavé-set crystals orbit a central solitaire like stars around the moon, creating a mesmerizing play of light. The comfort-fit band ensures this ring of dreams is as pleasurable to wear as it is to behold.",
    badge: "Limited",
    material: "Crystal Solitaire, Sterling Silver",
    care: "Remove before swimming or bathing."
  },
  {
    id: 4,
    name: "Heritage Gold Bangle",
    category: "jewelry",
    price: 6500,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80"
    ],
    description: "Drawing from the geometric motifs of Islamic art, this sculptural bangle is cast in solid brass with 24k gold electroplating. The intricate lattice pattern allows light to dance through the metal, creating an ever-changing play of shadow and shine.",
    badge: "Bestseller",
    material: "Brass, 24K Gold Electroplated",
    care: "Polish with a jewelry cloth periodically."
  },
  {
    id: 5,
    name: "Moonstone Cascade Pendant",
    category: "jewelry",
    price: 3800,
    images: [
      "https://images.unsplash.com/photo-1599459183200-59c3e0e3038b?w=800&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
      "https://images.unsplash.com/photo-1515562141589-67f0d999c0f6?w=800&q=80"
    ],
    description: "A cascading arrangement of rainbow moonstones captures the ethereal glow of Pakistani moonlit nights. Each stone is cabochon-cut to maximize its mystical adularescence, suspended from a delicate chain of sterling silver.",
    badge: "New",
    material: "Rainbow Moonstone, Sterling Silver",
    care: "Avoid harsh chemicals. Store separately."
  },
  {
    id: 6,
    name: "Sapphire Whisper Bracelet",
    category: "jewelry",
    price: 4200,
    images: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=800&q=80"
    ],
    description: "Delicate as a whispered secret, this tennis bracelet features a continuous line of blue sapphire crystals, each precisely set to create an unbroken river of color. The hidden box clasp ensures seamless elegance from every angle.",
    badge: null,
    material: "Blue Sapphire Crystal, Rhodium Plated",
    care: "Clean with mild soap and water."
  },

  // ===== CLUTCHES =====
  {
    id: 7,
    name: "Opulent Evening Clutch",
    category: "clutches",
    price: 7500,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80"
    ],
    description: "A statement of opulence for the discerning woman. This structured box clutch is handcrafted from Italian silk brocade, adorned with hand-placed crystal embellishments, and finished with an antiqued gold-tone frame. The interior features a mirror and card slot.",
    badge: "Bestseller",
    material: "Italian Silk Brocade, Crystal, Gold-Tone Metal",
    care: "Store in dust bag. Handle with clean hands."
  },
  {
    id: 8,
    name: "Velvet Rose Minaudière",
    category: "clutches",
    price: 8200,
    images: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80"
    ],
    description: "The Velvet Rose Minaudière is an heirloom in the making. Sculpted in the form of a blooming rose, this exquisite piece is covered in hand-draped velvet and crowned with a crystal pistil clasp. Every petal is individually shaped by our artisans.",
    badge: "Limited",
    material: "Velvet, Crystal, Brass Frame",
    care: "Keep away from moisture. Spot clean only."
  },
  {
    id: 9,
    name: "Pearl Constellation Bag",
    category: "clutches",
    price: 6800,
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80"
    ],
    description: "Hundreds of hand-sewn faux pearls create a celestial constellation across this soft-structured clutch. The magnetic closure is disguised within the pearl pattern, maintaining the bag's seamless surface. A detachable chain strap offers versatile styling.",
    badge: "New",
    material: "Faux Pearl, Satin Lining, Gold-Tone Chain",
    care: "Avoid contact with water and perfume."
  },
  {
    id: 10,
    name: "Midnight Silk Envelope",
    category: "clutches",
    price: 5500,
    images: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&q=80"
    ],
    description: "Sleek, sophisticated, and eternally chic. This envelope clutch is crafted from midnight-blue silk charmeuse with a hand-embroidered gold thread border. The slim profile slips elegantly under the arm for effortless sophistication.",
    badge: null,
    material: "Silk Charmeuse, Gold Thread Embroidery",
    care: "Professional cleaning recommended."
  },
  {
    id: 11,
    name: "Crystal Cascade Clutch",
    category: "clutches",
    price: 9500,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80"
    ],
    description: "A waterfall of precision-cut crystals cascades across this showstopping clutch, each one catching and refracting light into a rainbow of brilliant sparks. The rigid frame is sculpted from polished brass with a push-lock closure.",
    badge: "Limited",
    material: "Austrian Crystal, Polished Brass",
    care: "Handle with care. Store upright in dust bag."
  },
  {
    id: 12,
    name: "Artisan Zardozi Pouch",
    category: "clutches",
    price: 4800,
    images: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80"
    ],
    description: "Celebrating Pakistan's legendary zardozi embroidery tradition, this pouch features gold and silver metallic threadwork on deep burgundy velvet. Each motif is hand-stitched using techniques passed down through generations of master embroiderers.",
    badge: "Bestseller",
    material: "Velvet, Zardozi Embroidery, Metallic Thread",
    care: "Store flat. Avoid crushing embroidery."
  }
];

export default products;

// Testimonials
export const testimonials = [
  {
    name: "Ayesha Malik",
    location: "Lahore",
    text: "The Heritage Gold Bangle took my breath away. The craftsmanship is beyond anything I've seen — it feels like wearing a piece of art. Sufrah truly understands the meaning of luxury.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
  },
  {
    name: "Sana Ahmed",
    location: "Karachi",
    text: "I ordered the Opulent Evening Clutch for my wedding reception and received countless compliments. The attention to detail is remarkable — every crystal placed with precision. This is heirloom quality.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
  },
  {
    name: "Fatima Raza",
    location: "Islamabad",
    text: "Sufrah.pk has become my go-to for gifting. The packaging alone is an experience — it arrives like a treasure from a private jeweler. The Royal Pearl Necklace I gifted my mother made her cry tears of joy.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80"
  },
  {
    name: "Hira Naveed",
    location: "Faisalabad",
    text: "Finding such exquisite jewelry online felt too good to be true, but Sufrah delivered beyond expectations. The Sapphire Whisper Bracelet is even more beautiful in person. Truly world-class quality at accessible prices.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"
  }
];

// Instagram Gallery Images
export const instagramImages = [
  "https://images.unsplash.com/photo-1599643478518-a784e5dc0e8b?w=400&q=80",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
  "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80",
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
  "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80",
  "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80"
];
