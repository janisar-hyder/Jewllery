-- Run this query in your Supabase SQL Editor to populate the store with dummy products

INSERT INTO products (name, category, price, badge, sku, description, images) VALUES
(
  'Royal Pearl Necklace', 
  'jewelry', 
  4500, 
  'Bestseller', 
  'SUF-1001', 
  'A masterpiece of timeless elegance. Hand-strung freshwater pearls cascade in luminous perfection, each one selected for its unique luster and delicate iridescence. The 18k gold-plated clasp features our signature Sufrah motif, a testament to Pakistani craftsmanship at its finest.', 
  ARRAY[
    'https://images.unsplash.com/photo-1599643478518-a784e5dc0e8b?w=800&q=80',
    'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80'
  ]
),
(
  'Emerald Enchantment Earrings', 
  'jewelry', 
  3200, 
  'New', 
  'SUF-1002', 
  'Inspired by the verdant gardens of Mughal heritage, these drop earrings feature lab-created emeralds set in rose gold filigree. Each pair is hand-finished by our artisans, capturing the romance of centuries-old jewelry traditions.', 
  ARRAY[
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
    'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80'
  ]
),
(
  'Opulent Evening Clutch', 
  'clutches', 
  7500, 
  'Bestseller', 
  'SUF-2001', 
  'A statement of opulence for the discerning woman. This structured box clutch is handcrafted from Italian silk brocade, adorned with hand-placed crystal embellishments, and finished with an antiqued gold-tone frame. The interior features a mirror and card slot.', 
  ARRAY[
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
    'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80'
  ]
),
(
  'Velvet Rose Minaudière', 
  'clutches', 
  8200, 
  'Limited', 
  'SUF-2002', 
  'The Velvet Rose Minaudière is an heirloom in the making. Sculpted in the form of a blooming rose, this exquisite piece is covered in hand-draped velvet and crowned with a crystal pistil clasp. Every petal is individually shaped by our artisans.', 
  ARRAY[
    'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&q=80',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80'
  ]
),
(
  'Celestial Diamond Ring', 
  'jewelry', 
  5800, 
  'Sale', 
  'SUF-1003', 
  'A celestial statement of brilliance. The pavé-set crystals orbit a central solitaire like stars around the moon, creating a mesmerizing play of light. The comfort-fit band ensures this ring of dreams is as pleasurable to wear as it is to behold.', 
  ARRAY[
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80'
  ]
),
(
  'Midnight Silk Envelope', 
  'clutches', 
  5500, 
  '', 
  'SUF-2003', 
  'Sleek, sophisticated, and eternally chic. This envelope clutch is crafted from midnight-blue silk charmeuse with a hand-embroidered gold thread border. The slim profile slips elegantly under the arm for effortless sophistication.', 
  ARRAY[
    'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80',
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80'
  ]
);
