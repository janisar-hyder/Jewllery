import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fadeInUp } from '../animations/variants';

export default function TestimonialSlider({ testimonials }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goTo = (i) => setCurrent(i);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
      {/* Large decorative quote mark */}
      <div className="text-gold/20 font-serif text-[8rem] leading-none select-none mb-0" style={{ fontFamily: 'Georgia, serif', lineHeight: 0.7 }}>
        &ldquo;
      </div>

      {/* Testimonial slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center"
          style={{ minHeight: '220px' }}
        >
          {/* Quote text */}
          <p className="font-serif text-lg md:text-2xl italic font-light text-obsidian leading-relaxed mb-8 px-2 md:px-6">
            {t.text}
          </p>

          {/* Author row — centered */}
          <div className="flex flex-col items-center gap-3">
            <img
              src={t.image}
              alt={t.name}
              className="w-14 h-14 object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-[1800ms]"
            />
            <div>
              <p className="font-serif text-base text-gold font-medium">{t.name}</p>
              <p className="text-overline text-taupe mt-1">{t.location}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation — arrows + dots centered in one row */}
      <div className="flex items-center justify-center gap-5 mt-10">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="w-10 h-10 border border-gold/20 flex items-center justify-center text-taupe transition-all duration-500 hover:border-gold hover:text-gold flex-shrink-0"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-[3px] rounded-none transition-all duration-500 ${
                i === current ? 'bg-gold w-8' : 'bg-gold/25 w-3'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next testimonial"
          className="w-10 h-10 border border-gold/20 flex items-center justify-center text-taupe transition-all duration-500 hover:border-gold hover:text-gold flex-shrink-0"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      </motion.div>
    </div>
  );
}
