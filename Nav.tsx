import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cx } from '../../lib/cx';
import { Brand } from '../atoms/Brand';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useScrollToSection } from '../../hooks/useScrollToSection';

export const NAV_ITEMS = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'epreuves', label: 'Épreuves' },
  { id: 'atelier', label: 'Atelier pro' },
  { id: 'veille', label: 'Veille' },
  { id: 'contact', label: 'Contact' },
];

const lien =
  'font-hand text-bubble-sm uppercase text-ink decoration-2 underline-offset-4 hover:text-coral-text hover:underline';

/** Barre de navigation en case : marque à gauche, liens lettrés à droite, menu déroulant sous 720 px. */
export function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const scrollTo = useScrollToSection();
  const active = useActiveSection(
    NAV_ITEMS.map((n) => n.id),
    pathname === '/',
  );

  const go = (id: string) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <header className="no-print sticky top-0 z-50 bg-paper px-4 pt-3 md:px-page">
      <nav aria-label="Navigation principale" className="mx-auto max-w-planche border-frame border-ink bg-panel">
        <div className="flex h-14 items-center justify-between px-6">
          <button type="button" onClick={() => go('accueil')} aria-label="Retour à l'accueil">
            <Brand />
          </button>

          <ul className="hidden gap-8 nav:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => go(item.id)}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={cx(lien, active === item.id && 'underline')}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="h-10 border-frame border-ink px-3 font-sans text-label font-bold uppercase text-ink hover:bg-ink hover:text-panel nav:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Fermer' : 'Menu'}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              id="menu-mobile"
              className="overflow-hidden border-t-frame border-ink nav:hidden"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {NAV_ITEMS.map((item) => (
                <li key={item.id} className="border-b-hair border-ink last:border-b-0">
                  <button type="button" onClick={() => go(item.id)} className={cx(lien, 'block w-full px-6 py-3 text-left')}>
                    {item.label}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
