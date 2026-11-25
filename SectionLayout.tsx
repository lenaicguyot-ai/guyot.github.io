import type { ReactNode } from 'react';
import { SectionTitle } from '../molecules/SectionTitle';

interface SectionLayoutProps {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

/** Gabarit d'une section de la page d'accueil : marges de planche + titre numéroté. */
export function SectionLayout({ id, number, title, subtitle, children }: SectionLayoutProps) {
  return (
    <section id={id} aria-labelledby={`titre-${id}`} className="scroll-mt-24 px-4 pt-16 md:px-page md:pt-24">
      <div className="mx-auto max-w-planche">
        <SectionTitle id={`titre-${id}`} number={number} title={title} subtitle={subtitle} />
        {children}
      </div>
    </section>
  );
}
