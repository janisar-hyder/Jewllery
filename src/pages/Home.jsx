import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { InstagramIcon as Instagram } from '../components/Icons';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import SectionHeader from '../components/SectionHeader';
import TestimonialSlider from '../components/TestimonialSlider';
import Marquee from '../components/Marquee';
import { testimonials, instagramImages } from '../data/products';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerChild, heroReveal, imageReveal } from '../animations/variants';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [modalProduct, setModalProduct] = useState(null);
  const [featured, setFeatured] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (data) {
        const featuredItems = data.filter(p => p.badge === 'Bestseller' || p.badge === 'Sale');
        setFeatured(featuredItems.length > 0 ? featuredItems.slice(0, 4) : data.slice(0, 4));

        const newItems = data.filter(p => p.badge === 'New');
        setNewArrivals(newItems.length > 0 ? newItems.slice(0, 4) : data.slice(0, 4));
      }
    };
    fetchHomeProducts();
  }, []);

  return (
    <>
      {/* ========================================
          1. EDITORIAL HERO
          ======================================== */}
      <section
        className="relative overflow-hidden bg-obsidian"
        style={{ minHeight: '100svh', display: 'flex', alignItems: 'center' }}
      >
        {/* Background Image */}
        <motion.div
          variants={imageReveal}
          initial="hidden"
          animate="visible"
          className="absolute inset-0"
        >
          {/* Desktop Image — Cinematic Wide */}
          <img
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=80"
            alt="Luxury jewelry hero"
            className="w-full h-full object-cover hidden md:block"
            style={{ opacity: 0.35 }}
          />
          {/* Mobile Image — High-Impact Portrait */}
          <img
            src="https://images.unsplash.com/photo-1515562141589-67f0d999c0f6?q=80&w=1587&auto=format&fit=crop"
            alt="Luxury jewelry hero"
            className="w-full h-full object-cover md:hidden"
            style={{ opacity: 1 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(28,25,23,0.92) 0%, rgba(28,25,23,0.5) 40%, rgba(28,25,23,0.25) 100%)',
            }}
          />
        </motion.div>

        {/* Vertical Text Label — desktop only */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden lg:block z-10">
          <p
            className="text-overline text-white/20 tracking-[0.5em]"
            style={{ writingMode: 'vertical-rl', fontSize: '9px' }}
          >
            Haute Joaillerie
          </p>
        </div>

        {/* Hero Content */}
        <div className="hero-content container-maison relative z-10 w-full">
          <motion.div
            variants={heroReveal}
            initial="hidden"
            animate="visible"
            className="hero-inner"
          >
            {/* Gold rule */}
            <div className="hero-gold-rule" />

            {/* Overline */}
            <p className="text-overline text-gold hero-overline">
              Sufrah.pk — A Luxury Jewelry Maison
            </p>

            {/* Headline */}
            <h1 className="hero-headline">
              Jewelry That<br />
              <em style={{ fontStyle: 'italic', color: 'rgba(198,167,105,0.8)' }}>
                Whispers Luxury
              </em>
            </h1>

            {/* Description */}
            <p className="hero-description">
              Each piece is a testament to timeless elegance and Pakistani craftsmanship —
              rare, precious, and made to be treasured for generations.
            </p>

            {/* CTAs */}
            <div className="hero-ctas">
              <Link to="/products" className="btn-maison hero-cta-primary">
                <span>Explore Collections</span>
                <ArrowRight size={16} className="relative z-10" />
              </Link>
              <Link
                to="/about"
                className="btn-maison-outline hero-cta-secondary"
              >
                <span>Our Story</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator — desktop only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-10"
        >
          <span className="text-overline text-white/30" style={{ fontSize: '8px' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-8 bg-gold/40"
          />
        </motion.div>
      </section>

      {/* ========================================
          2. MARQUEE BANNER
          ======================================== */}
      <Marquee />

      {/* ========================================
          3. SIGNATURE COLLECTIONS
          ======================================== */}
      <section className="section-luxury">
        <div className="container-maison">
          <SectionHeader
            overline="Signature Collections"
            title="Curated With"
            titleItalic="Intention"
            description="Each collection is a narrative — a journey through gemstones, metals, and the hands of master artisans."
          />

          {/* Asymmetric Collection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {/* Large — Jewelry (7 cols) */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:col-span-7 group relative overflow-hidden"
            >
              <Link to="/products?category=jewelry" className="block">
                <div className="aspect-[4/5] md:aspect-[7/5] overflow-hidden bg-champagne">
                  {/* Desktop Image */}
                  <img
                    src="https://images.unsplash.com/photo-1721807644561-9efcabee5c42?q=80&w=1470&auto=format&fit=crop"
                    alt="Jewelry Collection"
                    className="w-full h-full object-cover img-jewelry hidden md:block"
                  />
                  {/* Mobile Image */}
                  <img
                    src="https://images.unsplash.com/photo-1515562141589-67f0d999c0f6?w=800&q=80"
                    alt="Jewelry Collection Mobile"
                    className="w-full h-full object-cover img-jewelry md:hidden"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-obsidian/80 to-transparent">
                  <p className="text-overline text-gold mb-2">Collection I</p>
                  <h3 className="font-serif text-3xl md:text-4xl text-white font-light">
                    Fine <em className="italic">Jewelry</em>
                  </h3>
                  <div className="h-px bg-gold/40 w-0 group-hover:w-16 transition-all duration-700 mt-3" />
                </div>
              </Link>
            </motion.div>

            {/* Smaller — Clutches (5 cols) */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:col-span-5 group relative overflow-hidden"
            >
              <Link to="/products?category=clutches" className="block">
                <div className="aspect-[4/5] md:aspect-square overflow-hidden bg-champagne">
                  {/* Desktop Image */}
                  <img
                    src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=80"
                    alt="Clutches Collection"
                    className="w-full h-full object-cover img-jewelry hidden md:block"
                  />
                  {/* Mobile Image */}
                  <img
                    src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&q=80"
                    alt="Clutches Collection Mobile"
                    className="w-full h-full object-cover img-jewelry md:hidden"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-obsidian/80 to-transparent">
                  <p className="text-overline text-gold mb-2">Collection II</p>
                  <h3 className="font-serif text-3xl md:text-4xl text-white font-light">
                    Luxury <em className="italic">Clutches</em>
                  </h3>
                  <div className="h-px bg-gold/40 w-0 group-hover:w-16 transition-all duration-700 mt-3" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
          4. NEW ARRIVALS
          ======================================== */}
      <section className="section-luxury bg-champagne/40">
        <div className="container-maison">
          <SectionHeader
            overline="New Arrivals"
            title="Recently"
            titleItalic="Unveiled"
            description="The newest additions to our collection — each piece a fresh expression of our evolving artistry."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {newArrivals.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setModalProduct}
                index={i}
              />
            ))}
          </div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12 md:mt-16"
          >
            <Link to="/products" className="btn-maison-outline">
              <span>View All Pieces</span>
              <ArrowRight size={14} className="relative z-10" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          5. CRAFTSMANSHIP STORY
          ======================================== */}
      <section className="section-luxury">
        <div className="container-maison">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Image — portrait with floating accent */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[3/4] overflow-hidden shadow-jewelry bg-champagne">
                <img
                  src="https://plus.unsplash.com/premium_photo-1681276170281-cf50a487a1b7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Jewelry craftsmanship"
                  className="w-full h-full object-cover img-jewelry"
                />
              </div>
              {/* Floating accent image — inset so it doesn't overflow container */}
              <div className="absolute bottom-4 right-4 w-28 sm:w-36 md:w-40 aspect-square overflow-hidden shadow-jewelry border-4 border-ivory hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1690175867343-2af70ea57537?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Artisan detail"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Text — editorial storytelling */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <div className="gold-line mb-6" />
              <p className="text-overline text-gold mb-4">The Art of Making</p>
              <h2 className="text-collection text-obsidian mb-6">
                Craftsmanship That<br />
                <em className="italic font-light">Transcends Time</em>
              </h2>
              <p className="text-body mb-5">
                Every piece at Sufrah.pk begins as a vision — a sketch on handmade paper,
                a conversation between artisan and designer. Our master craftsmen, inheritors of
                centuries-old Pakistani jewelry traditions, transform precious materials into
                objects of enduring beauty.
              </p>
              <p className="text-body mb-8">
                From the delicate filigree of our earrings to the bold geometry of our bangles,
                each creation undergoes countless hours of meticulous handwork. We believe that
                true luxury lies not in the price, but in the patience, skill, and love
                woven into every detail.
              </p>
              <div>
                <Link to="/about" className="btn-maison">
                  <span>Discover Our Story</span>
                  <ArrowRight size={16} className="relative z-10" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
          6. FEATURED JEWELRY CAMPAIGN — Emerald Section
          ======================================== */}
      <section className="bg-emerald section-luxury relative overflow-hidden">
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(198,167,105,0.08) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        <div className="container-maison relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* Text column */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <div className="gold-line mb-6" />
              <p className="text-overline text-gold mb-4">Featured Campaign</p>
              <h2 className="text-collection text-white mb-6">
                The Eternal<br />
                <em className="italic font-light text-gold/80">Collection</em>
              </h2>
              <p className="text-white/50 text-base md:text-lg leading-relaxed mb-8">
                Inspired by the celestial beauty of starlit Pakistani skies,
                our Eternal Collection captures the magnificence of the cosmos
                in precious metals and luminous stones. Each piece is a
                constellation of craftsmanship.
              </p>
              <div>
                <Link to="/products" className="btn-maison bg-gold text-obsidian hover:text-white">
                  <span>Shop The Collection</span>
                  <ArrowRight size={16} className="relative z-10" />
                </Link>
              </div>
            </motion.div>

            {/* Image column */}
            <motion.div
              variants={imageReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[3/4] overflow-hidden shadow-jewelry">
                <img
                  src="https://images.unsplash.com/photo-1652434329242-645c771240ae?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Eternal Collection"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Gold frame accent */}
              <div className="absolute -inset-3 border border-gold/20 pointer-events-none" style={{ zIndex: -1 }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
          7. BESTSELLERS
          ======================================== */}
      <section className="section-luxury">
        <div className="container-maison">
          <SectionHeader
            overline="Bestsellers"
            title="Most"
            titleItalic="Coveted"
            description="Our most beloved pieces — chosen again and again by women who recognize true artistry."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featured.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setModalProduct}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          8. TESTIMONIALS / CLIENT LOVE
          ======================================== */}
      <section className="section-luxury bg-champagne/40">
        <div className="container-maison">
          {/* Section heading — fully centered */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-10 md:mb-14"
          >
            <div className="gold-line mb-5" />
            <p className="text-overline text-gold mb-3">Client Love</p>
            <h2 className="text-collection text-obsidian">
              Words From <em className="italic font-light">Our World</em>
            </h2>
          </motion.div>

          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* ========================================
          9. LUXURY NEWSLETTER
          ======================================== */}
      <section className="section-luxury bg-obsidian">
        <div className="container-maison">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            {/* Gold line — must be mx-auto inside flex column */}
            <div className="gold-line mx-auto mb-5" />
            <p className="text-overline text-gold mb-4">Stay Close</p>

            <h2 className="text-collection text-white mb-5">
              Join Our <em className="italic font-light text-gold/80">Inner Circle</em>
            </h2>

            <p className="text-white/50 text-base leading-relaxed mb-10 max-w-md">
              Be the first to discover new collections, receive invitations to private viewings,
              and access exclusive pieces before they’re unveiled to the world.
            </p>

            {/* Email form — bordered row */}
            <form
              onSubmit={(e) => { e.preventDefault(); }}
              className="w-full max-w-[460px] flex flex-col sm:flex-row border border-white/15"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 min-w-0 bg-transparent px-6 py-4 text-white text-sm font-light placeholder-white/30 outline-none border-b sm:border-b-0 sm:border-r border-white/15 font-sans"
                required
              />
              <button
                type="submit"
                className="btn-maison flex-shrink-0 bg-gold text-obsidian hover:text-white px-8"
              >
                <span>Subscribe</span>
              </button>
            </form>

            {/* Fine print */}
            <p className="text-white/20 mt-5" style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              No spam — Unsubscribe at any time
            </p>
          </motion.div>
        </div>
      </section>


      {/* ========================================
          10. INSTAGRAM EDITORIAL GALLERY
          ======================================== */}
      <section className="section-luxury bg-champagne/30">
        <div className="container-maison">
          <SectionHeader
            overline="@sufrah.pk"
            title="Follow Our"
            titleItalic="Journey"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
            {instagramImages.map((img, i) => (
              <motion.a
                key={i}
                href="https://instagram.com/sufrah.pk"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="group relative aspect-square overflow-hidden bg-champagne"
              >
                <img
                  src={img}
                  alt={`Sufrah.pk Instagram ${i + 1}`}
                  className="w-full h-full object-cover img-jewelry"
                />
                <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/40 transition-all duration-700 flex items-center justify-center">
                  <Instagram
                    size={24}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {modalProduct && (
        <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />
      )}
    </>
  );
}
