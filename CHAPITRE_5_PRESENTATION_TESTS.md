# CHAPITRE 5 : PRÉSENTATION DE L’APPLICATION ET TESTS DE FONCTIONNEMENT

Ce chapitre constitue la phase d’aboutissement de notre travail d’ingénierie. Il présente le livrable final sous ses différents aspects applicatifs : d’une part, la vitrine publique destinée aux partenaires et bénéficiaires de l’ONG, et d’autre part, le panneau d'administration sécurisé permettant la gestion des contenus. Enfin, un plan de tests détaillera les cas d'utilisation validés pour attester du bon fonctionnement et de la fiabilité de la solution.

---

## I- PRÉSENTATION DE L'INTERFACE CLIENT (ESPACE PUBLIC)

L'espace public a été développé avec une approche centrée sur l'utilisateur. Il s'agit d'une interface réactive (responsive) intégrant des animations fluides pour maximiser l'impact visuel et la crédibilité de l'ONG.

### 1- Page d'accueil et présentation des piliers
La page d'accueil introduit la mission de l'ONG BUSOLA avec une bannière animée (Hero Slider), suivie par la présentation de ses axes stratégiques majeurs (DSSR, Paix et Sécurité, Leadership féminin). Les dernières actions terrain et actualités y sont affichées de manière dynamique.

> [!TIP]
> **[INSERTION CAPTURE D'ÉCRAN 01 : Page d'accueil - Partie Supérieure]**
> *Description : Capture montrant le menu de navigation, le logo de l'ONG, le Hero Slider principal et les icônes d'accès rapide aux piliers d'intervention.*

> [!TIP]
> **[INSERTION CAPTURE D'ÉCRAN 02 : Page d'accueil - Piliers Stratégiques & Impact]**
> *Description : Capture de la section présentant de manière synthétique les axes d'intervention clés de l'ONG et les chiffres d'impact.*

### 2- Page de détail des actions et des actualités
Chaque action terrain ou actualité possède sa propre page de détail dynamique, accessible par clic sur sa carte de présentation. Ces pages chargent les données en temps réel depuis l'API. En cas d'indisponibilité temporaire du serveur, un mécanisme de secours (fallback) affiche un contenu statique prédéfini afin de maintenir un affichage fluide pour l'utilisateur.

> [!TIP]
> **[INSERTION CAPTURE D'ÉCRAN 03 : Page de détail d'une Action]**
> *Description : Vue détaillée d'une action menée par l'ONG, incluant le titre, la date, l'image d'illustration, la description textuelle complète et le projet d'association.*

