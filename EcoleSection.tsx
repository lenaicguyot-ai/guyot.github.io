import { certifications, ecole } from '@portfolio/content';
import { Reveal } from '../atoms/Reveal';
import { Tag } from '../atoms/Tag';
import { Panel } from '../molecules/Panel';
import { SectionLayout } from '../templates/SectionLayout';

export function EcoleSection() {
  return (
    <SectionLayout id="ecole" number="04" title="École et certifications">
      <Reveal stagger className="grid gap-gutter md:grid-cols-2">
        <Panel title={ecole.nom} variant="halftone">
          <p className="text-body text-ink">{ecole.texte}</p>
        </Panel>
        <Panel title="Certifications">
          <p className="text-body text-ink">{certifications.intro}</p>
          <ul className="flex flex-col">
            {certifications.liste.map((c) => (
              <li key={c} className="flex items-center justify-between gap-4 border-b-hair border-ink py-2">
                <span className="font-sans text-label font-bold uppercase text-ink">{c}</span>
                <Tag variant="planned">Prévu</Tag>
              </li>
            ))}
          </ul>
        </Panel>
      </Reveal>
    </SectionLayout>
  );
}
