import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { useState } from 'react';
import { projets } from '@portfolio/content';
import { cx } from '../../lib/cx';
import { ButtonRoute } from '../atoms/Button';
import { ChapterTile } from '../molecules/ChapterTile';
import { SectionLayout } from '../templates/SectionLayout';

type Filtre = 'tous' | 'e5' | 'e6';

const FILTRES: { id: Filtre; label: string }[] = [
  { id: 'tous', label: 'Tous' },
  { id: 'e5', label: 'E5' },
  { id: 'e6', label: 'E6' },
];

export function EpreuvesSection() {
  const [filtre, setFiltre] = useState<Filtre>('tous');
  const liste = projets.filter((p) => p.categorie !== 'atelier' && (filtre === 'tous' || p.categorie === filtre));

  return (
    <SectionLayout id="epreuves" number="05" title="Mes épreuves" subtitle="E5 : support et mise à disposition · E6 : administration des systèmes et des réseaux">
      <div className="mb-6 flex flex-wrap items-center gap-gutter">
        <div role="group" aria-label="Filtrer les épreuves" className="flex gap-gutter">
          {FILTRES.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filtre === f.id}
              onClick={() => setFiltre(f.id)}
              className={cx(
                'h-10 border-frame border-ink px-4 font-sans text-label font-bold uppercase',
                filtre === f.id ? 'bg-ink text-panel' : 'bg-panel text-ink hover:bg-paper',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <ButtonRoute to="/tableau-synthese" variant="primary" className="sm:ml-auto">
          Voir le tableau de synthèse
        </ButtonRoute>
      </div>

      <LayoutGroup>
        <div className="grid gap-gutter sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {liste.map((p) => (
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
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </SectionLayout>
  );
}
