import { experience, formation, profil } from '@portfolio/content';
import { ButtonLink } from '../atoms/Button';
import { Reveal } from '../atoms/Reveal';
import { Panel } from '../molecules/Panel';
import { Timeline } from '../molecules/Timeline';
import { SectionLayout } from '../templates/SectionLayout';

const CV_URL = `${import.meta.env.BASE_URL}CV.pdf`;

export function CandidatSection() {
  return (
    <SectionLayout id="candidat" number="01" title="Le candidat" subtitle="Présentation, parcours et CV">
      <Reveal stagger className="grid gap-gutter lg:grid-cols-3">
        <Panel title="Qui suis-je" className="lg:col-span-2">
          {profil.presentation.map((p) => (
            <p key={p} className="text-body text-ink">
              {p}
            </p>
          ))}
        </Panel>
        <Panel title="Mon CV" variant="halftone">
          <p className="text-body text-ink">Formation, expériences et compétences à jour.</p>
          <ButtonLink variant="primary" href={CV_URL} target="_blank" rel="noopener" className="mt-auto self-start">
            Télécharger le CV
          </ButtonLink>
        </Panel>
        <Panel title="Parcours" className="lg:col-span-3" bodyClassName="gap-6 p-6">
          <div className="grid gap-8 md:grid-cols-2">
            <Timeline title="Formation" items={formation} />
            <Timeline title="Expérience" items={experience} />
          </div>
        </Panel>
      </Reveal>
    </SectionLayout>
  );
}
