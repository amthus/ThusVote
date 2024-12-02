# **ThusVote**

**ThusVote** est une plateforme de vote en ligne moderne, sécurisée et conviviale, développée avec React, TypeScript et SQLite. Elle permet aux organisations de créer et de gérer efficacement des campagnes de vote tout en garantissant l’intégrité et la transparence du processus de vote.

![Plateforme ThusVote](https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&q=80)

## **Fonctionnalités**

### Fonctionnalités implémentées ✅

- **Système d’authentification des utilisateurs**
  - Inscription et connexion sécurisées des utilisateurs
  - Contrôle d'accès basé sur les rôles (admin/utilisateur)
  - Routes protégées et sessions authentifiées

- **Gestion des campagnes**
  - Création et gestion des campagnes de vote
  - Prise en charge des campagnes gratuites et payantes
  - Planification flexible avec des dates de début et de fin
  - Options de vote à choix multiples

- **Intégration de base de données**
  - Base de données SQLite avec un schéma approprié
  - Stockage et récupération sécurisés des données
  - Optimisation efficace des requêtes

- **Interface utilisateur moderne**
  - Design responsive pour tous les appareils
  - Interface intuitive et épurée
  - Feedback en temps réel et notifications
  - Style professionnel avec Tailwind CSS

### Fonctionnalités en cours de développement 🚧

- Interface pour la création de campagnes  
- Implémentation du mécanisme de vote  
- Visualisation des résultats  
- Intégration des paiements pour les campagnes payantes  
- Notifications par email  
- Tableau de bord analytique des campagnes  

## **Technologies utilisées**

- **Frontend**
  - React 18
  - TypeScript
  - Tailwind CSS
  - React Router DOM
  - Lucide React (icônes)

- **Backend**
  - Node.js
  - SQLite (better-sqlite3)
  - Date-fns pour la manipulation des dates
  - Zod pour la validation

## **Démarrage**

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/your-repo/thusvote.git
   cd thusvote
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

## **Structure du projet**

```
thusvote/
├── src/
│   ├── components/     # Composants UI réutilisables
│   ├── pages/          # Composants des pages
│   ├── db/             # Opérations sur la base de données
│   ├── types/          # Définition des types TypeScript
│   └── utils/          # Fonctions utilitaires
├── public/             # Fichiers statiques
└── package.json        # Dépendances du projet
```

## **Contribuer**

1. Forkez le dépôt  
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)  
3. Commitez vos changements (`git commit -m 'Add some AmazingFeature'`)  
4. Poussez sur la branche (`git push origin feature/AmazingFeature`)  
5. Ouvrez une Pull Request  

## **Licence**

Ce projet est sous licence MIT. Consultez le fichier LICENSE pour plus de détails.

## **Sécurité**

ThusVote prend la sécurité au sérieux et met en œuvre :  

- Chiffrement des données  
- Validation des entrées  
- Prévention des injections SQL  
- Protection contre les attaques XSS  
- Protection CSRF  

## **Feuille de route**

- [ ] Implémentation du comptage des votes en temps réel  
- [ ] Prise en charge de différents systèmes de vote  
- [ ] Intégration de la blockchain pour la vérification des votes  
- [ ] Prise en charge de plusieurs langues  
- [ ] Implémentation d’analyses avancées  
- [ ] Documentation de l’API  
- [ ] Création d'une version mobile  

## **Contact**

Pour toute question ou préoccupation, veuillez ouvrir une *issue* dans le dépôt.  

ou [Email:ametepemalthus16@gmail.com]
    [linkdln: www.linkedin.com/in/malthus-ametepe]