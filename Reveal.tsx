import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

/** Apparition « case de manga » : la case se pose avec un léger rebond. */
export const caseVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 24 } },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Décale l'apparition des enfants qui utilisent caseVariants (grilles de cases). */
  stagger?: boolean;
  delay?: number;
}

/** Fait apparaître son contenu quand il entre à l'écran. Respecte « réduire les animations ». */
export function Reveal({ children, className, stagger = false, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={
        stagger
          ? { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: delay } } }
          : {
              hidden: caseVariants.hidden,
              show: { ...(caseVariants.show as object), transition: { type: 'spring', stiffness: 260, damping: 24, delay } },
            }
      }
    >
      {children}
    </motion.div>
  );
}
