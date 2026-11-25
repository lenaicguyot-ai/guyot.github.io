import type { Bloc, EtapeParcours, GroupeCompetences } from './types';

export const profil = {
  prenom: 'Lénaïc',
  nom: 'Guyot',
  tag: 'BTS SIO · option SISR · Alternance 2025-2027',
  accroche:
    "J'administre un parc informatique en entreprise et je documente chaque projet comme en production. Objectif : administrateur systèmes et réseaux.",
  bulle: 'Bienvenue dans mon parc !',
  stats: [
    { valeur: '2e année', label: 'BTS SIO SISR' },
    { valeur: 'WAAT', label: 'Alternance' },
    { valeur: 'H3 Hitema', label: 'École' },
  ],
  presentation: [
    "Étudiant en 2e année de BTS SIO option SISR (Solutions d'Infrastructure, Systèmes et Réseaux), je me forme aux systèmes, aux réseaux et à la cybersécurité. Mon alternance m'apporte des compétences concrètes en administration, en support et en sécurité.",
    "Objectif : évoluer vers un poste d'administrateur systèmes et réseaux, puis poursuivre en Bachelor et Bac+5.",
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
  { periode: '2021-2024', titre: 'Stage · Equinix · machine virtuelle, réseau, programmation' },
  { periode: '2021-2024', titre: 'Stage · WAAT · technicien support' },
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
  role:
    "Support utilisateurs et gestion du parc : tickets (GLPI), comptes et droits (Entra ID), déploiement de configurations et de scripts avec Intune, automatisation avec Power Automate, interventions sur l'infrastructure réseau.",
};

export const competences: GroupeCompetences[] = [
  {
    titre: 'Support',
    icone: 'terminal',
    items: ['GLPI', 'Gestion de tickets', 'Comptes et droits', 'Microsoft 365', 'Teams', 'Sellsy', 'Préparation de postes'],
  },
  {
    titre: 'Systèmes',
    icone: 'baie',
    items: ['Entra ID', 'Intune', 'Power Automate', 'PowerShell', 'Microsoft Forms', 'Debian', 'Machines virtuelles'],
  },
  {
    titre: 'Réseau',
    icone: 'reseau',
    items: ['Cisco IOS', 'VLAN', 'Routage', 'Câblage RJ45', 'Infrastructure réseau'],
  },
  {
    titre: 'Sécurité',
    icone: 'bouclier',
    items: ['Accès conditionnel', 'Conformité Intune', 'EDR / XDR', 'RGPD', 'Veille cybersécurité'],
  },
];

export const ecole = {
  nom: 'H3 Hitema',
  texte:
    "École d'informatique en alternance à Issy-les-Moulineaux. Rythme : 2 jours à l'école, 3 jours en entreprise. Ateliers professionnels : GLPI, réseau Cisco.",
};

export const certifications = {
  intro: 'Parcours de certification en préparation. Aucune certification obtenue pour le moment.',
  liste: ['Cisco CCNA', 'NDG Linux Essentials', 'MOOC RGPD CNIL', 'SecNumacadémie ANSSI'],
};
