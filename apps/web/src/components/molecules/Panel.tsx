import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { Halftone } from '../atoms/Halftone';
import { caseVariants } from '../atoms/Reveal';

export type PanelVariant = 'standard' | 'paper' | 'halftone';

interface PanelProps {
  children?: ReactNode;
  title?: string;
  variant?: PanelVariant;
  className?: string;
  /** Classes de la zone de contenu (marge intérieure, mise en page). */
  bodyClassName?: string;
  as?: 'div' | 'article' | 'aside';
}

/**
 * Case de planche : rectangle blanc cerclé d'encre (2 px), angles droits, sans ombre.
 * Variantes : standard, papier (mise en avant), tramée (bandeau de trame en haut).
 * Placée dans un <Reveal stagger>, elle apparaît case après case.
 */
export function Panel({ children, title, variant = 'standard', className, bodyClassName, as = 'div' }: PanelProps) {
  const Comp = motion[as];
  return (
    <Comp
      variants={caseVariants}
      className={cx('flex flex-col border-frame border-ink', variant === 'paper' ? 'bg-blush' : 'bg-panel', className)}
    >
      {variant === 'halftone' && <Halftone className="h-14 shrink-0 border-b-frame border-ink" />}
      {/* bodyClassName remplace la marge et l'écart par défaut (évite les conflits Tailwind). */}
      <div className={cx('flex flex-1 flex-col', bodyClassName ?? 'gap-4 p-6')}>
        {title && <h3 className="font-hand text-bubble uppercase text-ink">{title}</h3>}
        {children}
      </div>
    </Comp>
  );
}
