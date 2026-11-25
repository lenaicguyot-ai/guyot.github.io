import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { ButtonRoute } from '../atoms/Button';
import { Halftone } from '../atoms/Halftone';
import { TwoToneTitle } from '../atoms/TwoToneTitle';
import { SpeechBubble } from '../molecules/SpeechBubble';

export function NotFoundPage() {
  useDocumentTitle('Page introuvable');
  return (
    <section className="px-4 pt-gutter md:px-page">
      <div className="mx-auto grid max-w-planche gap-gutter md:grid-cols-2">
        <div className="flex flex-col gap-6 border-frame border-ink bg-panel p-6 md:p-10">
          <span className="font-display text-section-number text-teal-text">404</span>
          <TwoToneTitle as="h1" text="Page introuvable" className="text-h2" />
          <p className="text-body text-ink">Cette case n'existe pas dans la planche.</p>
          <ButtonRoute to="/" variant="primary" className="self-start">
            Revenir à l'accueil
          </ButtonRoute>
        </div>
        <Halftone className="hidden min-h-[260px] items-center justify-center border-frame border-ink md:flex">
          <SpeechBubble text="Perdu ?" />
        </Halftone>
      </div>
    </section>
  );
}
