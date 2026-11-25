import { TwoToneTitle } from '../atoms/TwoToneTitle';
import { Reveal } from '../atoms/Reveal';

interface SectionTitleProps {
  number: string;
  title: string;
  subtitle?: string;
  id?: string;
}

/** Ouverture de section : numéro en Michroma turquoise texte, titre bicolore, sous-titre facultatif. */
export function SectionTitle({ number, title, subtitle, id }: SectionTitleProps) {
  return (
    <Reveal className="mb-6 flex items-end gap-4 md:mb-8 md:gap-6">
      <span className="font-display text-section-number text-teal-text" aria-hidden="true">
        {number}
      </span>
      <div className="flex flex-col gap-2 pb-1">
        <TwoToneTitle id={id} text={title} className="text-h1" />
        {subtitle && <p className="text-body text-ink-soft">{subtitle}</p>}
      </div>
    </Reveal>
  );
}
