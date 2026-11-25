import { Tag, type TagVariant } from '../atoms/Tag';

/** Liste d'étiquettes (outils, compétences, certifications). */
export function TagList({ items, variant = 'outline' }: { items: string[]; variant?: TagVariant }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item}>
          <Tag variant={variant}>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
