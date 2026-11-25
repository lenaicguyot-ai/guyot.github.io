import { motion, useReducedMotion } from 'framer-motion';
import { lazy, Suspense, useCallback, useRef, useState } from 'react';
import { profil } from '@portfolio/content';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import { Button, ButtonLink } from '../atoms/Button';
import { Reveal } from '../atoms/Reveal';
import { Panel } from '../molecules/Panel';
import { SpeechBubble } from '../molecules/SpeechBubble';
import { RackSpin } from './RackSpin';

// PixiJS n'est chargé qu'à l'affichage de la scène (fichier séparé, page plus légère).
const KatanaScene = lazy(() => import('./KatanaScene'));

const CV_URL = `${import.meta.env.BASE_URL}CV.pdf`;

/**
 * Accueil : la page est une pièce. Grande case héros (présentation + baie serveur à lancer),
 * case « Repères », puis une estrade où l'on attrape le katana pour trancher les pots (PixiJS).
 */
export function Hero() {
  const scrollTo = useScrollToSection();
  const reduce = useReducedMotion();
  const roomRef = useRef<HTMLElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);
  const [coupe, setCoupe] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const onCut = useCallback(() => setCoupe(true), []);

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
    <section
      ref={roomRef}
      id="accueil"
      aria-labelledby="titre-accueil"
      className="relative flex min-h-[calc(100svh-72px)] scroll-mt-24 flex-col gap-gutter overflow-hidden px-4 pt-gutter md:px-page"
    >
      <Reveal stagger className="relative z-[2] mx-auto grid w-full max-w-planche gap-gutter lg:grid-cols-4">
        <Panel className="overflow-hidden lg:col-span-3" bodyClassName="md:flex-row md:min-h-[372px]">
          <div className="flex flex-1 flex-col gap-5 px-6 py-7 md:py-8 md:pl-10 md:pr-0 lg:pt-10">
            <p className="font-sans text-label font-bold uppercase text-coral-text">{profil.tag}</p>
            <h1 id="titre-accueil" className="font-display text-[clamp(40px,4.6vw,59px)] uppercase leading-none text-ink">
              {lettre(profil.prenom, 0.15)} <span className="text-coral-text">{lettre(profil.nom, 0.3)}</span>
            </h1>
            <p className="max-w-[30ch] text-subtitle text-ink">{profil.accroche}</p>
            <div className="mt-auto flex flex-wrap gap-gutter pt-2">
              <Button variant="primary" onClick={() => scrollTo('epreuves')}>
                Voir mes épreuves
              </Button>
              <ButtonLink href={CV_URL} target="_blank" rel="noopener">
                Télécharger mon CV
              </ButtonLink>
              <Button variant="accent" onClick={() => scrollTo('contact')}>
                Me contacter
              </Button>
            </div>
          </div>

          <RackSpin className="h-[360px] flex-none border-t-frame border-ink md:h-auto md:w-[400px] md:border-l-frame md:border-t-0">
            <SpeechBubble text={profil.bulle} decorative className="pointer-events-none absolute left-2.5 top-3 z-[3]" />
          </RackSpin>
        </Panel>

        <Panel as="aside" bodyClassName="gap-3.5 px-6 py-7">
          <h2 className="font-hand text-[28px] uppercase leading-none text-ink">Repères</h2>
          {profil.reperes.map((r) => (
            <div key={r.titre} className="flex flex-col gap-1 border-b-hair border-ink pb-3.5 last:border-b-0 last:pb-0">
              {r.chiffre && <span className="font-display text-[32px] leading-none text-teal-text">{r.chiffre}</span>}
              <b className="text-label uppercase text-ink">{r.titre}</b>
              {r.texte && <span className="text-body text-ink-soft">{r.texte}</span>}
            </div>
          ))}
        </Panel>
      </Reveal>

      {/* L'estrade : le katana sur son support, entre deux pots. */}
      <div className="relative min-h-[clamp(250px,27vw,340px)] flex-1">
        <div className="absolute left-1/2 top-1.5 z-[6] flex -translate-x-1/2 flex-col items-center gap-2 text-center">
          <p className="max-w-[28ch] font-hand text-bubble-sm uppercase text-ink">Attrape le katana et lâche-le sur un pot</p>
          {coupe && (
            <button
              type="button"
              className="min-h-8 border-frame border-ink bg-panel px-3 font-sans text-caption font-bold uppercase text-ink hover:bg-ink hover:text-panel"
              onClick={() => {
                setCoupe(false);
                setResetKey((k) => k + 1);
              }}
            >
              Tout remettre en place
            </button>
          )}
        </div>
      </div>
      <div ref={floorRef} className="-mx-4 h-floor flex-none border-t-plinthe border-baseboard bg-floor md:-mx-page" aria-hidden="true" />

      <Suspense fallback={null}>
        <KatanaScene roomRef={roomRef} floorRef={floorRef} resetKey={resetKey} onCut={onCut} />
      </Suspense>
    </section>
  );
}
