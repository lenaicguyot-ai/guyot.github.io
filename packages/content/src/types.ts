/**
 * Convention : un texte entre crochets, par exemple « [À REMPLIR : dates] »,
 * est un contenu manquant. Le site l'affiche avec le tag « À REMPLIR ».
 */

export type Categorie = 'e5' | 'e6' | 'atelier';

export interface Etape {
  titre: string;
  texte: string;
  code?: string;
}

export interface Bloc {
  titre: string;
  texte: string;
}

export interface Lien {
  label: string;
  href?: string;
}

export interface Projet {
  slug: string;
  categorie: Categorie;
  /** Code court affiché dans la tuile tramée (E5, E6, AP). */
  code: string;
  badge: string;
  titre: string;
  meta: string;
  resume: string;
  lead?: string;
  contexte: string[];
  besoins: string[];
  contraintes?: string;
  etapes: Etape[];
  noteEtapes?: string;
  outils: string[];
  resultat: string;
  competences: Bloc[];
  documents: Lien[];
}

export type Icone = 'baie' | 'reseau' | 'bouclier' | 'terminal';

export interface GroupeCompetences {
  titre: string;
  icone: Icone;
  items: string[];
}

export interface EtapeParcours {
  periode: string;
  titre: string;
}

export interface ArticleVeille {
  titre: string;
  contexte: string;
  solution: string;
  resultat: string;
}

export interface ItemVeille {
  date: string;
  titre: string;
  source: string;
  href?: string;
}

/** Une case par colonne de compétences du tableau de synthèse (6 colonnes). */
export type Croix = [boolean, boolean, boolean, boolean, boolean, boolean];

export interface LigneSynthese {
  intitule: string;
  documents?: string;
  periode: string;
  croix: Croix;
}

export interface GroupeSynthese {
  titre: string;
  lignes: LigneSynthese[];
}

export interface ColonneSynthese {
  titre: string;
  items: string[];
}
