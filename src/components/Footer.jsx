import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Mail } from 'lucide-react';
import { InstagramIcon as Instagram } from './Icons';
import { staggerContainer, staggerChild } from '../animations/variants';
import { getWhatsAppLink } from '../hooks/useWhatsApp';

const footerLinks = {
  collections: [
    { name: 'Jewelry', path: '/products?category=jewelry' },
    { name: 'Clutches', path: '/products?category=clutches' },
    { name: 'New Arrivals', path: '/products' },
    { name: 'Bestsellers', path: '/products' },
  ],
  maison: [
    { name: 'Our Story', path: '/about' },
    { name: 'Craftsmanship', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-emerald text-white/90">
      {/* Gold top line */}
      <div className="h-px bg-gold/30" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container-maison section-luxury"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Column */}
          <motion.div variants={staggerChild} className="md:col-span-1">
            <Link to="/" className="inline-block font-serif text-3xl font-light text-white mb-6">
              Sufrah<span className="text-gold">.</span>pk
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              A luxury jewelry maison celebrating Pakistani craftsmanship. 
              Each piece tells a story of heritage, elegance, and timeless beauty.
            </p>
            {/* Social */}
            <div className="flex gap-4">
              {[
                { Icon: Instagram, href: 'https://www.instagram.com/sufrah.pk_?igsh=MWFxaHg4Y2ZseTlsaw%3D%3D&utm_source=qr' },
                { Icon: MessageCircle, href: getWhatsAppLink() },
                { Icon: Mail, href: 'mailto:sufraahpk@gmail.com' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/50 transition-all duration-500 hover:border-gold hover:text-gold hover:bg-gold/10"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Collections */}
          <motion.div variants={staggerChild}>
            <p className="text-overline text-gold mb-6">Collections</p>
            <ul className="space-y-3">
              {footerLinks.collections.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/50 text-sm transition-colors duration-500 hover:text-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Maison */}
          <motion.div variants={staggerChild}>
            <p className="text-overline text-gold mb-6">Maison</p>
            <ul className="space-y-3">
              {footerLinks.maison.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/50 text-sm transition-colors duration-500 hover:text-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={staggerChild}>
            <p className="text-overline text-gold mb-6">Get in Touch</p>
            <ul className="space-y-3 text-white/50 text-sm">
              <li>Lahore, Pakistan</li>
              <li>
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="transition-colors duration-500 hover:text-gold">
                  WhatsApp: +92 329 4954385
                </a>
              </li>
              <li>
                <a href="mailto:sufraahpk@gmail.com" className="transition-colors duration-500 hover:text-gold">
                  sufraahpk@gmail.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Sufrah.pk — All rights reserved.
          </p>
          <p className="text-overline text-white/20">
            A Luxury Jewelry Maison
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
