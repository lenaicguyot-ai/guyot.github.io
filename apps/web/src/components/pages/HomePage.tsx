import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { AtelierSection } from '../organisms/AtelierSection';
import { BtsSection } from '../organisms/BtsSection';
import { CandidatSection } from '../organisms/CandidatSection';
import { ContactSection } from '../organisms/ContactSection';
import { EcoleSection } from '../organisms/EcoleSection';
import { EntrepriseSection } from '../organisms/EntrepriseSection';
import { EpreuvesSection } from '../organisms/EpreuvesSection';
import { Hero } from '../organisms/Hero';
import { VeilleSection } from '../organisms/VeilleSection';

/** Page d'accueil, dans l'ordre de la trame de l'école : Accueil, Épreuves, Atelier pro, Veille. */
export function HomePage() {
  useDocumentTitle();
  const location = useLocation();
  const cible = (location.state as { scrollTo?: string } | null)?.scrollTo;

  // Arrivée depuis une autre page avec une section à afficher (ex. « ← Retour » d'une fiche).
  useEffect(() => {
    if (!cible) return;
    const t = window.setTimeout(() => {
      document.getElementById(cible)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 350);
    return () => window.clearTimeout(t);
  }, [cible, location.key]);

  return (
    <>
      <Hero />
      <CandidatSection />
      <BtsSection />
      <EntrepriseSection />
      <EcoleSection />
      <EpreuvesSection />
      <AtelierSection />
      <VeilleSection />
      <ContactSection />
    </>
  );
}
