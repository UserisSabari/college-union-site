const isReducedMotion = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: isReducedMotion ? 0 : 0.5, ease: 'easeOut' }
  }
} as const;

// Amplified: y offset increased from 20→48, duration increased for deliberate feel
export const fadeUp = {
  hidden: { opacity: 0, y: isReducedMotion ? 0 : 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: isReducedMotion ? 0 : 0.6, ease: 'easeOut' }
  }
} as const;

// Faster fade for cards inside stagger containers
export const fadeUpFast = {
  hidden: { opacity: 0, y: isReducedMotion ? 0 : 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: isReducedMotion ? 0 : 0.45, ease: 'easeOut' }
  }
} as const;

export const slideInLeft = {
  hidden: { opacity: 0, x: isReducedMotion ? 0 : -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: isReducedMotion ? 0 : 0.55, ease: 'easeOut' }
  }
} as const;

export const slideInRight = {
  hidden: { opacity: 0, x: isReducedMotion ? 0 : 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: isReducedMotion ? 0 : 0.55, ease: 'easeOut' }
  }
} as const;

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: isReducedMotion ? 0 : 0.12,
      delayChildren: isReducedMotion ? 0 : 0.05,
    }
  }
} as const;

// Faster stagger for dense grids (gallery, member cards)
export const staggerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: isReducedMotion ? 0 : 0.07,
    }
  }
} as const;
