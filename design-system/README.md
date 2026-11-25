# Portfolio

Design system du portfolio BTS SIO SISR de Lénaïc Guyot : une page de manga posée dans une chambre claire. Cases cerclées d'encre violette, bulles de dialogue, trames de points, fenêtres à montants turquoise et sol en bas de page.

Il reprend le **style** de deux références (un modèle de présentation « portfolio d'illustrateur manga » et une page d'accueil de site de lecture manga), jamais leur **identité** : aucun logo, nom, personnage ou illustration n'en est copié.

## Principes

1. **La page est une planche.** Le contenu se range dans des cases rectangulaires cerclées d'encre, séparées par une gouttière serrée (`--gutter`). On lit une case à la fois.
2. **L'encre fait la profondeur.** Pas d'ombre, pas de dégradé : des aplats, un trait de 2 px pour les cadres, 1 px pour le dessin, et des trames de points pour donner du volume.
3. **Un décor, pas un fond.** Le blanc cassé rosé (`--paper`) est le mur, le rose (`--blush`) colore les cases mises en avant et les trames, le sol (`--floor`) et sa plinthe (`--baseboard`) ferment la page en bas, les montants turquoise (`--teal`) encadrent les fenêtres.
4. **Deux voix typographiques.** Michroma, large et technique, pour les titres et les chiffres ; Patrick Hand, lettrage à la main, pour ce qui « parle » (bulles, navigation, titres de case). Lato porte le texte courant.
5. **Lisible d'abord.** Tout texte atteint 4,5:1. Les accents d'origine (corail, turquoise) restent décoratifs ; leurs versions assombries portent le texte.

## Contenu et ton

