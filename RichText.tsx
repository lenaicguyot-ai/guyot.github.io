import { Fragment } from 'react';
import { Tag } from './Tag';

/**
 * Affiche un texte du contenu. Tout passage entre crochets est un contenu manquant :
 * « [À REMPLIR : dates] » devient le tag À REMPLIR suivi de l'indication « dates » en corail.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g).filter((p) => p !== '');
  return (
    <>
      {parts.map((part, i) => {
        if (!part.startsWith('[') || !part.endsWith(']')) return <Fragment key={i}>{part}</Fragment>;
        const hint = part
          .slice(1, -1)
          .replace(/^(à remplir|à compléter)\s*:?\s*/i, '')
          .trim();
        return (
          <span key={i} className="inline-flex flex-wrap items-baseline gap-x-2 align-baseline">
            <Tag variant="todo">À remplir</Tag>
            {hint && <span className="text-coral-text">{hint}</span>}
          </span>
        );
      })}
    </>
  );
}

/** Vrai si le texte ne contient qu'un contenu manquant. */
export const estAFaire = (text: string) => /^\s*\[[^\]]+\]\s*$/.test(text);
