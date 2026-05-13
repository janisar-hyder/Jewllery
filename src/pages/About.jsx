import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerChild, imageReveal } from '../animations/variants';
import { Gem, Heart, Award, Sparkles } from 'lucide-react';

// Animated counter
function Counter({ target, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration: 2.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      });
      return controls.stop;
    }
  }, [isInView, target, count]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}

const values = [
  {
    Icon: Gem,
    title: 'Rare Materials',
    description: 'We source only the finest gemstones and precious metals, ensuring each piece meets the highest standards of quality and authenticity.',
  },
  {
    Icon: Heart,
    title: 'Made With Love',
    description: 'Every creation is infused with passion and care. Our artisans pour their heart into each design, making every piece a labor of love.',
  },
  {
    Icon: Award,
    title: 'Master Artisans',
    description: 'Our craftsmen are inheritors of centuries-old Pakistani jewelry traditions. Their expertise transforms raw materials into wearable art.',
  },
  {
    Icon: Sparkles,
    title: 'Timeless Design',
    description: 'We design pieces that transcend trends — jewelry that will be treasured today and passed down through generations.',
  },
];

const stats = [
  { value: 500, suffix: '+', label: 'Pieces Crafted' },
  { value: 50, suffix: '+', label: 'Master Artisans' },
  { value: 1000, suffix: '+', label: 'Happy Clients' },
  { value: 5, suffix: '', label: 'Years of Excellence' },
];

export default function About() {
  return (
    <div className="pt-24 md:pt-28">
      {/* Hero */}
      <section className="section-luxury">
        <div className="container-maison">
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <div style={{ width: '3rem', height: '1px', backgroundColor: 'var(--color-gold)', margin: '0 auto 1.25rem' }} />
              <p className="text-overline text-gold" style={{ marginBottom: '0.75rem' }}>Our Story</p>
              <h1
                className="text-hero text-obsidian"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', textAlign: 'center', marginBottom: '1.25rem' }}
              >
                A Legacy of<br />
                <em className="italic font-light">Elegance</em>
              </h1>
              <p className="text-body" style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
                Founded in Lahore, Sufrah.pk was born from a singular vision:
                to celebrate the magnificence of Pakistani craftsmanship and bring
                the art of haute joaillerie to modern women.
              </p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Brand Story */}
      <section className="section-luxury bg-champagne/40">
        <div className="container-maison">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Image */}
            <motion.div
              variants={imageReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="aspect-[3/4] overflow-hidden shadow-jewelry bg-champagne">
                <img
                  src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80"
                  alt="Sufrah.pk Brand Story"
                  className="w-full h-full object-cover img-jewelry"
                />
              </div>
            </motion.div>

            {/* Story */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <div className="gold-line mb-6" />
              <p className="text-overline text-gold mb-4">The Beginning</p>
              <h2 className="text-collection text-obsidian mb-6">
                From Heritage<br />
                <em className="italic font-light">To Modernity</em>
              </h2>
              <p className="text-body mb-5">
                In the heart of Lahore's old city, where the fragrance of jasmine meets
                the rhythmic tapping of goldsmiths' hammers, Sufrah.pk took its first breath.
                We are a bridge between the magnificent jewelry traditions of the subcontinent
                and the refined tastes of the modern woman.
              </p>
              <p className="text-body mb-5">
                Our founder envisioned a maison where every piece would be more than an accessory
                — it would be a story, a memory, a piece of art. Drawing from Mughal heritage,
                Islamic geometry, and contemporary elegance, we create jewelry and accessories
                that speak to the soul.
              </p>
              <p className="text-body">
                Today, Sufrah.pk stands as a testament to what happens when tradition meets
                innovation — when master artisans collaborate with modern designers to create
                pieces that are both timeless and contemporary.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Counters */}
      <section className="section-luxury">
        <div className="container-maison">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={staggerChild}
                className="text-center border-t border-gold/20 pt-6"
              >
                <p className="font-serif text-4xl md:text-5xl font-light text-obsidian mb-2">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-overline text-taupe">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-luxury bg-emerald">
        <div className="container-maison">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-14"
          >
            <div className="gold-line mx-auto mb-5" />
            <p className="text-overline text-gold mb-3">Our Values</p>
            <h2 className="text-collection text-white">
              What We <em className="italic font-light">Believe</em>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10"
          >
            {values.map(({ Icon, title, description }, i) => (
              <motion.div
                key={i}
                variants={staggerChild}
                className="bg-emerald p-8 text-center group"
              >
                <Icon size={26} className="text-gold mx-auto mb-4 transition-transform duration-700 group-hover:scale-110" />
                <h3 className="font-serif text-xl text-white mb-3 font-light">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className="section-luxury">
        <div className="container-maison">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Text — first on desktop */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-2 md:order-1 flex flex-col justify-center"
            >
              <div className="gold-line mb-6" />
              <p className="text-overline text-gold mb-4">Our Vision</p>
              <h2 className="text-collection text-obsidian mb-6">
                Redefining<br />
                <em className="italic font-light">Pakistani Luxury</em>
              </h2>
              <p className="text-body mb-5">
                We envision a future where Pakistani craftsmanship is celebrated on the
                world stage — where the names of our artisans are spoken with the same
                reverence as the great maisons of Paris and Milan.
              </p>
              <p className="text-body mb-8">
                Every piece we create is a step towards that vision. Through uncompromising
                quality, ethical practices, and designs that honor our heritage while
                embracing modernity, we are building a legacy that transcends borders.
              </p>
              <p className="font-serif text-lg md:text-xl italic text-gold/80 border-l-2 border-gold/30 pl-6 leading-relaxed">
                "True luxury is not about price — it is about the patience, skill, and
                love woven into every detail."
              </p>
            </motion.div>

            {/* Image — second on desktop */}
            <motion.div
              variants={imageReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <div className="aspect-[3/4] overflow-hidden shadow-jewelry bg-champagne">
                <img
                  src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80"
                  alt="Our Vision"
                  className="w-full h-full object-cover img-jewelry"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
