import type { ColonneSynthese, Croix, GroupeSynthese } from './types';

/** Construit une ligne de croix à partir des numéros de colonnes cochées (0 à 5). */
const x = (...colonnes: number[]): Croix =>
  [0, 1, 2, 3, 4, 5].map((i) => colonnes.includes(i)) as Croix;

export const enteteSynthese = {
  session: 'BTS Services informatiques aux organisations · Session 2027 · Épreuve E5',
  titre: 'Tableau de synthèse des réalisations professionnelles',
  nom: 'GUYOT Lénaïc',
  numeroCandidat: '[À REMPLIR]',
  centre: 'H3 Hitema',
  option: 'SISR',
};

export const colonnesSynthese: ColonneSynthese[] = [
  {
    titre: 'Gérer le patrimoine informatique',
    items: [
      'Recenser et identifier les ressources numériques',
      'Exploiter des référentiels, normes et standards adoptés par le prestataire informatique',
      'Mettre en place et vérifier les niveaux d’habilitation associés à un service',
      'Vérifier les conditions de la continuité d’un service informatique',
      'Gérer des sauvegardes',
      'Vérifier le respect des règles d’utilisation des ressources numériques',
    ],
  },
  {
    titre: 'Répondre aux incidents et aux demandes d’assistance et d’évolution',
    items: [
      'Collecter, suivre et orienter des demandes',
      'Traiter des demandes concernant les services réseau et système, applicatifs',
      'Traiter des demandes concernant les applications',
    ],
  },
  {
    titre: 'Développer la présence en ligne de l’organisation',
    items: [
      'Participer à la valorisation de l’image de l’organisation sur les médias numériques en tenant compte du cadre juridique et des enjeux économiques',
      'Référencer les services en ligne de l’organisation et mesurer leur visibilité',
      'Participer à l’évolution d’un site Web exploitant les données de l’organisation',
    ],
  },
  {
    titre: 'Travailler en mode projet',
    items: [
      'Analyser les objectifs et les modalités d’organisation d’un projet',
      'Planifier les activités',
      'Évaluer les indicateurs de suivi d’un projet et analyser les écarts',
    ],
  },
  {
    titre: 'Mettre à disposition des utilisateurs un service informatique',
    items: [
      'Réaliser les tests d’intégration et d’acceptation d’un service',
      'Déployer un service',
      'Accompagner les utilisateurs dans la mise en place d’un service',
    ],
  },
  {
    titre: 'Organiser son développement professionnel',
    items: [
      'Mettre en place son environnement d’apprentissage personnel',
      'Mettre en œuvre des outils et stratégies de veille informationnelle',
      'Gérer son identité professionnelle',
      'Développer son projet professionnel',
    ],
  },
];

const DATES = '[À REMPLIR]';

export const groupesSynthese: GroupeSynthese[] = [
  {
    titre: 'Réalisations en cours de formation',
    lignes: [
      { intitule: 'Portfolio en ligne (React, TypeScript, hébergé sur GitHub Pages)', documents: 'Site web, dépôt GitHub', periode: DATES, croix: x(5) },
      { intitule: 'Veille technologique et juridique : fuites de données et RGPD', documents: 'Fiches de veille, sources', periode: DATES, croix: x(5) },
      { intitule: 'Gestion de l’identité professionnelle (profil LinkedIn)', periode: DATES, croix: x(5) },
      { intitule: 'Atelier pro H3 Hitema : installation de GLPI sur Debian (pile LAMP : Apache, MySQL, PHP)', documents: 'Procédure d’installation, captures', periode: DATES, croix: x(0, 4) },
      { intitule: 'Atelier pro H3 Hitema : VLAN, routage inter-VLAN et routage statique sur équipements Cisco', documents: 'Schéma réseau, plan d’adressage, configurations', periode: DATES, croix: x(0, 3, 4) },
    ],
  },
  {
    titre: 'Réalisations en milieu professionnel en cours de première année',
    lignes: [
      { intitule: 'WAAT : création et gestion des comptes utilisateurs et des droits d’accès (Entra ID, Microsoft 365)', documents: 'Procédure de création de compte, captures', periode: DATES, croix: x(0, 1, 4) },
      { intitule: 'WAAT : collecte, suivi et traitement des demandes d’assistance (GLPI)', documents: 'Extraits de tickets anonymisés', periode: DATES, croix: x(1) },
      { intitule: 'WAAT : préparation et déploiement de postes pour les nouveaux salariés (Intune)', documents: 'Procédure de préparation, check-list', periode: DATES, croix: x(0, 4) },
      { intitule: 'WAAT : déploiement via Intune d’un script de nettoyage des dossiers temporaires', documents: 'Script, rapport de déploiement', periode: DATES, croix: x(0, 4) },
    ],
  },
  {
    titre: 'Réalisations en milieu professionnel en cours de seconde année',
    lignes: [
      { intitule: 'WAAT : automatisation d’un processus avec Power Automate et Microsoft Forms', documents: 'Schéma du flux, documentation utilisateur', periode: DATES, croix: x(1, 3, 4) },
      { intitule: '[À REMPLIR : réalisation de 2e année]', periode: DATES, croix: x() },
      { intitule: '[À REMPLIR : réalisation de 2e année]', periode: DATES, croix: x() },
    ],
  },
];
