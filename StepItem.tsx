import { motion } from 'framer-motion';
import type { Etape } from '@portfolio/content';
import { CodeBlock } from '../atoms/CodeBlock';
import { caseVariants } from '../atoms/Reveal';
import { RichText } from '../atoms/RichText';

/** Étape numérotée d'une fiche : numéro en Michroma, titre, texte, commandes éventuelles. */
export function StepItem({ index, etape }: { index: number; etape: Etape }) {
  return (
    <motion.li variants={caseVariants} className="grid grid-cols-[48px_minmax(0,1fr)] gap-4 border-frame border-ink bg-panel p-5 md:grid-cols-[64px_minmax(0,1fr)]">
      <span className="font-display text-h3 text-teal-text" aria-hidden="true">
        {String(index).padStart(2, '0')}
      </span>
      <div className="min-w-0">
        <h3 className="font-sans text-label font-bold uppercase text-ink">{etape.titre}</h3>
        <p className="mt-1 text-body text-ink">
          <RichText text={etape.texte} />
        </p>
        {etape.code && <CodeBlock code={etape.code} />}
      </div>
    </motion.li>
  );
}
