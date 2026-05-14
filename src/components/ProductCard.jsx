import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, MessageCircle } from 'lucide-react';
import { formatPrice } from '../utils/helpers';
import { getWhatsAppLink } from '../hooks/useWhatsApp';

export default function ProductCard({ product, onQuickView, index = 0 }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="group"
    >
      {/* Entire card is a link to the detail page */}
      <Link to={`/product/${product.id}`} className="block">

        {/* Image Container — Portrait 3:4 */}
        <div className="relative overflow-hidden aspect-[3/4] bg-champagne">
          <img
            src={product.images[0]}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover img-jewelry transition-all duration-[1800ms] ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10">
              <span className="font-sans text-[9px] md:text-[10px] font-semibold bg-obsidian text-white px-2 py-1 md:px-3 md:py-1.5 tracking-widest uppercase shadow-sm">
                {product.badge}
              </span>
            </div>
          )}

          {/* Action Buttons Overlay — Always visible on mobile, hover on desktop */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/40 to-transparent pt-12 pb-4 md:pb-8 flex items-end justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-hover:bg-obsidian/30 transition-all duration-700">
            <div className="flex gap-2 md:gap-3">
              {onQuickView && (
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView(product); }}
                  className="w-10 h-10 md:w-11 md:h-11 !bg-white text-obsidian flex items-center justify-center transition-all duration-500 hover:!bg-gold hover:text-white shadow-sm"
                  aria-label="Quick View"
                >
                  <Eye size={16} className="md:w-[18px] md:h-[18px]" />
                </button>
              )}
              <a
                href={getWhatsAppLink(product)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-10 md:w-11 md:h-11 !bg-white text-obsidian flex items-center justify-center transition-all duration-500 hover:!bg-gold hover:text-white shadow-sm"
                aria-label="Order on WhatsApp"
              >
                <MessageCircle size={16} className="md:w-[18px] md:h-[18px]" />
              </a>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="pt-4 md:pt-5 pb-2">
          {/* Category label */}
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-taupe mb-1 md:mb-2">
            {product.category}
          </p>

          {/* Product Name */}
          <h3 className="font-serif text-[1.1rem] md:text-product text-obsidian transition-colors duration-500 group-hover:text-gold leading-tight">
            {product.name}
          </h3>

          {/* Gold underline grow */}
          <div className="mt-1.5 md:mt-2 mb-2 md:mb-3">
            <div className="h-px bg-gold/20 w-8 md:w-0 group-hover:w-12 transition-all duration-700 ease-out" />
          </div>

          {/* Price */}
          <p className="font-sans text-[13px] md:text-sm tracking-wider text-obsidian font-medium">
            {formatPrice(product.price)}
          </p>
        </div>

      </Link>
    </motion.div>
  );
}
