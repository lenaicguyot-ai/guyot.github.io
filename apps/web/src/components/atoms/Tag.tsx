import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export type TagVariant = 'outline' | 'solid' | 'todo' | 'planned';

const variants: Record<TagVariant, string> = {
  outline: 'border-ink text-ink',
  solid: 'border-ink bg-ink text-panel',
  todo: 'border-coral-text text-coral-text',
  planned: 'border-teal-text text-teal-text',
};

interface TagProps {
  children: ReactNode;
  variant?: TagVariant;
  className?: string;
}

/** Étiquette courte en majuscules (caption, trait 1 px, angles droits). */
export function Tag({ children, variant = 'outline', className }: TagProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center border-hair px-2 py-0.5 font-sans text-caption font-bold uppercase',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Pastille de rang (#1, #2…) en Michroma. */
export function RankPill({ rank }: { rank: number }) {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-frame border-ink bg-blush font-display text-caption">
      #{rank}
    </span>
  );
}
