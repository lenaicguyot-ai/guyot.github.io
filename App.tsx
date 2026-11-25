import { HashRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/pages/HomePage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { ProjectPage } from './components/pages/ProjectPage';
import { SynthesisPage } from './components/pages/SynthesisPage';
import { PageLayout } from './components/templates/PageLayout';

/**
 * HashRouter : les adresses ressemblent à /#/projets/atelier-glpi.
 * GitHub Pages ne sait pas rediriger les autres adresses vers index.html, le # évite les erreurs 404.
 */
export function App() {
  return (
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="projets/:slug" element={<ProjectPage />} />
          <Route path="tableau-synthese" element={<SynthesisPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
