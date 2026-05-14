import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/helpers';
import { getWhatsAppLink } from '../hooks/useWhatsApp';
import { Link } from 'react-router-dom';

export default function ProductModal({ product, onClose }) {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!product) return null;

  return (
    <AnimatePresence>
      {/* ── Full-screen backdrop ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 60,
          backgroundColor: 'rgba(28,25,23,0.85)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '1rem' : '2rem',
        }}
      >
        {/* ── Modal ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            width: '100%',
            maxWidth: isMobile ? '400px' : '1100px',
            height: isMobile ? 'auto' : '90vh',
            maxHeight: '95vh',
            backgroundColor: 'var(--color-ivory, #FAF7F2)',
            overflow: isMobile ? 'auto' : 'hidden',
            position: 'relative',
            borderRadius: '2px',
          }}
        >

          {/* ═══ CLOSE BUTTON — fixed top-right ═══ */}
          <button
            onClick={onClose}
            aria-label="Close quick view"
            style={{
              position: 'absolute',
              top: isMobile ? '1rem' : '1.5rem',
              right: isMobile ? '1rem' : '1.5rem',
              zIndex: 30,
              width: isMobile ? '36px' : '44px',
              height: isMobile ? '36px' : '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(198,167,105,0.25)',
              backgroundColor: 'rgba(250,247,242,0.95)',
              color: 'var(--color-taupe)',
              cursor: 'pointer',
              transition: 'border-color 0.3s, color 0.3s',
            }}
          >
            <X size={18} />
          </button>

          {/* ═══ Product Image ═══ */}
          <div
            style={{
              width: isMobile ? '100%' : '50%',
              height: isMobile ? '300px' : '100%',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: 'var(--color-champagne, #EAE2D8)',
              flexShrink: 0,
            }}
          >
            {/* Badge */}
            {product.badge && (
              <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', zIndex: 10 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '8px',
                    fontWeight: 600,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    backgroundColor: 'var(--color-obsidian)',
                    color: 'white',
                    padding: '4px 10px',
                    display: 'inline-block',
                  }}
                >
                  {product.badge}
                </span>
              </div>
            )}

            {/* Image */}
            <img
              src={product.images[0]}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          </div>

          {/* ═══ Product Info ═══ */}
          <div
            style={{
              flex: 1,
              height: 'auto',
              overflowY: 'visible',
              display: 'flex',
              flexDirection: 'column',
              padding: isMobile ? '1.5rem 1.25rem' : '3.5rem 3rem',
            }}
          >
            {/* ─ Category ─ */}
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                marginBottom: '0.75rem',
              }}
            >
              {product.category}
            </p>

            {/* ─ Product Name ─ */}
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: isMobile ? '1.5rem' : 'clamp(1.75rem, 2.5vw, 2.5rem)',
                fontWeight: 300,
                lineHeight: 1.15,
                color: 'var(--color-obsidian)',
                margin: '0 0 1rem',
              }}
            >
              {product.name}
            </h2>

            {/* ─ Gold divider ─ */}
            <div
              style={{
                width: '2rem',
                height: '1px',
                backgroundColor: 'var(--color-gold)',
                margin: '0 0 1.25rem',
              }}
            />

            {/* ─ Price ─ */}
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: isMobile ? '1.25rem' : '1.75rem',
                fontWeight: 300,
                color: 'var(--color-obsidian)',
                marginBottom: '1rem',
              }}
            >
              {formatPrice(product.price)}
            </p>

            {/* ─ Description ─ */}
            <p
              style={{
                fontSize: '0.85rem',
                lineHeight: 1.7,
                color: 'var(--color-taupe)',
                marginBottom: '1.5rem',
                maxWidth: '420px',
              }}
            >
              {product.description}
            </p>

            {/* ─ CTA Buttons ─ */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginTop: 'auto' }}>
              <a
                href={getWhatsAppLink(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-maison"
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: isMobile ? '9px' : '10px',
                  padding: isMobile ? '0.75rem' : '1rem',
                }}
              >
                <MessageCircle size={14} style={{ position: 'relative', zIndex: 1 }} />
                <span>Order on WhatsApp</span>
              </a>

              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="btn-maison-outline"
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: isMobile ? '9px' : '10px',
                  padding: isMobile ? '0.75rem' : '1rem',
                }}
              >
                <span>View Full Details</span>
                <ArrowRight size={14} style={{ position: 'relative', zIndex: 1 }} />
              </Link>
            </div>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
