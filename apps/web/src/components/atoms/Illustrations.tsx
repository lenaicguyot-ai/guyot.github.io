/**
 * Décor redessiné au trait (assets « Illustrations » de la maquette), en SVG inline
 * pour lire les variables CSS. Toujours décoratif : aria-hidden.
 */

interface ArtProps {
  className?: string;
}

/** Fenêtre : quatre carreaux blancs entre deux montants turquoise, nuages au trait. */
export function WindowArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 300 168" className={className} aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <rect x="30" y="8" width="14" height="160" fill="var(--teal)" stroke="var(--ink)" strokeWidth="2" />
      <rect x="256" y="8" width="14" height="160" fill="var(--teal)" stroke="var(--ink)" strokeWidth="2" />
      <rect x="44" y="20" width="212" height="128" fill="var(--panel)" stroke="var(--ink)" strokeWidth="2" />
      <line x1="150" y1="20" x2="150" y2="148" stroke="var(--ink)" strokeWidth="2" />
      <line x1="44" y1="84" x2="256" y2="84" stroke="var(--ink)" strokeWidth="2" />
      <path d="M64 70 q0 -14 14 -14 q4 -12 18 -10 q10 -10 22 0 q14 0 14 14 z" fill="var(--panel)" stroke="var(--ink)" strokeWidth="1" />
      <path d="M178 60 q0 -11 11 -11 q3 -9 14 -8 q8 -8 17 0 q11 0 11 11 z" fill="var(--panel)" stroke="var(--ink)" strokeWidth="1" />
    </svg>
  );
}

/** Nuage au trait. */
export function CloudArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true">
      <path d="M14 50 q0 -16 16 -16 q5 -14 21 -12 q12 -12 26 0 q16 0 16 16 z" fill="var(--panel)" stroke="var(--ink)" strokeWidth="1" />
    </svg>
  );
}

/** Baie serveur à trois tiroirs, voyants corail et turquoise. Sert aussi de repli si la 3D est indisponible. */
export function RackArt({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 140 130" className={className} aria-hidden="true">
      <rect x="6" y="6" width="128" height="116" fill="var(--floor)" stroke="var(--ink)" strokeWidth="2" />
      <line x1="6" y1="40" x2="134" y2="40" stroke="var(--ink)" strokeWidth="1" />
      <line x1="6" y1="74" x2="134" y2="74" stroke="var(--ink)" strokeWidth="1" />
      <line x1="6" y1="106" x2="134" y2="106" stroke="var(--ink)" strokeWidth="1" />
      <circle cx="22" cy="23" r="4" fill="var(--coral)" stroke="var(--ink)" strokeWidth="1" />
      <circle cx="36" cy="23" r="4" fill="var(--teal)" stroke="var(--ink)" strokeWidth="1" />
      <circle cx="22" cy="57" r="4" fill="var(--coral)" stroke="var(--ink)" strokeWidth="1" />
      <circle cx="22" cy="90" r="4" fill="var(--teal)" stroke="var(--ink)" strokeWidth="1" />
      <rect x="80" y="18" width="42" height="10" fill="var(--panel)" stroke="var(--ink)" strokeWidth="1" />
      <rect x="80" y="52" width="42" height="10" fill="var(--panel)" stroke="var(--ink)" strokeWidth="1" />
      <rect x="80" y="85" width="42" height="10" fill="var(--panel)" stroke="var(--ink)" strokeWidth="1" />
    </svg>
  );
}
