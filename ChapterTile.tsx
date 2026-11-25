import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Halftone } from '../atoms/Halftone';
import { caseVariants } from '../atoms/Reveal';
import { RichText } from '../atoms/RichText';
import { Tag } from '../atoms/Tag';

interface ChapterTileProps {
  to: string;
  code: string;
  badge: string;
  title: string;
  meta: string;
  resume: string;
}

/**
 * Tuile « chapitre » : image tramée avec un code en Michroma (E5, E6, AP),
 * légende lettrée, métadonnée. Remplace une photo absente. Toute la tuile est cliquable.
 */
export function ChapterTile({ to, code, badge, title, meta, resume }: ChapterTileProps) {
  return (
    <motion.article variants={caseVariants} initial="hidden" whileInView="show" viewport={{ once: true }} exit="hidden" layout className="h-full">
      <Link
        to={to}
        className="group flex h-full flex-col border-frame border-ink bg-panel transition-colors hover:bg-paper"
      >
        <Halftone className="relative flex h-36 items-center justify-center border-b-frame border-ink">
          <motion.span
            className="flex h-16 w-16 items-center justify-center border-frame border-ink bg-panel font-display text-[16px] text-ink"
            whileHover={{ rotate: -6, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
          >
            {code}
          </motion.span>
          <Tag variant="solid" className="absolute left-3 top-3">
            {badge}
          </Tag>
        </Halftone>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <h3 className="font-hand text-bubble-sm uppercase text-ink group-hover:text-coral-text">{title}</h3>
          <p className="font-sans text-caption font-bold uppercase text-ink-soft">{meta}</p>
          <p className="text-body text-ink">
            <RichText text={resume} />
          </p>
          <span className="mt-auto pt-2 font-sans text-label font-bold uppercase text-ink group-hover:underline">
            Voir la fiche →
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
