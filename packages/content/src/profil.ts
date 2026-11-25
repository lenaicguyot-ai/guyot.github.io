import type { Bloc, EtapeParcours, GroupeCompetences } from './types';

export const profil = {
  prenom: 'Lénaïc',
  nom: 'Guyot',
  tag: 'BTS SIO · option SISR · alternance 2025-2027',
  accroche: 'Futur administrateur systèmes et réseaux qui gère un parc informatique en entreprise.',
  bulle: 'Bienvenue dans mon parc !',
  /** Case « Repères » à droite de l'accueil. `chiffre` s'affiche en grand (Michroma, turquoise). */
  reperes: [
    { chiffre: '2e', titre: 'Année BTS SIO SISR' },
    { titre: 'WAAT', texte: 'Alternance' },
    { titre: 'H3 Hitema', texte: 'École' },
  ] as Array<{ chiffre?: string; titre: string; texte?: string }>,
  presentation: [
    "Étudiant en 2e année de BTS SIO option SISR (Solutions d'Infrastructure, Systèmes et Réseaux), je me forme aux systèmes, aux réseaux et à la cybersécurité. Mon alternance m'apporte des compétences concrètes en administration, en support et en sécurité.",
    "J'aimerais poursuivre en Bachelor et évoluer vers un poste d'administrateur systèmes et réseaux.",
  ],
  email: 'lenaicguyot@gmail.com',
  linkedin: 'https://www.linkedin.com/in/l%C3%A9na%C3%AFc-guyot-9a80b9306',
  urlPortfolio: 'https://lenaicguyot-ai.github.io/guyot.github.io/',
};

export const formation: EtapeParcours[] = [
  { periode: '2025-2027', titre: 'BTS SIO SISR, en alternance · H3 Hitema' },
  { periode: '2021-2024', titre: 'Bac pro Systèmes numériques (obtenu)' },
];

export const experience: EtapeParcours[] = [
  { periode: '2025-2027', titre: 'Alternance · WAAT · support et gestion de parc' },
  { periode: '2024', titre: 'Stage · WAAT · technicien support' },
  { periode: '2023', titre: 'Stage · Equinix · machine virtuelle, réseau, programmation' },
];

export const bts = {
  intro:
    "Le BTS Services Informatiques aux Organisations forme en deux ans des techniciens qui installent, administrent et sécurisent les ressources informatiques d'une organisation.",
  options: [
    {
      titre: 'SISR · mon option',
      texte:
        "Solutions d'Infrastructure, Systèmes et Réseaux : serveurs, réseaux, sécurité et support utilisateurs.",
    },
    {
      titre: 'SLAM',
      texte: "Solutions Logicielles et Applications Métiers : développement et maintenance d'applications.",
    },
  ] satisfies Bloc[],
  blocs: [
    { titre: 'Bloc 1', texte: 'Support et mise à disposition de services informatiques. Épreuve E5.' },
    { titre: 'Bloc 2', texte: 'Administration des systèmes et des réseaux. Épreuve E6.' },
    { titre: 'Bloc 3', texte: 'Cybersécurité des services informatiques.' },
  ] satisfies Bloc[],
};

export const entreprise = {
  nom: 'WAAT',
  description:
    'Opérateur français de bornes de recharge pour véhicules électriques (IRVE). Environnement Microsoft 365, Entra ID et Intune.',
  role: [
    "Je réalise du support informatique utilisateurs de niveau 0 à 1, notamment la gestion des droits d'accès et des comptes SharePoint et Entra ID.",
    "J'assure également la gestion du parc informatique (ordinateurs, téléphones mobiles et lignes téléphoniques).",
    "Je contribue à l'automatisation des tâches de support à l'aide de scripts, que je déploie via Intune.",
  ],
};

export const competences: GroupeCompetences[] = [
  {
    titre: 'Support',
    icone: 'terminal',
    items: ['Gestion de tickets', 'Comptes et droits', 'Microsoft 365', 'Teams', 'Sellsy', 'Préparation de postes'],
  },
  {
    titre: 'Systèmes',
    icone: 'baie',
    items: ['Entra ID', 'Intune', 'Power Automate', 'PowerShell', 'Microsoft Forms'],
  },
  {
    titre: 'Réseau',
    icone: 'reseau',
    items: ['Câblage RJ45'],
  },
  {
    titre: 'Sécurité',
    icone: 'bouclier',
    items: ['Accès conditionnel', 'Conformité Intune', 'EDR / XDR', 'Zscaler', 'RGPD', 'Veille cybersécurité'],
  },
];

export const ecole = {
  nom: 'H3 Hitema',
  texte:
    "École d'informatique en alternance, à deux pas de Montparnasse (Paris). Rythme : 2 jours à l'école, 3 jours en entreprise. Ateliers professionnels : GLPI, réseau Cisco (VLAN) et routage Cisco.",
};

export const certifications = {
  intro: 'Parcours de certification en préparation. Aucune certification obtenue pour le moment.',
  liste: ['Cisco CCNA', 'NDG Linux Essentials', 'MOOC RGPD CNIL', 'SecNumacadémie ANSSI'],
};
