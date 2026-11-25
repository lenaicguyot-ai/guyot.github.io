import { motion, useReducedMotion } from 'framer-motion';
import { cx } from '../../lib/cx';

interface BubbleProps {
  text: string;
  className?: string;
  /** Le texte est répété ailleurs : la bulle devient décorative. */
  decorative?: boolean;
}

/**
 * Bulle de dialogue : ellipse blanche cerclée 2 px, queue vers le bas à gauche.
 * La queue est dessinée deux fois (avec puis sans trait) pour effacer la jonction.
 */
export function SpeechBubble({ text, className, decorative = false }: BubbleProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      // « relative » seulement si l'appelant ne positionne pas la bulle (sinon conflit avec « absolute »).
      className={cx(!className?.includes('absolute') && 'relative', 'h-[96px] w-[220px] shrink-0', className)}
      aria-hidden={decorative || undefined}
      initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: -6 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 16, delay: 0.5 }}
    >
      <svg className="absolute inset-0" width="220" height="96" viewBox="0 0 220 96" aria-hidden="true">
        <path d="M62 64 L34 92 L90 70 Z" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
        <ellipse cx="114" cy="40" rx="102" ry="36" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2" />
        <path d="M62 64 L38 88 L88 70 Z" fill="var(--panel)" />
      </svg>
      <span className="absolute left-[16px] top-[4px] flex h-[72px] w-[196px] items-center justify-center text-center font-hand text-bubble-sm uppercase text-ink">
        {text}
      </span>
    </motion.div>
  );
}

/** Bulle « explosion » pour signaler une nouveauté, à cheval sur le coin d'une case. */
export function Burst({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={cx('burst inline-flex h-[80px] w-[124px] items-center justify-center', className)}
      animate={reduce ? undefined : { rotate: [-4, 4, -4] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className="relative z-10 font-hand text-bubble-sm uppercase text-ink">{text}</span>
    </motion.span>
  );
}
