import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Le routeur utilise le # de l'URL (HashRouter, compatible GitHub Pages) :
 * les ancres classiques (#epreuves) ne marchent donc pas. Ce hook fait défiler
 * jusqu'à une section, en revenant d'abord à l'accueil si besoin.
 */
export function useScrollToSection() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useCallback(
    (id: string) => {
      if (pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        navigate('/', { state: { scrollTo: id } });
      }
    },
    [navigate, pathname],
  );
}
