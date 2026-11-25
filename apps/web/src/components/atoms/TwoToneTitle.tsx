import type { ElementType } from 'react';
import { cx } from '../../lib/cx';

interface TwoToneTitleProps {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
}

/**
 * Titre bicolore de la maquette : premiers mots en encre, dernier mot en corail texte.
 * « Mes épreuves » → MES <corail>ÉPREUVES</corail>.
 */
export function TwoToneTitle({ text, as: Tag = 'h2', className, id }: TwoToneTitleProps) {
  const i = text.trim().lastIndexOf(' ');
  const debut = i === -1 ? '' : text.slice(0, i + 1);
  const fin = i === -1 ? text : text.slice(i + 1);
  return (
    <Tag id={id} className={cx('font-display uppercase text-ink', className)}>
      {debut}
      <span className="text-coral-text">{fin}</span>
    </Tag>
  );
}
