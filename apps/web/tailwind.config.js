/**
 * Thème Tailwind branché sur les tokens de la maquette (src/styles/tokens.css).
 * Les couleurs et polices pointent vers les variables CSS : modifier tokens.css suffit.
 * Tailles de titres en clamp() pour le responsive : la valeur max est celle du deck.
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      nav: '720px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        paper: 'var(--paper)',
        panel: 'var(--panel)',
        floor: 'var(--floor)',
        baseboard: 'var(--baseboard)',
        'page-manga': 'var(--page-manga)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        coral: 'var(--coral)',
        teal: 'var(--teal)',
        'coral-text': 'var(--coral-text)',
        'teal-text': 'var(--teal-text)',
      },
      fontFamily: {
        display: ['Michroma', 'Lato', 'sans-serif'],
        sans: ['Lato', 'system-ui', 'sans-serif'],
        hand: ['"Patrick Hand"', 'Lato', 'cursive'],
        mono: ['"Roboto Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['clamp(34px, 7vw, 59px)', { lineHeight: '1' }],
        'section-number': ['clamp(36px, 6vw, 64px)', { lineHeight: '1' }],
        h1: ['clamp(26px, 5vw, 48px)', { lineHeight: '1.05' }],
        h2: ['clamp(22px, 4vw, 40px)', { lineHeight: '1.05' }],
        h3: ['clamp(18px, 3vw, 32px)', { lineHeight: '1.1' }],
        bubble: ['clamp(22px, 2.6vw, 28px)', { lineHeight: '1' }],
        'bubble-sm': ['21px', { lineHeight: '1' }],
        subtitle: ['clamp(17px, 2vw, 21px)', { lineHeight: '1.3' }],
        label: ['15px', { lineHeight: '1.2' }],
        body: ['16px', { lineHeight: '1.5' }],
        caption: ['11px', { lineHeight: '1.2' }],
        code: ['13px', { lineHeight: '1.5' }],
      },
      spacing: {
        gutter: 'var(--gutter)',
        page: 'var(--page-margin)',
        control: 'var(--control-height)',
        floor: 'var(--floor-height)',
      },
      borderWidth: {
        frame: 'var(--stroke-frame)',
        hair: 'var(--stroke-hair)',
        // « plinthe » et non « baseboard » : ce nom est déjà une couleur (conflit de classe).
        plinthe: 'var(--baseboard-height)',
      },
      maxWidth: {
        planche: '1280px',
      },
    },
  },
  plugins: [],
};
