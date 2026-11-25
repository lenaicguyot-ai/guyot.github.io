import { useEffect } from 'react';

const SUFFIXE = 'Lénaïc Guyot | Portfolio BTS SIO SISR';

export function useDocumentTitle(titre?: string) {
  useEffect(() => {
    document.title = titre ? `${titre} | ${SUFFIXE}` : SUFFIXE;
  }, [titre]);
}
