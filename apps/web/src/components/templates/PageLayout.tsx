import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { Floor } from '../organisms/Floor';
import { Nav } from '../organisms/Nav';

/** Gabarit commun : navigation en case, contenu, sol et plinthe. Transition entre les pages. */
export function PageLayout() {
  const location = useLocation();
  // useOutlet (et non <Outlet />) : la page qui sort garde son contenu pendant l'animation.
  const outlet = useOutlet();
  const reduce = useReducedMotion();
  const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;

  // Nouvelle page : on remonte en haut, sauf si on doit aller à une section précise.
  useEffect(() => {
    if (!scrollTo) window.scrollTo(0, 0);
  }, [location.pathname, scrollTo]);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#contenu"
        className="sr-only z-[60] bg-ink px-4 py-2 text-panel focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('contenu')?.focus();
        }}
      >
        Aller au contenu
      </a>
      <Nav />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          id="contenu"
          tabIndex={-1}
          className="flex-1 outline-none"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {outlet}
        </motion.main>
      </AnimatePresence>
      <Floor />
    </div>
  );
}