> [!TIP]
> **[INSERTION CAPTURE D'ÉCRAN 04 : Page de liste et détail des Actualités]**
> *Description : Vue d'ensemble des actualités publiées et aperçu de la lecture d'un article spécifique.*

### 3- Formulaire de contact et d'adhésion
Situé dans la page dédiée aux contacts, ce formulaire permet aux visiteurs d'envoyer des demandes d'information ou de partenariat. Un système de validation côté client s'assure du bon format de l'e-mail et du contenu avant de transmettre la requête à l'API.

> [!TIP]
> **[INSERTION CAPTURE D'ÉCRAN 05 : Formulaire de contact et retour visuel]**
> *Description : Capture du formulaire de contact avec un message de succès (Notification Toast ou boîte verte) après envoi réussi.*

### 4- Assistant de discussion (Chatbot)
Le chatbot, disponible en bas de page, fournit des réponses automatisées instantanées aux questions courantes sur l'ONG. Conçu pour fonctionner côté client, il garantit une réactivité optimale et décharge les administrateurs des requêtes redondantes.

> [!TIP]
> **[INSERTION CAPTURE D'ÉCRAN 06 : Fenêtre de dialogue du Chatbot]**
> *Description : Capture de la boîte de dialogue du chatbot ouverte, montrant un échange de questions/réponses sur les programmes de l'ONG.*

---

## II- PRÉSENTATION DE L'ESPACE ADMINISTRATION (ESPACE PRIVÉ)

L'espace administration est un outil de gestion autonome (CMS propriétaire) réservé aux responsables autorisés de l'ONG. Il est protégé par un système de sécurité robuste.

### 1- Page de connexion (Authentification)
L'accès au panneau d'administration nécessite une authentification stricte. Les identifiants saisis sont envoyés à l'API où le mot de passe est comparé via un hachage sécurisé (bcrypt). Un jeton de session JWT (JSON Web Token) est ensuite généré et enregistré dans le navigateur pour autoriser les requêtes subséquentes.

> [!IMPORTANT]
> **[INSERTION CAPTURE D'ÉCRAN 07 : Interface de Connexion Admin]**
> *Description : Formulaire de login épuré et sécurisé avec gestion des erreurs d'authentification.*

### 2- Tableau de bord principal (Dashboard)
Le tableau de bord centralise les statistiques clés du site : indicateurs de trafic, nombre d'abonnés à la newsletter, messages reçus non traités et témoignages en attente de validation.

> [!IMPORTANT]
> **[INSERTION CAPTURE D'ÉCRAN 08 : Tableau de bord de l'Administrateur]**
> *Description : Écran d'accueil de la console d'administration affichant les graphiques ou compteurs statistiques (abonnés, témoignages en attente, messages).*

### 3- Gestion des contenus (CRUD Actions, Projets et Actualités)
L'administrateur dispose de formulaires complets pour ajouter, modifier ou supprimer des fiches d'actions, des projets ou des actualités. Ces formulaires prennent en charge le téléversement direct d'images d'illustration sur le serveur de fichiers.

> [!IMPORTANT]
> **[INSERTION CAPTURE D'ÉCRAN 09 : Formulaire de création / modification d'une Action]**
> *Description : Interface de saisie d'un nouveau contenu, montrant la sélection du projet parent, le champ d'upload d'image et la zone de texte.*

### 4- Modération des témoignages et abonnés
Cette section permet de gérer la redevabilité et la preuve sociale. Les témoignages soumis par le public n'apparaissent sur le site client qu'après approbation manuelle de l'administrateur depuis cette interface.

> [!IMPORTANT]
> **[INSERTION CAPTURE D'ÉCRAN 10 : Console de modération des Témoignages]**
> *Description : Liste des témoignages d'utilisateurs avec boutons d'action rapide pour approuver (publier) ou rejeter (supprimer).*

### 5- Gestion des messages et newsletter
Permet de visualiser les formulaires de contact reçus et d'exporter ou consulter la liste des abonnés inscrits pour les futures campagnes d'information.

> [!IMPORTANT]
> **[INSERTION CAPTURE D'ÉCRAN 11 : Visualisation de la messagerie interne]**
> *Description : Boîte de réception de l'administration listant les messages reçus et permettant de lire le détail de chaque message.*

---

## III- PLANS DE TESTS ET VALIDATION DES FONCTIONNALITÉS

Les tests fonctionnels visent à valider la conformité du système vis-à-vis du cahier des charges et des modélisations établies au Chapitre 3.

### 1- Tableau récapitulatif des tests de fonctionnement

| Réf Test | Fonctionnalité testée | Scénario & Données saisies | Résultat attendu | Statut |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Authentification Admin | Saisie d'identifiants valides (email/password) dans le login. | Génération du JWT, redirection vers le tableau de bord et affichage des menus restreints. | **Conforme** |
| **TC-02** | Rejet d'accès non autorisé | Tentative d'accès manuel à `/admin/dashboard` sans token JWT. | Interception par le routeur de sécurité, redirection forcée vers le login. | **Conforme** |
| **TC-03** | Validation des données (Joi) | Tentative de soumission d'une Action sans titre ou sans projet associé. | Rejet par l'API, affichage d'un message d'erreur explicite sans plantage du serveur. | **Conforme** |
| **TC-04** | Publication de News et Mail | Création d'une actualité avec case "Notifier les abonnés" cochée. | Persistance de la news en BDD et envoi automatique en tâche de fond des emails via Nodemailer. | **Conforme** |
| **TC-05** | Formulaire de contact | Saisie et envoi d'un message de contact valide depuis le site public. | Message enregistré en BDD MongoDB et apparition instantanée dans le panel admin. | **Conforme** |
| **TC-06** | Modération asynchrone | Approbation d'un témoignage en attente dans la console d'administration. | Passage du statut à "approuvé" en BDD et mise à jour instantanée du carrousel de la page d'accueil client. | **Conforme** |
| **TC-07** | Résilience (API Offline) | Déconnexion forcée de l'API serveur et navigation sur le site client. | Le client ne crash pas ; les sections dynamiques affichent proprement les données de secours statiques. | **Conforme** |

---

## CONCLUSION DU CHAPITRE

L'ensemble des tests fonctionnels menés démontre la conformité de l'application avec les objectifs initiaux de l'ONG BUSOLA. L'architecture modulaire garantit à la fois une résilience élevée côté client (fallbacks automatiques) et une flexibilité totale d'administration du contenu en temps réel. La solution est prête pour un déploiement en production.
