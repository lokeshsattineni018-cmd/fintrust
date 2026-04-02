import type { Transition, Variants } from 'framer-motion';

export const springSnappy: Transition = { type: 'spring', stiffness: 400, damping: 30 };

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.02 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 380, damping: 28 },
  },
};

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    y: -2,
    transition: springSnappy,
  },
  tap: { scale: 0.99 },
};

export const viewportOnce = {
  once: true,
  amount: 0.15,
  margin: '0px 0px -40px 0px',
};
