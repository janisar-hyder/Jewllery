import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import { InstagramIcon as Instagram } from './Icons';
import { getWhatsAppLink } from '../hooks/useWhatsApp';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Collections', path: '/products' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navBg = !isHome || scrolled
    ? 'bg-ivory/95 backdrop-blur-md border-b border-gold/10'
    : 'bg-transparent';

  const textColor = !isHome || scrolled ? 'text-obsidian' : 'text-white';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${navBg}`}
      >
        <div className="container-maison flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className={`font-serif text-2xl md:text-3xl font-light tracking-tight ${textColor}`}>
            Sufrah<span className="text-gold">.</span>pk
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`group relative text-overline ${textColor} transition-colors duration-500`}
              >
                <span>{link.name}</span>
                {/* Gold underline animation */}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-500 ease-out ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 ${textColor}`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* ═══════════════════════════════════════
           MOBILE SIDEBAR DRAWER
      ═══════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-50 md:hidden"
              style={{ backgroundColor: 'rgba(28,25,23,0.6)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 right-0 bottom-0 z-50 md:hidden"
              style={{
                width: '82%',
                maxWidth: '360px',
                backgroundColor: 'var(--color-ivory, #FAF7F2)',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '-20px 0 60px rgba(0,0,0,0.15)',
              }}
            >

              {/* ── Header: Logo + Close ── */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.5rem 1.75rem',
                  borderBottom: '1px solid rgba(198,167,105,0.1)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.35rem',
                    fontWeight: 300,
                    color: 'var(--color-obsidian)',
                  }}
                >
                  Sufrah<span style={{ color: 'var(--color-gold)' }}>.</span>pk
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(198,167,105,0.15)',
                    backgroundColor: 'transparent',
                    color: 'var(--color-taupe)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* ── Navigation Links ── */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '2rem 1.75rem',
                  gap: '0',
                }}
              >
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.08, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <Link
                        to={link.path}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '1.1rem 0',
                          borderBottom: '1px solid rgba(198,167,105,0.08)',
                          textDecoration: 'none',
                          transition: 'color 0.3s',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.5rem',
                            fontWeight: 300,
                            color: isActive ? 'var(--color-gold)' : 'var(--color-obsidian)',
                            letterSpacing: '0.02em',
                          }}
                        >
                          {link.name}
                        </span>

                        {/* Active indicator — small gold dot */}
                        {isActive && (
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: 'var(--color-gold)',
                              flexShrink: 0,
                            }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* ── Footer: Social + Tagline ── */}
              <div
                style={{
                  padding: '1.5rem 1.75rem',
                  borderTop: '1px solid rgba(198,167,105,0.1)',
                }}
              >
                {/* Quick action buttons */}
                <div
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem',
                      border: '1px solid rgba(198,167,105,0.15)',
                      backgroundColor: 'transparent',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                    }}
                  >
                    <MessageCircle size={14} style={{ color: 'var(--color-gold)' }} />
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '9px',
                        fontWeight: 600,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--color-obsidian)',
                      }}
                    >
                      WhatsApp
                    </span>
                  </a>
                  <a
                    href="https://www.instagram.com/sufrah.pk_?igsh=MWFxaHg4Y2ZseTlsaw%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem',
                      border: '1px solid rgba(198,167,105,0.15)',
                      backgroundColor: 'transparent',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                    }}
                  >
                    <Instagram size={14} style={{ color: 'var(--color-gold)' }} />
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '9px',
                        fontWeight: 600,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--color-obsidian)',
                      }}
                    >
                      Instagram
                    </span>
                  </a>
                </div>

                {/* Tagline */}
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '9px',
                    fontWeight: 600,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'var(--color-taupe)',
                    textAlign: 'center',
                  }}
                >
                  A Luxury Jewelry Maison
                </p>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
