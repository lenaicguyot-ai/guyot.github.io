import type { Projet } from '@portfolio/content';
import { ButtonRoute } from '../atoms/Button';
import { Halftone } from '../atoms/Halftone';
import { Reveal } from '../atoms/Reveal';
import { RichText } from '../atoms/RichText';
import { Tag } from '../atoms/Tag';
import { TwoToneTitle } from '../atoms/TwoToneTitle';
import { Panel } from '../molecules/Panel';
import { SectionTitle } from '../molecules/SectionTitle';
import { StepItem } from '../molecules/StepItem';
import { TagList } from '../molecules/TagList';

const ancre = (categorie: Projet['categorie']) => (categorie === 'atelier' ? 'atelier' : 'epreuves');

/** Fiche détaillée d'une épreuve ou d'un atelier, découpée en cases. */
export function ProjectDetail({ projet }: { projet: Projet }) {
  const retour = ancre(projet.categorie);

  return (
    <article className="px-4 pt-gutter md:px-page">
      <div className="mx-auto max-w-planche">
        <Reveal stagger className="grid gap-gutter md:grid-cols-[1fr_220px]">
          <Panel bodyClassName="gap-6 p-6 md:p-10">
            <Tag variant="solid" className="self-start">
              {projet.badge}
            </Tag>
            <TwoToneTitle as="h1" text={projet.titre} className="text-h1" />
            {projet.lead && <p className="max-w-[65ch] text-subtitle text-ink">{projet.lead}</p>}
            <ButtonRoute to="/" state={{ scrollTo: retour }} className="self-start">
              ← Retour
            </ButtonRoute>
          </Panel>
          <Panel className="hidden md:flex" bodyClassName="p-0">
            <Halftone className="flex flex-1 items-center justify-center">
              <span className="flex h-20 w-20 items-center justify-center border-frame border-ink bg-panel font-display text-h3 text-ink">
                {projet.code}
              </span>
            </Halftone>
          </Panel>
        </Reveal>

        <div className="mt-16 flex flex-col gap-16">
          <section>
            <SectionTitle number="01" title="Le contexte" />
            <Reveal stagger className="grid gap-gutter md:grid-cols-2">
              <Panel title="Contexte">
                {projet.contexte.map((c) => (
                  <p key={c} className="text-body text-ink">
                    <RichText text={c} />
                  </p>
                ))}
              </Panel>
              <Panel title="Besoin" variant="paper">
                {projet.besoins.length > 1 ? (
                  <TagList items={projet.besoins} />
                ) : (
                  projet.besoins.map((b) => (
                    <p key={b} className="text-body text-ink">
                      <RichText text={b} />
                    </p>
                  ))
                )}
                {projet.contraintes && (
                  <p className="text-body text-ink">
                    <strong className="font-bold">Contraintes : </strong>
                    <RichText text={projet.contraintes} />
                  </p>
                )}
              </Panel>
            </Reveal>
          </section>

          <section>
            <SectionTitle number="02" title="La solution" />
            {projet.etapes.length > 0 && (
              <Reveal stagger>
                <ol className="flex flex-col gap-gutter">
                  {projet.etapes.map((e, i) => (
                    <StepItem key={e.titre} index={i + 1} etape={e} />
                  ))}
                </ol>
              </Reveal>
            )}
            {projet.noteEtapes && (
              <p className="mt-4 text-body text-ink">
                <RichText text={projet.noteEtapes} />
              </p>
            )}
          </section>

          <section>
            <SectionTitle number="03" title="Le résultat" />
            <Reveal stagger className="grid gap-gutter md:grid-cols-2">
              <Panel title="Résultat" variant="paper" className="md:col-span-2">
                <p className="text-subtitle text-ink">
                  <RichText text={projet.resultat} />
                </p>
              </Panel>
              <Panel title="Outils">
                {projet.outils.length > 0 ? <TagList items={projet.outils} /> : <RichText text="[À REMPLIR : outils utilisés]" />}
              </Panel>
              <Panel title="Documents" variant="halftone">
                <ul className="flex flex-col gap-2 text-body">
                  {projet.documents.map((d) => (
                    <li key={d.label}>
                      {d.href ? (
                        <a href={d.href} className="font-bold underline hover:text-coral-text">
                          {d.label}
                        </a>
                      ) : (
                        <RichText text={d.label} />
                      )}
                    </li>
                  ))}
                </ul>
              </Panel>
              {projet.competences.length > 0 ? (
                projet.competences.map((c) => (
                  <Panel key={c.titre} title={c.titre}>
                    <p className="text-body text-ink">
                      <RichText text={c.texte} />
                    </p>
                  </Panel>
                ))
              ) : (
                <Panel title="Compétences mobilisées" className="md:col-span-2">
                  <p className="text-body text-ink">
                    <RichText text="[À REMPLIR : lien avec le référentiel SISR]" />
                  </p>
                </Panel>
              )}
            </Reveal>
          </section>
        </div>
      </div>
    </article>
  );
}
