import { motion, useReducedMotion } from 'framer-motion';
import { Halftone } from '../atoms/Halftone';

/**
 * Bandeau de couverture (composant Cover de la maquette) : une bande de cases
 * inégales séparées par la gouttière, chacune cerclée d'encre. Décoratif.
 */
const blocs = [
  { grow: 300, className: 'bg-ink flex items-end p-3', label: 'Portfolio' },
  { grow: 160, className: 'bg-coral' },
  { grow: 160, className: '', trame: true },
  { grow: 60, className: 'bg-teal' },
  { grow: 240, className: 'bg-floor border-t-plinthe border-baseboard' },
];

export function CoverBand() {
  const reduce = useReducedMotion();
  return (
    <div className="flex h-16 gap-gutter md:h-24" aria-hidden="true">
      {blocs.map((b, i) => (
        <motion.div
          key={i}
          style={{ flexGrow: b.grow, flexBasis: 0 }}
          className="min-w-0 origin-top overflow-hidden border-frame border-ink"
          initial={reduce ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 22, delay: i * 0.06 }}
        >
          {b.trame ? (
            <Halftone className="h-full w-full" />
          ) : (
            <div className={`h-full w-full ${b.className}`}>
              {b.label && <span className="font-display text-caption uppercase text-panel">{b.label}</span>}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
