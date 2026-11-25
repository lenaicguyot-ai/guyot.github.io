import { competences, entreprise } from '@portfolio/content';
import { Reveal } from '../atoms/Reveal';
import { InfoTile } from '../molecules/InfoTile';
import { Panel } from '../molecules/Panel';
import { TagList } from '../molecules/TagList';
import { SectionLayout } from '../templates/SectionLayout';

export function EntrepriseSection() {
  return (
    <SectionLayout id="entreprise" number="03" title="Entreprise et rôle" subtitle="Mon alternance chez WAAT">
      <Reveal stagger className="grid gap-gutter md:grid-cols-2">
        <Panel title={entreprise.nom}>
          <p className="text-body text-ink">{entreprise.description}</p>
        </Panel>
        <Panel title="Mon rôle">
          {entreprise.role.map((r) => (
            <p key={r} className="text-body text-ink">
              {r}
            </p>
          ))}
        </Panel>
      </Reveal>
      <h3 className="mb-4 mt-10 font-hand text-bubble uppercase text-ink">Outils et pratiques</h3>
      <Reveal stagger className="grid gap-gutter sm:grid-cols-2 lg:grid-cols-4">
        {competences.map((g) => (
          <InfoTile key={g.titre} icon={g.icone} label={g.titre}>
            <TagList items={g.items} />
          </InfoTile>
        ))}
      </Reveal>
    </SectionLayout>
  );
}
