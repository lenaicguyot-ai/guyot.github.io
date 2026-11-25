import type { Icone } from '@portfolio/content';

const ligne = { fill: 'none', stroke: 'var(--ink)', strokeWidth: 'var(--stroke-icon)' } as const;

/** Icônes au trait 32 px (encre, 1,25 px), petits voyants corail ou turquoise. */
export function Icon({ name, size = 32 }: { name: Icone | 'mail' | 'document'; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
      {name === 'baie' && (
        <>
          <rect {...ligne} x="4" y="4" width="24" height="7" />
          <rect {...ligne} x="4" y="13" width="24" height="7" />
          <rect {...ligne} x="4" y="22" width="24" height="7" />
          <circle cx="8" cy="7.5" r="1" fill="var(--coral)" />
          <circle cx="8" cy="16.5" r="1" fill="var(--teal)" />
          <circle cx="8" cy="25.5" r="1" fill="var(--coral)" />
        </>
      )}
      {name === 'reseau' && (
        <>
          <rect {...ligne} x="12" y="3" width="8" height="6" />
          <rect {...ligne} x="3" y="23" width="8" height="6" />
          <rect {...ligne} x="21" y="23" width="8" height="6" />
          <path {...ligne} d="M16 9 V16 M7 23 V16 H25 V23" />
          <circle cx="16" cy="16" r="1.5" fill="var(--teal)" />
        </>
      )}
      {name === 'bouclier' && (
        <>
          <path {...ligne} d="M16 3 L27 7 V15 C27 22 22 27 16 29 C10 27 5 22 5 15 V7 Z" />
          <path {...ligne} d="M11 16 L15 20 L21 12" />
        </>
      )}
      {name === 'terminal' && (
        <>
          <rect {...ligne} x="3" y="5" width="26" height="22" />
          <path {...ligne} d="M3 10 H29 M8 15 L12 18 L8 21 M14 21 H20" />
          <circle cx="6" cy="7.5" r="1" fill="var(--coral)" />
        </>
      )}
      {name === 'mail' && (
        <>
          <rect {...ligne} x="3" y="7" width="26" height="18" />
          <path {...ligne} d="M3 7 L16 18 L29 7" />
        </>
      )}
      {name === 'document' && (
        <>
          <path {...ligne} d="M7 3 H20 L25 8 V29 H7 Z M20 3 V8 H25" />
          <path {...ligne} d="M11 14 H21 M11 18 H21 M11 22 H17" />
        </>
      )}
    </svg>
  );
}
