import { motion } from 'framer-motion';
import { fadeInUp, goldLineExpand } from '../animations/variants';

export default function SectionHeader({ overline, title, titleItalic, description, light = false, align = 'center' }) {
  const alignClass = align === 'center' ? 'text-center items-center'
    : align === 'left' ? 'text-left items-start'
    : 'text-right items-end';

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`flex flex-col ${alignClass} mb-8 md:mb-12`}
    >
      {/* Gold decorative line */}
      <motion.div
        variants={goldLineExpand}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="gold-line mb-5"
      />

      {/* Overline label */}
      {overline && (
        <p className={`text-overline mb-3 ${light ? 'text-gold' : 'text-gold'}`}>
          {overline}
        </p>
      )}

      {/* Title with optional italic emphasis */}
      <h2 className={`text-collection ${light ? 'text-white' : 'text-obsidian'}`}>
        {title}
        {titleItalic && (
          <>
            <br className="hidden md:block" />{' '}
            <em className="font-light italic">{titleItalic}</em>
          </>
        )}
      </h2>

      {/* Description */}
      {description && (
        <p className={`mt-4 max-w-xl text-body ${light ? 'text-white/60' : ''}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
