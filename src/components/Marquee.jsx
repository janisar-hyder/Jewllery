import { motion } from 'framer-motion';

const items = [
  '✦ Haute Joaillerie',
  '✦ Luxury Jewelry',
  '✦ Premium Clutches',
  '✦ Handcrafted Elegance',
  '✦ Timeless Beauty',
  '✦ Pakistani Craftsmanship',
  '✦ Exclusive Designs',
  '✦ Regal Collections',
];

export default function Marquee() {
  // Triple items for seamless loop
  const allItems = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden border-y border-gold/10 py-5 bg-champagne/50" style={{ maxWidth: '100vw' }}>
      <div className="flex items-center gap-12 animate-marquee w-max">
        {allItems.map((item, i) => (
          <span
            key={i}
            className="text-overline text-taupe whitespace-nowrap tracking-[0.4em]"
            style={{ fontSize: '10px' }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
