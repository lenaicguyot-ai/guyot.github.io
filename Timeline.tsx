import type { EtapeParcours } from '@portfolio/content';

/** Chronologie : période en corail texte à gauche, intitulé à droite. Ordre antichronologique. */
export function Timeline({ title, items }: { title: string; items: EtapeParcours[] }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-sans text-label font-bold uppercase text-ink">{title}</span>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.periode + item.titre} className="grid grid-cols-[88px_minmax(0,1fr)] gap-gutter text-body">
            <span className="font-bold text-coral-text">{item.periode}</span>
            <span className="text-ink">{item.titre}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
