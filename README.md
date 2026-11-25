# Portfolio BTS SIO SISR · Lénaïc Guyot

Portfolio organisé selon la trame de l'école (Accueil, Épreuves, Atelier pro, Veille), avec la direction artistique « planche de manga dans une chambre rose » (dossier `design-system/`).

## Stack

| Besoin | Choix | Pourquoi |
|---|---|---|
| Interface | React 18 + Vite | Léger et rapide pour un petit projet (pas de Next.js) |
| Langage | TypeScript (strict) | Erreurs détectées avant la mise en ligne |
| Styles | Tailwind CSS 3 | Branché sur les tokens de la maquette (`src/styles/tokens.css`) |
| Animations | Framer Motion | Apparition des cases, bulles, filtre des épreuves, transitions de pages |
| Animation | PixiJS 7 | Scène du katana et des pots dans l'accueil, chargée à part (la baie serveur est en 3D CSS) |
| Organisation | Atomic design + monorepo npm workspaces | Composants réutilisables, contenu séparé du code |
| Back-end | Aucun pour l'instant | Voir plus bas |

## Structure

```
portfolio-react/
├── apps/web/                    Le site (React)
│   └── src/components/
│       ├── atoms/               Button, Tag, Halftone, TwoToneTitle, Icon, Illustrations, Reveal…
│       ├── molecules/           Panel, SectionTitle, SpeechBubble, ChapterTile, InfoTile, Timeline…
│       ├── organisms/           Nav, Floor, Hero, RackSpin (baie 3D CSS), KatanaScene (PixiJS), Sommaire, sections, ProjectDetail, SynthesisTable
│       ├── templates/           PageLayout, SectionLayout
│       └── pages/               HomePage, ProjectPage, SynthesisPage, NotFoundPage
├── packages/content/            Tous les textes du site (TypeScript typé)
├── design-system/               README et tokens de la maquette (référence)
└── .github/workflows/deploy.yml Publication automatique sur GitHub Pages
```

## Modifier un texte

Tout le contenu est dans `packages/content/src/` :

- `profil.ts` : présentation, parcours, BTS, entreprise, compétences, école, certifications
- `projets.ts` : fiches E5, E6 et ateliers (contexte, étapes, commandes, résultat)
- `veille.ts` : veille et article sur les fuites de données
- `synthese.ts` : tableau de synthèse E5 (une croix = numéro de colonne dans `x(...)`)

Un contenu manquant s'écrit entre crochets : `'[À REMPLIR : dates]'`. Le site l'affiche avec le tag « À REMPLIR », comme le demande la maquette.

## Lancer en local

Il faut Node.js 20 ou plus.

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # vérification TypeScript
npm run build      # version de production dans apps/web/dist
```

## Mise en ligne (GitHub Pages)

1. Mettre ce dossier à la racine du dépôt `guyot.github.io`, sur la branche `main`.
2. Sur GitHub : **Settings → Pages → Source : GitHub Actions** (une seule fois).
3. Chaque push sur `main` compile et publie le site. Le CV est pris dans `CV.pdf` à la racine du dépôt.

Les adresses utilisent `#` (`/#/projets/atelier-glpi`) car GitHub Pages ne sait pas rediriger les autres adresses vers `index.html`.

## Pourquoi pas d'API Express ?

GitHub Pages n'héberge que des fichiers statiques : un serveur Express n'y tournerait pas. Le site n'a d'ailleurs rien à envoyer (le contact passe par un lien e-mail, comme le prévoit la maquette). Si un back devient utile (formulaire de contact, fil de veille automatique), il suffira d'ajouter `apps/api` (Express) dans le monorepo et de l'héberger ailleurs (Render, Railway…).
