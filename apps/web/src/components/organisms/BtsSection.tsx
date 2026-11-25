import { bts } from '@portfolio/content';
import { Reveal } from '../atoms/Reveal';
import { Tag } from '../atoms/Tag';
import { Panel } from '../molecules/Panel';
import { SectionLayout } from '../templates/SectionLayout';

export function BtsSection() {
  return (
    <SectionLayout id="bts" number="02" title="Le BTS SIO" subtitle="Services informatiques aux organisations">
      <Reveal stagger className="grid gap-gutter md:grid-cols-2">
        <Panel className="md:col-span-2" variant="paper">
          <p className="text-subtitle text-ink">{bts.intro}</p>
        </Panel>
        {bts.options.map((o, i) => (
          <Panel key={o.titre} title={o.titre}>
            {i === 0 && <Tag variant="solid" className="self-start">Mon option</Tag>}
            <p className="text-body text-ink">{o.texte}</p>
          </Panel>
        ))}
      </Reveal>
      <Reveal stagger className="mt-gutter grid gap-gutter md:grid-cols-3">
        {bts.blocs.map((b) => (
          <Panel key={b.titre} title={b.titre} variant="halftone">
            <p className="text-body text-ink">{b.texte}</p>
          </Panel>
        ))}
      </Reveal>
    </SectionLayout>
  );
}