- **Langue** : français, phrases courtes, à la première personne pour la présentation (« J'administre… »), impersonnel pour les fiches.
- **Titres** : en MAJUSCULES, deux couleurs. Le ou les premiers mots en `--ink`, le dernier mot en `--coral-text` : « MES **ÉPREUVES** », « LE BTS **SIO** ».
- **Bulles** : courtes (2 à 4 mots), en majuscules, avec un point d'exclamation au plus : « BIENVENUE ! », « À JOUR ».
- **Labels et boutons** : verbe d'abord, majuscules : « VOIR LES ÉPREUVES », « TÉLÉCHARGER LE CV ».
- **Contenu manquant** : un tag `À REMPLIR` en `--coral-text`, jamais de texte factice ni de chiffre inventé.
- **Pas d'emoji**, pas de superlatifs, pas de compétence ou certification présentée comme obtenue si elle ne l'est pas.

## Fondations visuelles

### Couleurs

| Rôle | Token | Valeur | Source |
|---|---|---|---|
| Mur, fond de page | `--paper` | `#FFF4F6` | choix utilisateur (25 % de blush dans du blanc) |
| Rose papier : case papier, trame, pastilles | `--blush` | `#FFD2DA` | deck |
| Cases, cartes, champs | `--panel` | `#FFFFFF` | deck, capture |
| Sol, pied de page | `--floor` | `#E5D8DA` | deck |
| Plinthe | `--baseboard` | `#C9B9BC` | deck |
| Fond variante N&B | `--page-manga` | `#DBDBDB` | capture |
| Encre | `--ink` | `#341E4D` | deck |
| Encre douce | `--ink-soft` | `#5A4C70` | deck |
| Noir manga | `--manga-black` | `#000000` | capture |
| Gris manga | `--manga-gray` | `#595959` | capture |
| Corail (décor) | `--coral` | `#F78181` | deck |
| Turquoise (décor) | `--teal` | `#3B9AAD` | deck |
| Corail texte | `--coral-text` | `#A83A3F` | **assombri** |
| Turquoise texte | `--teal-text` | `#046A7B` | **assombri** |

Alias sémantiques : `--text` (ink), `--text-muted` (ink-soft), `--border` (ink), `--focus` (teal-text), `--accent-fill` (coral).

**Corrections de contraste signalées.** Dans les références, le corail sert de couleur de texte (dernier mot des titres) et le turquoise aussi (numéros de section). Sur le rose `--blush`, ils n'atteignent que 1,84:1 et 2,41:1 (2,32:1 et 3,04:1 sur le fond `--paper`). Les tokens `--coral-text` et `--teal-text` gardent la même teinte (OKLCH, seule la luminance baisse) et atteignent 5,84:1 et 5,82:1 sur `--paper`, 4,63:1 et 4,62:1 sur `--blush`, plus de 6:1 sur `--panel`, et au moins 4,5:1 sur `--floor`.

| Texte sur | paper | blush | panel | floor | baseboard |
|---|---|---|---|---|---|
| ink | 13,57 | 10,76 | 14,59 | 10,54 | 7,75 |
| ink-soft | 7,22 | 5,73 | 7,77 | 5,61 | 4,13 ✕ |
| coral-text | 5,84 | 4,63 | 6,28 | 4,54 | ✕ |
| teal-text | 5,82 | 4,62 | 6,26 | 4,52 | ✕ |
| manga-gray | 6,51 | 5,16 | 7,00 | 5,06 | 3,72 ✕ |
| coral | 2,32 ✕ | 1,84 ✕ | 2,50 ✕ | 1,80 ✕ | ✕ |
| teal | 3,04 ✕ | 2,41 ✕ | 3,28 ✕ | 2,37 ✕ | ✕ |

Fonds pleins portant du texte : `--ink` sous texte blanc (14,59:1), `--coral` sous texte `--ink` (5,85:1). Jamais de texte sur `--teal` (ink 4,46:1, blanc 3,28:1).

### Typographie

Trois familles Google Fonts, plus une police de code proposée :

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Michroma&family=Patrick+Hand&family=Roboto+Mono&display=swap">
```

| Style | Police | Graisse | Taille | Interligne | Approche |
|---|---|---|---|---|---|
| display | Michroma | 400 | 59 px (44 pt) | 100 % | 0 |
| number | Michroma | 400 | 64 px (48 pt) | 100 % | 0 |
| section-number | Michroma | 400 | 64 px (48 pt) | 100 % | 0 |
| h1 | Michroma | 400 | 48 px (36 pt) | 100 % | 0 |
| h2 | Michroma | 400 | 40 px (30 pt) | 100 % | 0 |
| h3 | Michroma | 400 | 32 px (24 pt) | 100 % | 0 |
| bubble | Patrick Hand | 400 | 28 px (21 pt) | 100 % | 0 |
| bubble-sm | Patrick Hand | 400 | 21 px | 100 % | 0 |
| subtitle | Lato | 400 | 21 px (16 pt) | 100 % | 0 |
| label | Lato | 700 | 15 px (11 pt) | 100 % | 0 |
| body | Lato | 400 | 13 px (10 pt) | 115 % | 0 |
| input | Lato | 400 | 16 px | 115 % | 0 |
| caption | Lato | 700 | 11 px (8 pt) | 100 % | 0 |
| code | Roboto Mono | 400 | 13 px | 115 % | 0 |

Les tailles sont celles du deck (960 × 540 px) converties à 1 pt = 1,333 px. Hors tokens :

- **Majuscules** (`text-transform: uppercase`) : display, h1, h2, h3, bubble, bubble-sm, label, et les tags.
- **Michroma n'existe qu'en 400.** Le deck applique un gras que le navigateur simulerait (faux gras) : ne jamais mettre `font-weight: 700` sur Michroma.
- **Corps à 13 px** : valeur exacte du deck. Pour de longs textes sur le web, `--body` peut être remplacé par 16 px (16 pt = `subtitle`, déjà dans l'échelle) ; c'est un choix, pas une valeur des références.
- `bubble-sm` (21 px) et `input` (16 px) ne viennent pas des références : le premier reprend le pas du sous-titre, le second est une contrainte mobile.
- Roboto Mono est une **proposition** : les références n'ont aucune police de code.

### Grille et espacement

- **Page** : marge latérale `--page-margin` (76 px), haut `--page-top` (45 px), bande de sol `--floor-height` (75 px) avec plinthe `--baseboard-height` (14 px).
- **Cases** : grille CSS de 3 ou 4 colonnes égales, gouttière `--gutter` (10 px) entre cases. Une case peut couvrir 2 ou 3 colonnes ; les cases d'une même rangée ont la même hauteur.
- **Dans une case** : marge intérieure `--space-24`, écart entre éléments `--space-16`, entre label et contenu `--space-8`.
- **Alignements** : titres de case alignés à gauche ; titres de bloc (h3) centrés, comme dans le deck ; numéros alignés à droite dans les listes classées.
- Mesurées : `gutter`, `page-top`, `page-margin`, `floor-height`, `baseboard-height`. Dérivés, sans source : `space-4`, `space-8`, `space-16`, `space-24`.

### Coins, traits, ombres

- Angles droits partout (`--radius-none`) ; `--radius-round` seulement pour les bulles et les pastilles.
- Traits en `--ink` : `--stroke-frame` (2 px) pour cadres, boutons, champs et bulles ; `--stroke-hair` (1 px) pour le dessin et les séparateurs ; `--stroke-icon` (1,25 px) pour les icônes.
- Focus : `outline: var(--stroke-focus) solid var(--focus); outline-offset: 2px`.
- Ombres : aucune (`--shadow-none`).

### Dégradés

Aucun dans les références. Ne pas en ajouter.

### Motifs et recettes CSS

**Trame (screentone)** : volume et images de remplacement.

```css
.trame {
  background-color: var(--blush);
  background-image: radial-gradient(var(--ink) var(--halftone-dot), transparent calc(var(--halftone-dot) + 0.6px));
  background-size: var(--halftone-pitch) var(--halftone-pitch);
}
```

Variante N&B : `--manga-black` sur `--panel`.

**Sol et plinthe** : ferme chaque page.

```css
.sol {
  height: var(--floor-height);
  background: var(--floor);
  border-top: var(--baseboard-height) solid var(--baseboard);
}
```

**Titre bicolore** :

```html
<h2 class="h1" style="text-transform:uppercase">Mes <span style="color:var(--coral-text)">épreuves</span></h2>
```

**Bulle « explosion »** : deux couches découpées par le même polygone, la couche blanche en retrait de 4 px.

```css
.burst { position: relative; }
.burst::before, .burst::after { content: ""; position: absolute; clip-path: polygon(50% 0%, 61% 20%, 82% 6%, 79% 32%, 100% 38%, 82% 54%, 96% 78%, 72% 74%, 66% 100%, 50% 82%, 34% 100%, 28% 74%, 4% 78%, 18% 54%, 0% 38%, 21% 32%, 18% 6%, 39% 20%); }
.burst::before { inset: 0; background: var(--ink); }
.burst::after { inset: 4px 6px; background: var(--panel); }
```

**Bulle de dialogue** : une ellipse SVG (`fill: var(--panel)`, `stroke: var(--ink)`, 2 px) et une queue triangulaire ; la queue est redessinée sans trait par-dessus pour effacer la jonction (voir le composant SpeechBubble).

## Iconographie et illustrations

- **Icônes** : au trait, 32 px, `stroke: var(--ink)`, `stroke-width: var(--stroke-icon)`, sans remplissage sauf de petits voyants en `--coral` ou `--teal`. Sujets du métier : baie, réseau, bouclier, terminal.
- **Illustrations** : dessin au trait `--ink` 1 px, aplats de la palette, aucune ombre ni dégradé. Le décor récurrent : fenêtre à carreaux blancs entre deux montants `--teal`, nuages au trait, sol et plinthe, objets du métier (baie serveur, poste, câbles). Trois exemples sont dans le groupe d'assets **Illustrations**.
- **Personnages** : les références en sont pleines, mais ils appartiennent à leurs auteurs. N'en reprendre aucun ; dessiner ses propres sujets ou utiliser des objets.
- **Photos** : non utilisées. Une image manquante devient une case tramée avec un code (E5, E6…).

## À éviter

- Corail ou turquoise d'origine en texte ; texte posé sur du turquoise ; `--ink-soft` sur la plinthe.
- Ombres portées, dégradés, coins arrondis sur les cases, boutons ou champs.
- Michroma en gras ; texte courant en Michroma ou en Patrick Hand.
- Copier un logo, un nom, un personnage ou une illustration des références.
- Remplir avec du faux contenu (dates, chiffres, certifications) : utiliser le tag `À REMPLIR`.
- Gouttières larges : la planche manga est serrée (`--gutter`).
- Emoji.

## Composants

| Composant | Rôle |
|---|---|
| Panel | Case de planche : standard, papier, tramée |
| Tile | Tuile « chapitre » (image tramée + légende) et tuile « info » (icône + texte) |
| Button | Primaire, secondaire, accent, état focus |
| Tag | Contour, plein, alerte, prévu, pastille de rang |
| Field | Champ texte, zone de texte, état focus |
| RankList | Liste classée (#1, #2…) |
| Timeline | Chronologie années + intitulé |
| SpeechBubble | Bulle de dialogue et bulle « explosion » |
| SectionTitle | Numéro de section + titre bicolore |
| Nav | Barre de navigation en case |
| Halftone | Motif de trame |
| Floor | Sol et plinthe de bas de page |
| Window | Fenêtre du décor (montants turquoise, nuages) |

## Sources des valeurs

- Thème du deck (`theme2.xml`) et diapo « Fonts & colors used » : les 7 couleurs, Michroma et Lato.
- Fond `--paper` (`#FFF4F6`) : choix de l'utilisateur, un blanc cassé légèrement rosé à la place du rose du deck, qui devient `--blush`.
- XML des diapos et masques : tailles (pt), interlignes (100 % et 115 %), approche (0), épaisseurs de trait (EMU), positions (marges), absence d'ombres et de dégradés.
- Rendu des diapos et décor : échantillonnage des couleurs, hauteur de plinthe.
- Capture manga (544 px de large) : `#FFFFFF`, `#DBDBDB`, `#000000`, `#595959`, gouttière.
