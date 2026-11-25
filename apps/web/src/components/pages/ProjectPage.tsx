import { trouverProjet } from '@portfolio/content';
import { useParams } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { ProjectDetail } from '../organisms/ProjectDetail';
import { NotFoundPage } from './NotFoundPage';

export function ProjectPage() {
  const { slug = '' } = useParams();
  const projet = trouverProjet(slug);
  useDocumentTitle(projet?.titre);

  if (!projet) return <NotFoundPage />;
  return <ProjectDetail projet={projet} />;
}
