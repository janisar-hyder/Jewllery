// Sufrah.pk — Framer Motion Luxury Animation Variants
// Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94) — Cinematic luxury feel

const luxuryEase = [0.25, 0.46, 0.45, 0.94];

// Fade in from bottom — standard reveal
export const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: luxuryEase }
  }
};

// Fade in from left — editorial asymmetry
export const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: luxuryEase }
  }
};

// Fade in from right
export const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: luxuryEase }
  }
};

// Scale up — for images and hero elements
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: luxuryEase }
  }
};

// Stagger container for child animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
      ease: luxuryEase
    }
  }
};

// Stagger child item
export const staggerChild = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: luxuryEase }
  }
};

// Cinematic page transition
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: luxuryEase }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4, ease: luxuryEase }
  }
};

// Gold line expand
export const goldLineExpand = {
  hidden: { width: 0 },
  visible: {
    width: '3rem',
    transition: { duration: 0.8, ease: luxuryEase, delay: 0.2 }
  }
};

// Hero text reveal — letter by letter feel
export const heroReveal = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: luxuryEase }
  }
};

// Image reveal — cinematic
export const imageReveal = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.8, ease: luxuryEase }
  }
};
