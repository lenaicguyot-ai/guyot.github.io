import { veille } from '@portfolio/content';
import { Reveal } from '../atoms/Reveal';
import { RichText } from '../atoms/RichText';
import { Tag } from '../atoms/Tag';
import { Panel } from '../molecules/Panel';
import { TagList } from '../molecules/TagList';
import { SectionLayout } from '../templates/SectionLayout';

const { article } = veille;

export function VeilleSection() {
  return (
    <SectionLayout id="veille" number="07" title="Veille et RGPD" subtitle="Veille technologique et juridique">
      <Reveal stagger className="grid gap-gutter md:grid-cols-2">
        <Panel title="Thème" variant="paper">
          <p className="text-subtitle text-ink">{veille.theme}</p>
        </Panel>
        <Panel title="Sources et méthode">
          <p className="text-body text-ink">
            <RichText text={veille.sources} />
          </p>
        </Panel>
        <Panel title="Fil de veille" className="md:col-span-2">
          <ul>
            {veille.fil.map((item, i) => (
              <li key={i} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b-hair border-ink py-2 text-body">
                <span className="font-bold text-coral-text">
                  <RichText text={item.date} />
                </span>
                <span className="text-ink">
                  <RichText text={item.titre} />
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </Reveal>

      <Reveal className="mt-gutter">
        <article className="border-frame border-ink bg-panel">
          <div className="border-b-frame border-ink p-6 md:p-10">
            <Tag variant="solid">{article.surtitre}</Tag>
            <h3 className="mt-4 font-display text-h3 uppercase text-ink">{article.titre}</h3>
            <p className="mt-4 max-w-[70ch] text-body text-ink">{article.intro}</p>
          </div>
          <div className="grid gap-px bg-ink md:grid-cols-2">
            {article.sections.map((s) => (
              <section key={s.titre} className="flex flex-col gap-3 bg-panel p-6">
                <h4 className="font-hand text-bubble-sm uppercase text-ink">{s.titre}</h4>
                <dl className="flex flex-col gap-2 text-body">
                  <div>
                    <dt className="font-sans text-caption font-bold uppercase text-ink-soft">Contexte</dt>
                    <dd className="text-ink">{s.contexte}</dd>
                  </div>
                  <div>
                    <dt className="font-sans text-caption font-bold uppercase text-ink-soft">Solution</dt>
                    <dd className="text-ink">{s.solution}</dd>
                  </div>
                  <div>
                    <dt className="font-sans text-caption font-bold uppercase text-coral-text">Résultat</dt>
                    <dd className="text-ink">{s.resultat}</dd>
                  </div>
                </dl>
              </section>
            ))}
            <section className="flex flex-col gap-3 bg-paper p-6">
              <h4 className="font-hand text-bubble-sm uppercase text-ink">Compétences mobilisées</h4>
              <TagList items={article.competences} />
              <p className="mt-auto text-body text-ink">{article.conclusion}</p>
            </section>
          </div>
        </article>
      </Reveal>
    </SectionLayout>
  );
}
