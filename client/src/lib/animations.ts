// Shared animation variants for framer-motion
// Using 'as const' to satisfy strict typing on ease arrays

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }
  }
};

export const fadeUpSmall = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }
  }
};

export const stagger = {
  visible: { transition: { staggerChildren: 0.08 } }
};

export const staggerFast = {
  visible: { transition: { staggerChildren: 0.05 } }
};
