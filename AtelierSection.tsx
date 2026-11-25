import { projets } from '@portfolio/content';
import { ChapterTile } from '../molecules/ChapterTile';
import { SectionLayout } from '../templates/SectionLayout';

export function AtelierSection() {
  const ateliers = projets.filter((p) => p.categorie === 'atelier');
  return (
    <SectionLayout id="atelier" number="06" title="Atelier pro" subtitle="Projets réalisés à l'école, H3 Hitema">
      <div className="grid gap-gutter sm:grid-cols-2">
        {ateliers.map((p) => (
          <ChapterTile
            key={p.slug}
            to={`/projets/${p.slug}`}
            code={p.code}
            badge={p.badge}
            title={p.titre}
            meta={p.meta}
            resume={p.resume}
          />
        ))}
      </div>
    </SectionLayout>
  );
}
