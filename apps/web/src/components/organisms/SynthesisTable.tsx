import { colonnesSynthese, enteteSynthese, groupesSynthese, profil } from '@portfolio/content';
import { RichText } from '../atoms/RichText';

const cellule = 'border-hair border-ink p-2 align-top print:border-black print:p-1';

/**
 * Tableau de synthèse E5 au format du modèle officiel (Annexe 6-1).
 * Pas d'animation ici : le tableau doit s'imprimer en entier.
 */
export function SynthesisTable() {
  return (
    <div className="flex flex-col gap-gutter">
      <dl className="grid gap-x-8 gap-y-2 border-frame border-ink bg-panel p-6 text-body sm:grid-cols-2 print:border-black print:p-2 print:text-[10px]">
        <div>
          <dt className="inline font-bold">NOM et prénom : </dt>
          <dd className="inline">{enteteSynthese.nom}</dd>
        </div>
        <div>
          <dt className="inline font-bold">N° candidat : </dt>
          <dd className="inline">
            <RichText text={enteteSynthese.numeroCandidat} />
          </dd>
        </div>
        <div>
          <dt className="inline font-bold">Centre de formation : </dt>
          <dd className="inline">{enteteSynthese.centre}</dd>
        </div>
        <div>
          <dt className="inline font-bold">Option : </dt>
          <dd className="inline">☒ SISR ☐ SLAM</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="inline font-bold">Adresse URL du portfolio : </dt>
          <dd className="inline break-all">
            <a href={profil.urlPortfolio} className="underline">
              {profil.urlPortfolio}
            </a>
          </dd>
        </div>
      </dl>

      <div className="overflow-x-auto border-frame border-ink bg-panel print:overflow-visible print:border-0">
        <table className="w-full min-w-[980px] border-collapse text-[13px] print:min-w-0 print:text-[8px]">
          <caption className="sr-only">{enteteSynthese.titre}</caption>
          <thead>
            <tr>
              <th scope="col" className={`${cellule} w-[28%] bg-blush text-left print:bg-white`}>
                Réalisations professionnelles
                <span className="block font-normal text-ink-soft">(intitulé et liste des documents et productions associés)</span>
              </th>
              <th scope="col" className={`${cellule} w-[9%] bg-blush print:bg-white`}>
                Période
                <span className="block font-normal text-ink-soft">(du JJ/MM/AA au JJ/MM/AA)</span>
              </th>
              {colonnesSynthese.map((c) => (
                <th key={c.titre} scope="col" className={`${cellule} bg-blush print:bg-white`}>
                  {c.titre}
                  <ul className="mt-2 text-left text-[11px] font-normal text-ink-soft print:text-[7px] print:text-black">
                    {c.items.map((it) => (
                      <li key={it}>▸ {it}</li>
                    ))}
                  </ul>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groupesSynthese.map((g) => [
              <tr key={g.titre}>
                <th colSpan={8} scope="colgroup" className={`${cellule} bg-floor text-center font-display text-[12px] uppercase print:bg-gray-200 print:text-[8px]`}>
                  {g.titre}
                </th>
              </tr>,
              ...g.lignes.map((l, i) => (
                <tr key={`${g.titre}-${i}`}>
                  <td className={cellule}>
                    <RichText text={l.intitule} />
                    {l.documents && <span className="block text-ink-soft print:text-black">{l.documents}</span>}
                  </td>
                  <td className={`${cellule} whitespace-nowrap text-center`}>
                    <RichText text={l.periode} />
                  </td>
                  {l.croix.map((coche, j) => (
                    <td key={j} className={`${cellule} text-center font-display text-[15px] text-coral-text print:text-black`}>
                      {coche ? 'X' : ''}
                      <span className="sr-only">{coche ? 'compétence mobilisée' : ''}</span>
                    </td>
                  ))}
                </tr>
              )),
            ])}
          </tbody>
        </table>
      </div>
    </div>
  );
}
