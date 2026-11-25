import type { Projet } from './types';

const AFAIRE = '[À REMPLIR]';

export const projets: Projet[] = [
  {
    slug: 'e5-intune',
    categorie: 'e5',
    code: 'E5',
    badge: 'E5 · Production réelle',
    titre: 'Automatisation Intune et Power Automate',
    meta: 'Intune · Power Automate · PowerShell',
    resume: "Déploiement de configurations et d'un script de nettoyage des dossiers temporaires sur le parc WAAT.",
    contexte: [`${AFAIRE} Entreprise, environnement, problème rencontré.`],
    besoins: [`${AFAIRE} Besoin et cahier des charges.`],
    etapes: [],
    noteEtapes: `${AFAIRE} Étapes, schéma, captures d'écran, configurations.`,
    outils: ['Intune', 'Power Automate', 'PowerShell', 'Microsoft Forms'],
    resultat: `${AFAIRE} Résultat obtenu.`,
    competences: [
      { titre: 'Gérer le patrimoine informatique', texte: `${AFAIRE} Lien avec le référentiel.` },
      { titre: 'Mettre à disposition un service', texte: `${AFAIRE} Lien avec le référentiel.` },
    ],
    documents: [{ label: '[À REMPLIR : documentation PDF]' }],
  },
  {
    slug: 'e6-reseau',
    categorie: 'e6',
    code: 'E6',
    badge: 'E6 · Fiche de situation 1',
    titre: 'Réseau',
    meta: 'Fiche de situation 1',
    resume: `${AFAIRE} Contexte, besoin, solution, outils, résultat.`,
    contexte: [`${AFAIRE} Entreprise, environnement, problème rencontré.`],
    besoins: [`${AFAIRE} Besoin et cahier des charges.`],
    etapes: [],
    noteEtapes: `${AFAIRE} Étapes, schéma, captures d'écran, configurations.`,
    outils: [],
    resultat: `${AFAIRE} Résultat obtenu.`,
    competences: [],
    documents: [{ label: '[À REMPLIR : documentation PDF]' }],
  },
  {
    slug: 'e6-systeme',
    categorie: 'e6',
    code: 'E6',
    badge: 'E6 · Fiche de situation 2',
    titre: 'Système',
    meta: 'Fiche de situation 2',
    resume: `${AFAIRE} Contexte, besoin, solution, outils, résultat.`,
    contexte: [`${AFAIRE} Entreprise, environnement, problème rencontré.`],
    besoins: [`${AFAIRE} Besoin et cahier des charges.`],
    etapes: [],
    noteEtapes: `${AFAIRE} Étapes, schéma, captures d'écran, configurations.`,
    outils: [],
    resultat: `${AFAIRE} Résultat obtenu.`,
    competences: [],
    documents: [{ label: '[À REMPLIR : documentation PDF]' }],
  },
  {
    slug: 'atelier-glpi',
    categorie: 'atelier',
    code: 'AP',
    badge: 'Atelier pro · GLPI',
    titre: 'Installation de GLPI sur Debian',
    meta: 'Debian · Apache · MySQL · PHP',
    resume:
      'Déploiement de GLPI sur un serveur Debian avec une pile LAMP : base de données, configuration et sécurisation.',
    lead: 'Mise en place d’un outil de gestion de parc et de helpdesk sur un serveur Linux, avec une pile LAMP (Linux, Apache, MySQL, PHP).',
    contexte: [
      "Dans le cadre de l'atelier professionnel du BTS SIO option SISR à H3 Hitema, l'objectif était de déployer un serveur de gestion de parc informatique. GLPI (Gestionnaire Libre de Parc Informatique) est un logiciel libre utilisé en entreprise pour inventorier le matériel et les logiciels et pour gérer les demandes d'assistance (tickets).",
      "C'est aussi l'outil que j'utilise en alternance chez WAAT pour traiter les demandes : ce projet m'a permis de comprendre son fonctionnement côté serveur.",
    ],
    besoins: ['Serveur Debian', 'Pile LAMP', 'Base de données dédiée', 'Accès par navigateur', 'Comptes par défaut sécurisés'],
    contraintes: 'Utiliser uniquement des logiciels libres et documenter chaque étape pour pouvoir refaire l’installation.',
    etapes: [
      {
        titre: 'Préparer le serveur Debian',
        texte: 'Mise à jour du système et adresse IP fixe. [À REMPLIR : version de Debian, IP du serveur]',
        code: 'apt update && apt upgrade -y',
      },
      {
        titre: 'Installer la pile LAMP',
        texte:
          'Serveur web Apache, base de données MySQL (MariaDB, la version fournie par Debian, compatible MySQL) et PHP avec les extensions nécessaires à GLPI.',
        code:
          'apt install apache2 mariadb-server php libapache2-mod-php \\\n  php-mysql php-curl php-gd php-intl php-xml php-mbstring php-zip php-bz2 php-ldap -y',
      },
      {
        titre: 'Créer la base de données',
        texte: 'Sécurisation de MySQL, puis création de la base et de l’utilisateur dédiés à GLPI.',
        code:
          "mysql_secure_installation\nmysql -u root -p\nCREATE DATABASE glpi;\nCREATE USER 'glpi'@'localhost' IDENTIFIED BY 'motdepasse';\nGRANT ALL PRIVILEGES ON glpi.* TO 'glpi'@'localhost';\nFLUSH PRIVILEGES;",
      },
      {
        titre: 'Déposer GLPI',
        texte: 'Téléchargement depuis le site officiel, décompression dans /var/www/ et droits donnés à l’utilisateur d’Apache.',
        code: 'tar -xzf glpi-x.x.x.tgz -C /var/www/\nchown -R www-data:www-data /var/www/glpi',
      },
      { titre: 'Configurer Apache', texte: 'Publication de GLPI dans Apache, puis rechargement du service.' },
      {
        titre: 'Installer depuis le navigateur',
        texte: 'Assistant d’installation de GLPI : vérification des prérequis, connexion à la base glpi, création des tables.',
      },
      {
        titre: 'Sécuriser',
        texte:
          'Changement des mots de passe des comptes par défaut (glpi, tech, normal, post-only) et suppression du fichier d’installation.',
      },
    ],
    noteEtapes: '[À REMPLIR : captures de l’assistant et de la page d’accueil de GLPI]',
    outils: ['Debian', 'Apache', 'MySQL / MariaDB', 'PHP', 'GLPI', 'Ligne de commande'],
    resultat: 'GLPI est accessible depuis un navigateur et prêt à recevoir l’inventaire du parc et les tickets des utilisateurs.',
    competences: [
      {
        titre: 'Gérer le patrimoine informatique',
        texte: 'Mise en place d’un outil pour recenser les ressources numériques. Habilitations : comptes et profils GLPI.',
      },
      {
        titre: 'Mettre à disposition un service',
        texte: 'Déploiement d’un service web complet (serveur, base de données, application) et tests de fonctionnement.',
      },
    ],
    documents: [{ label: '[À REMPLIR : procédure d’installation en PDF]' }],
  },
  {
    slug: 'atelier-cisco',
    categorie: 'atelier',
    code: 'AP',
    badge: 'Atelier pro · Cisco',
    titre: 'VLAN et routage Cisco',
    meta: 'VLAN · Trunk · Routage',
    resume: 'Segmentation d’un réseau en VLAN, liaisons trunk, routage inter-VLAN et routage statique sur équipements Cisco.',
    lead: 'Segmentation d’un réseau en VLAN et mise en place du routage pour faire communiquer les différents réseaux.',
    contexte: [
      "Dans le cadre de l'atelier professionnel du BTS SIO option SISR à H3 Hitema, l'objectif était de configurer l'infrastructure réseau d'une organisation sur des équipements Cisco.",
      'Un réseau « à plat », où tous les postes sont dans le même réseau, pose des problèmes de sécurité et de performance : on le découpe en VLAN, puis on configure le routage pour que les réseaux communiquent.',
    ],
    besoins: ['Un VLAN par service', 'Plan d’adressage IP', 'Liaisons trunk', 'Routage inter-VLAN', 'Routage entre réseaux'],
    contraintes: '[À REMPLIR : nombre de VLAN, de switchs et de routeurs, Packet Tracer ou matériel réel]',
    etapes: [
      {
        titre: 'Plan d’adressage',
        texte: 'Un sous-réseau par VLAN. Les valeurs ci-dessous sont des exemples. [À REMPLIR : vos VLAN et adresses]',
        code: 'VLAN 10  ADMIN  192.168.10.0/24  passerelle 192.168.10.254\nVLAN 20  USERS  192.168.20.0/24  passerelle 192.168.20.254',
      },
      {
        titre: 'Créer les VLAN',
        texte: 'Création des VLAN sur le switch et affectation des ports en mode access.',
        code: 'vlan 10\n name ADMIN\ninterface range fa0/1-10\n switchport mode access\n switchport access vlan 10',
      },
      {
        titre: 'Liaison trunk 802.1Q',
        texte: 'Vers le routeur ou entre switchs, pour faire passer plusieurs VLAN sur un même câble.',
        code: 'interface gi0/1\n switchport mode trunk',
      },
      {
        titre: 'Routage inter-VLAN',
        texte: 'Router-on-a-stick : une sous-interface par VLAN sur le routeur.',
        code: 'interface gi0/0.10\n encapsulation dot1Q 10\n ip address 192.168.10.254 255.255.255.0',
      },
      {
        titre: 'Routage statique',
        texte: 'Routes statiques vers les réseaux distants.',
        code: 'ip route 192.168.30.0 255.255.255.0 10.0.0.2',
      },
      {
        titre: 'Tester',
        texte: 'Ping entre postes de VLAN différents, puis vérification des tables.',
        code: 'show vlan brief\nshow interfaces trunk\nshow ip route',
      },
    ],
    noteEtapes: '[À REMPLIR : schéma de la topologie et captures des tests]',
    outils: ['Cisco IOS', 'Switchs Cisco', 'Routeurs Cisco', 'VLAN', 'Trunk 802.1Q', 'Routage statique', 'IPv4'],
    resultat:
      'Le réseau est découpé par service, les postes communiquent entre VLAN par le routeur et les réseaux distants sont joignables grâce aux routes.',
    competences: [
      {
        titre: 'Travailler en mode projet',
        texte: 'Analyse du besoin, plan d’adressage, configuration étape par étape et validation par des tests.',
      },
      {
        titre: 'Mettre à disposition un service',
        texte: 'Déploiement d’une infrastructure réseau segmentée et tests de bon fonctionnement.',
      },
    ],
    documents: [{ label: '[À REMPLIR : schéma réseau et configurations]' }],
  },
];

export const trouverProjet = (slug: string): Projet | undefined => projets.find((p) => p.slug === slug);
