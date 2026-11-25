import { motion } from 'framer-motion';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import { caseVariants, Reveal } from '../atoms/Reveal';
import { TwoToneTitle } from '../atoms/TwoToneTitle';

const CHAPITRES = [
  { id: 'candidat', titre: 'Présentation du candidat' },
  { id: 'bts', titre: 'Le BTS SIO' },
  { id: 'entreprise', titre: 'Entreprise & rôle' },
  { id: 'ecole', titre: 'École & certifications' },
  { id: 'epreuves', titre: 'Épreuves' },
  { id: 'atelier', titre: 'Atelier professionnel' },
  { id: 'veille', titre: 'Veille technologique & juridique' },
  { id: 'contact', titre: 'Travaillons ensemble' },
];

/** « Mon portfolio » : les huit chapitres de la trame en cases numérotées, chacune mène à sa section. */
export function Sommaire() {
  const scrollTo = useScrollToSection();
  return (
    <section aria-labelledby="titre-sommaire" className="px-4 pb-4 pt-14 md:px-page">
      <div className="mx-auto flex max-w-planche flex-col gap-5">
        <TwoToneTitle id="titre-sommaire" text="Mon portfolio" className="text-h1" />
        <Reveal stagger className="grid grid-cols-2 gap-gutter lg:grid-cols-4">
          {CHAPITRES.map((c, i) => (
            <motion.button
              key={c.id}
              type="button"
              variants={caseVariants}
              onClick={() => scrollTo(c.id)}
              className="flex min-h-[120px] flex-col gap-2.5 border-frame border-ink bg-panel p-[18px] text-left transition-colors hover:bg-blush"
            >
              <span className="font-display text-[32px] leading-none text-teal-text">{String(i + 1).padStart(2, '0')}</span>
              <b className="text-label uppercase text-ink">{c.titre}</b>
            </motion.button>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
