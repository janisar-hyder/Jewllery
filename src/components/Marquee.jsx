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
    <div className="overflow-hidden border-y border-gold/20 py-10 md:py-16 bg-champagne/50" style={{ maxWidth: '100vw' }}>
      <div className="flex items-center gap-16 md:gap-24 animate-marquee w-max">
        {allItems.map((item, i) => (
          <span
            key={i}
            className="text-overline text-taupe whitespace-nowrap tracking-[0.4em]"
            style={{ fontSize: window.innerWidth > 768 ? '18px' : '14px' }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
