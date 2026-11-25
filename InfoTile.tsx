import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { Icone } from '@portfolio/content';
import { Icon } from '../atoms/Icon';
import { caseVariants } from '../atoms/Reveal';

interface InfoTileProps {
  icon: Icone | 'mail' | 'document';
  label: string;
  children: ReactNode;
}

/** Tuile « info » : icône au trait 32 px, label en majuscules, corps de texte. */
export function InfoTile({ icon, label, children }: InfoTileProps) {
  return (
    <motion.div variants={caseVariants} className="flex h-full gap-4 border-frame border-ink bg-panel p-4">
      <Icon name={icon} />
      <div className="flex min-w-0 flex-col gap-2">
        <span className="font-sans text-label font-bold uppercase text-ink">{label}</span>
        <div className="text-body text-ink">{children}</div>
      </div>
    </motion.div>
  );
}
