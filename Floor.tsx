import { useScrollToSection } from '../../hooks/useScrollToSection';

/** Sol et plinthe : la bande qui ferme chaque page, sert de pied de page. */
export function Floor() {
  const scrollTo = useScrollToSection();
  return (
    <footer className="no-print mt-16 border-t-plinthe border-baseboard bg-floor">
      <div className="mx-auto flex min-h-floor max-w-planche flex-col items-start justify-center gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-page">
        <span className="text-body text-ink">© 2026 Lénaïc Guyot · BTS SIO SISR · H3 Hitema · WAAT</span>
        <button
          type="button"
          onClick={() => scrollTo('contact')}
          className="font-hand text-bubble-sm uppercase text-ink hover:text-coral-text hover:underline"
        >
          Travaillons ensemble →
        </button>
      </div>
    </footer>
  );
}
