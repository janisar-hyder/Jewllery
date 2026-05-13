import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-ivory z-[100] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center"
      >
        <h1 className="font-serif text-4xl md:text-5xl font-light text-obsidian mb-4">
          Sufrah<span className="text-gold">.</span>pk
        </h1>
        <div className="w-16 h-px bg-gold mx-auto mb-4" />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-overline text-taupe"
        >
          A Luxury Jewelry Maison
        </motion.p>
      </motion.div>
    </div>
  );
}
