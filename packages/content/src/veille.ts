import type { ArticleVeille, ItemVeille } from './types';

export const veille = {
  theme: 'Fuites de données dans le monde et lien avec le RGPD.',
  sources:
    'Retours d’experts et alertes de sécurité sur LinkedIn. [À REMPLIR : flux RSS, CERT-FR, CNIL, ANSSI, fréquence de consultation]',
  fil: [{ date: '[À REMPLIR]', titre: '[À REMPLIR : titre de l’article ou de l’alerte]', source: 'source' }] as ItemVeille[],
  article: {
    surtitre: 'De la veille à la pratique',
    titre: 'Prévenir les fuites de données, du poste de travail au cloud',
    intro:
      'Une fuite de données ne commence pas toujours par une cyberattaque spectaculaire. Le plus souvent, elle naît d’un geste ordinaire : un fichier envoyé depuis un compte personnel, un téléphone perdu, des données oubliées sur un poste. En alternance au support et à la gestion du parc, dans un environnement Microsoft 365, Entra ID et Intune, je suis au plus près de ces usages.',
    sections: [
      {
        titre: 'Contrôler l’accès aux outils SaaS',
        contexte:
          'Les collaborateurs pouvaient se connecter aux outils en ligne avec des comptes personnels et faire sortir des documents hors de tout contrôle.',
        solution:
          'Contribution à la mise en place de règles d’accès conditionnel dans Entra ID et à la restriction des comptes personnels sur les services SaaS.',
        resultat: 'Seuls les comptes de l’entreprise, depuis des appareils connus, accèdent aux données.',
      },
      {
        titre: 'Protéger les données sur les mobiles',
        contexte: 'Des téléphones personnels (BYOD) accédaient à la messagerie et aux fichiers sans garantie de sécurité.',
        solution:
          'Politiques de conformité et de protection des applications dans Intune, avec un navigateur imposé pour ouvrir les ressources de l’entreprise.',
        resultat: 'Les données professionnelles restent cloisonnées dans des applications gérées, sans toucher à la vie privée.',
      },
      {
        titre: 'Déployer une solution EDR/XDR',
        contexte: 'L’antivirus classique ne suffit plus à détecter les comportements suspects, comme l’exfiltration de fichiers.',
        solution:
          'Participation au déploiement d’une solution de détection et de réponse : préparation des postes et suivi de leur remontée dans la console.',
        resultat: 'Une visibilité centralisée sur les menaces et la capacité d’isoler rapidement un poste compromis.',
      },
      {
        titre: 'Évaluer un gestionnaire de mots de passe',
        contexte: 'Des mots de passe partagés par messagerie ou stockés dans des fichiers sont un risque direct de fuite.',
        solution:
          'Comparaison de plusieurs gestionnaires selon la sécurité, l’intégration à Entra ID, la simplicité d’usage et le coût.',
        resultat: 'Une grille d’évaluation pour aider à la décision.',
      },
      {
        titre: 'Nettoyer les données locales obsolètes',
        contexte:
          'Dossiers temporaires et fichiers oubliés s’accumulent sur les postes : autant de données exposées en cas de perte ou de vol.',
        solution: 'Un script de nettoyage déployé automatiquement sur le parc via Intune.',
        resultat: 'Moins de données résiduelles sur les postes et un espace disque mieux maîtrisé, sans intervention manuelle.',
      },
    ] satisfies ArticleVeille[],
    competences: [
      'Accès conditionnel',
      'Conformité Intune',
      'EDR / XDR',
      'PowerShell',
      'RGPD',
      'Accompagnement utilisateurs',
      'Documentation',
      'Analyse comparative',
    ],
    conclusion:
      'Une protection efficace repose autant sur la technique que sur l’adhésion des utilisateurs : sécuriser les données sans freiner le travail de chacun.',
  },
};
