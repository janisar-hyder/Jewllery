import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../hooks/useWhatsApp';

export default function WhatsAppFAB() {
  return (
    <motion.a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 w-14 h-14 bg-[#25D366] text-white flex items-center justify-center shadow-jewelry animate-pulse-gold"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} />
    </motion.a>
  );
}
