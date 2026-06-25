const isReducedMotion = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: isReducedMotion ? 0 : 0.4, ease: 'easeOut' }
  }
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: isReducedMotion ? 0 : 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: isReducedMotion ? 0 : 0.5, ease: 'easeOut' }
  }
} as const;

export const slideInLeft = {
  hidden: { opacity: 0, x: isReducedMotion ? 0 : -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: isReducedMotion ? 0 : 0.5, ease: 'easeOut' }
  }
} as const;

export const slideInRight = {
  hidden: { opacity: 0, x: isReducedMotion ? 0 : 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: isReducedMotion ? 0 : 0.5, ease: 'easeOut' }
  }
} as const;

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: isReducedMotion ? 0 : 0.1
    }
  }
} as const;

