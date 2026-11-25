import { enteteSynthese } from '@portfolio/content';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Button, ButtonRoute } from '../atoms/Button';
import { Tag } from '../atoms/Tag';
import { TwoToneTitle } from '../atoms/TwoToneTitle';
import { SynthesisTable } from '../organisms/SynthesisTable';

export function SynthesisPage() {
  useDocumentTitle('Tableau de synthèse');
  return (
    <section className="px-4 pt-gutter md:px-page print:p-0">
      <div className="mx-auto max-w-planche">
        <div className="mb-6 flex flex-col gap-4 border-frame border-ink bg-panel p-6 md:p-10 print:mb-2 print:border-0 print:p-0">
          <Tag className="self-start print:hidden">{enteteSynthese.session}</Tag>
          <p className="hidden text-[10px] print:block">{enteteSynthese.session}</p>
          <TwoToneTitle as="h1" text={enteteSynthese.titre} className="text-h2 print:text-[16px]" />
          <div className="no-print flex flex-wrap gap-gutter">
            <Button variant="primary" onClick={() => window.print()}>
              Imprimer ou enregistrer en PDF
            </Button>
            <ButtonRoute to="/" state={{ scrollTo: 'epreuves' }}>
              ← Retour aux épreuves
            </ButtonRoute>
          </div>
        </div>
        <SynthesisTable />
      </div>
    </section>
  );
}
