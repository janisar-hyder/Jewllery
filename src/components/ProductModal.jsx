import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/helpers';
import { getWhatsAppLink } from '../hooks/useWhatsApp';
import { Link } from 'react-router-dom';

export default function ProductModal({ product, onClose }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
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
          alignItems: 'stretch',
          justifyContent: 'center',
        }}
      >
        {/* ── Modal — full viewport height, centered horizontally ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            maxWidth: '1100px',
            height: '100vh',
            backgroundColor: 'var(--color-ivory, #FAF7F2)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >

          {/* ═══ CLOSE BUTTON — fixed top-right ═══ */}
          <button
            onClick={onClose}
            aria-label="Close quick view"
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              zIndex: 30,
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(198,167,105,0.25)',
              backgroundColor: 'rgba(250,247,242,0.95)',
              color: 'var(--color-taupe)',
              cursor: 'pointer',
              transition: 'border-color 0.3s, color 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-gold)'; e.currentTarget.style.color = 'var(--color-gold)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(198,167,105,0.25)'; e.currentTarget.style.color = 'var(--color-taupe)'; }}
          >
            <X size={18} />
          </button>

          {/* ═══ LEFT HALF — Product Image ═══ */}
          <div
            style={{
              width: '50%',
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: 'var(--color-champagne, #EAE2D8)',
              flexShrink: 0,
            }}
          >
            {/* Badge */}
            {product.badge && (
              <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 10 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '9px',
                    fontWeight: 600,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    backgroundColor: 'var(--color-obsidian)',
                    color: 'white',
                    padding: '6px 14px',
                    display: 'inline-block',
                  }}
                >
                  {product.badge}
                </span>
              </div>
            )}

            {/* Image — fills entire left half */}
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

          {/* ═══ RIGHT HALF — Product Info ═══ */}
          <div
            style={{
              flex: 1,
              height: '100%',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '3.5rem 3rem',
            }}
          >
            {/* ─ Category ─ */}
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                marginBottom: '1rem',
              }}
            >
              {product.category}
            </p>

            {/* ─ Product Name ─ */}
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)',
                fontWeight: 300,
                lineHeight: 1.15,
                color: 'var(--color-obsidian)',
                margin: '0 0 1.25rem',
              }}
            >
              {product.name}
            </h2>

            {/* ─ Gold divider ─ */}
            <div
              style={{
                width: '3rem',
                height: '1px',
                backgroundColor: 'var(--color-gold)',
                margin: '0 0 1.5rem',
              }}
            />

            {/* ─ Price ─ */}
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                fontWeight: 300,
                color: 'var(--color-obsidian)',
                marginBottom: '1.5rem',
              }}
            >
              {formatPrice(product.price)}
            </p>

            {/* ─ Description ─ */}
            <p
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.8,
                color: 'var(--color-taupe)',
                marginBottom: '1.5rem',
                maxWidth: '420px',
              }}
            >
              {product.description}
            </p>

            {/* ─ Material ─ */}
            {product.material && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '2rem',
                  padding: '1rem 0',
                  borderTop: '1px solid rgba(198,167,105,0.1)',
                  borderBottom: '1px solid rgba(198,167,105,0.1)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '9px',
                    fontWeight: 600,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'var(--color-obsidian)',
                  }}
                >
                  Material
                </span>
                <span style={{ color: 'rgba(198,167,105,0.3)' }}>|</span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '9px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--color-taupe)',
                  }}
                >
                  {product.material}
                </span>
              </div>
            )}

            {/* ─ CTA Buttons ─ */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto', paddingTop: '1rem' }}>
              {/* Primary — Order on WhatsApp (theme-consistent dark button) */}
              <a
                href={getWhatsAppLink(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-maison"
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  justifyContent: 'center',
                  gap: '0.75rem',
                }}
              >
                <MessageCircle size={14} style={{ position: 'relative', zIndex: 1 }} />
                <span>Order on WhatsApp</span>
              </a>

              {/* Secondary — View Full Details */}
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="btn-maison-outline"
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  justifyContent: 'center',
                  gap: '0.5rem',
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
