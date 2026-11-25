import { motion, useReducedMotion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { profil } from '@portfolio/content';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import { Button, ButtonLink } from '../atoms/Button';
import { RackArt, WindowArt } from '../atoms/Illustrations';
import { Reveal } from '../atoms/Reveal';
import { Tag } from '../atoms/Tag';
import { Panel } from '../molecules/Panel';
import { SpeechBubble } from '../molecules/SpeechBubble';
import { CoverBand } from './CoverBand';

// Three.js n'est chargé qu'à l'affichage de la scène (fichier séparé, page plus légère).
const RackScene = lazy(() => import('./RackScene'));

const CV_URL = `${import.meta.env.BASE_URL}CV.pdf`;

/** Accueil : bandeau de couverture, présentation, et la chambre (fenêtre, sol, baie 3D, bulle). */
export function Hero() {
  const scrollTo = useScrollToSection();
  const reduce = useReducedMotion();

  const lettre = (texte: string, delai: number) =>
    reduce ? (
      texte
    ) : (
      <motion.span
        className="inline-block"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: delai }}
      >
        {texte}
      </motion.span>
    );

  return (
    <section id="accueil" aria-labelledby="titre-accueil" className="scroll-mt-24 px-4 pt-gutter md:px-page">
      <div className="mx-auto max-w-planche">
        <CoverBand />

        <Reveal stagger className="mt-gutter grid gap-gutter lg:grid-cols-[1.3fr_1fr]">
          <Panel bodyClassName="justify-between gap-8 p-6 md:p-10">
            <div>
              <Tag>{profil.tag}</Tag>
              <h1 id="titre-accueil" className="mt-6 font-display text-display uppercase text-ink">
                {lettre(profil.prenom, 0.15)}{' '}
                <span className="text-coral-text">{lettre(profil.nom, 0.3)}</span>
              </h1>
              <p className="mt-6 max-w-[52ch] text-subtitle text-ink">{profil.accroche}</p>
            </div>

            <div className="flex flex-wrap gap-gutter">
              <Button variant="primary" onClick={() => scrollTo('epreuves')}>
                Voir les épreuves
              </Button>
              <ButtonLink href={CV_URL} target="_blank" rel="noopener">
                Télécharger le CV
              </ButtonLink>
              <Button variant="accent" onClick={() => scrollTo('contact')}>
                Me contacter
              </Button>
            </div>

            <dl className="grid grid-cols-3 gap-gutter border-t-hair border-ink pt-4">
              {profil.stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse gap-1">
                  <dt className="font-sans text-caption font-bold uppercase text-ink-soft">{s.label}</dt>
                  <dd className="font-display text-[clamp(13px,1.8vw,18px)] uppercase text-ink">{s.valeur}</dd>
                </div>
              ))}
            </dl>
          </Panel>

          {/* La chambre : mur rose, fenêtre, sol et plinthe, baie serveur en 3D. */}
          <Panel variant="paper" className="relative min-h-[380px] overflow-hidden" bodyClassName="relative">
            <WindowArt className="absolute left-1/2 top-[12%] w-[78%] max-w-[340px] -translate-x-1/2" />
            <div className="absolute inset-x-0 bottom-0 h-16 border-t-[10px] border-baseboard bg-floor" aria-hidden="true" />
            <div className="relative h-[380px] lg:h-full lg:min-h-[460px]">
              <Suspense fallback={<RackArt className="absolute bottom-6 left-1/2 w-40 -translate-x-1/2" />}>
                <RackScene />
              </Suspense>
            </div>
            <SpeechBubble text={profil.bulle} className="absolute left-3 top-3" />
          </Panel>
        </Reveal>
      </div>
    </section>
  );
}
