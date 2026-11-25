import { profil } from '@portfolio/content';
import { ButtonLink } from '../atoms/Button';
import { CloudArt } from '../atoms/Illustrations';
import { Reveal } from '../atoms/Reveal';
import { Burst } from '../molecules/SpeechBubble';
import { Panel } from '../molecules/Panel';
import { SectionLayout } from '../templates/SectionLayout';

export function ContactSection() {
  return (
    <SectionLayout id="contact" number="08" title="Travaillons ensemble">
      <Reveal stagger className="grid gap-gutter md:grid-cols-[2fr_1fr]">
        <Panel variant="paper" bodyClassName="gap-6 p-6 md:p-10">
          <p className="text-subtitle text-ink">Une opportunité, un projet, une question sur mon parcours ? Écris-moi.</p>
          <div className="flex flex-wrap gap-gutter">
            <ButtonLink variant="accent" href={`mailto:${profil.email}`}>
              Écrire un e-mail
            </ButtonLink>
            <ButtonLink href={profil.linkedin} target="_blank" rel="noopener">
              Voir mon LinkedIn
            </ButtonLink>
          </div>
          <p className="text-body text-ink">
            E-mail : <a className="font-bold underline hover:text-coral-text" href={`mailto:${profil.email}`}>{profil.email}</a>
          </p>
        </Panel>
        <Panel variant="halftone" className="relative overflow-visible" bodyClassName="items-center justify-center gap-4 p-6">
          <CloudArt className="w-32" />
          <Burst text="Écris-moi !"className="absolute -right-3 -top-5" />
          <p className="text-center font-hand text-bubble-sm uppercase text-ink">Alternance 2025-2027</p>
        </Panel>
      </Reveal>
    </SectionLayout>
  );
}
