# CHAPITRE 3 : MODÉLISATION DU SYSTÈME FUTUR

La phase de modélisation constitue le pivot central de notre démarche d’ingénierie. Elle permet de traduire les besoins métier de l’ONG BUSOLA en une architecture technique cohérente, garantissant ainsi la pérennité et l’évolutivité de la solution.

## I- MODÉLISATION DES ACTEURS

### 1- Identification des acteurs du système
L’analyse des interactions avec la plateforme a permis d’identifier deux catégories d’utilisateurs :
*   **Le Visiteur / Abonné :** Tout individu accédant à la partie publique du site (partenaires, bénéficiaires, grand public).
*   **L’Administrateur :** Responsable de l'ONG habilité à piloter les contenus et à consulter les données via un espace sécurisé.

### 2- Rôles et fonctionnalités de chaque acteur
| Acteur | Rôles et Responsabilités |
| :--- | :--- |
| **Visiteur** | Consultation des piliers stratégiques, lecture des actualités, interaction avec le chatbot, envoi de messages (contact/partenariat), inscription à la newsletter. |
| **Administrateur** | Gestion intégrale du cycle de vie des données (Actions, Projets, News), modération des témoignages, gestion sécurisée du profil, analyse du trafic. |

### 3- Matrice d’escalade
La gestion des droits au sein de la plateforme suit une hiérarchie opérationnelle simple et robuste :
*   **Utilisateur Public :** Accès en lecture seule aux informations publiées et outils de contact.
*   **Administrateur :** Accès total aux fonctions de création, modification et suppression de contenus après authentification JWT.

### 4- Identification des acteurs (primaires ou secondaires)
*   **Acteur Primaire :** Celui qui initie l'action (ex: l'Admin pour la publication d'une actualité ou le Visiteur pour une demande de contact).
*   **Acteur Secondaire :** Celui qui est sollicité par le système ou bénéficie de l'action (ex: l'Abonné recevant une notification mail automatique générée par le serveur).

---

## II- MODÉLISATION DYNAMIQUE DU SYSTÈME

### 1- Diagramme des cas d’utilisation
Ce diagramme structure les fonctionnalités par domaine : l’espace public (Visiteur) et le tableau de bord (Admin), en mettant l’accent sur l’authentification comme prérequis systématique (relation <<include>>) de toutes les actions de gestion.

### 2- Descriptions textuelles de cas d’utilisation

#### a- Cas 1 : S'authentifier au panneau d'administration
*   **Acteur principal :** Administrateur
*   **Précondition :** Posséder un compte administrateur valide.
*   **Scénario nominal :** L'utilisateur saisit ses identifiants -> Le système vérifie la correspondance hachée en base de données -> Génération d'un token JWT -> Accès autorisé.

#### b- Cas 2 : Publier une actualité (avec notification)
*   **Acteur principal :** Administrateur
*   **Inclusion :** S'authentifier.
*   **Scénario :** Rédaction de l'article -> Validation -> Le système persiste la news et déclenche asynchronement l'envoi de mails à tous les inscrits de la newsletter.

#### c- Cas 3 : Envoyer un message de contact
*   **Acteur principal :** Visiteur
*   **Scénario :** Saisie du formulaire -> Validation du schéma de données -> Enregistrement en BDD -> Notification visuelle de succès.

### 3- Diagrammes des séquences

#### a- Publier une action liée à un projet
L’Administrateur soumet le formulaire d'action -> L'API valide le token et le contenu (Joi) -> Création du document dans MongoDB avec référence obligatoire au projet parent -> Réponse de succès.

#### b- Publication d'actualité et Notification
Ce flux montre l'interaction entre le contrôleur News et le service Mailer. Après insertion en BDD, le système récupère dynamiquement la liste des abonnés pour initier l'envoi groupé via Nodemailer.

#### c- Interaction avec le Chatbot intelligent
Flux purement Frontend montrant comment le composant React intercepte la saisie du visiteur, analyse les mots-clés localement et renvoie instantanément la réponse correspondant aux programmes de l'ONG.

### 4- Diagrammes d’activités

#### a- Processus de gestion de contenu
Workflow illustrant la connexion de l'admin, la bifurcation vers les différentes opérations (CRUD) et la convergence finale vers la mise à jour de la base de données.

#### b- Inscription à la newsletter
Cheminement du mail saisi par le visiteur, validation du format par le système et persistance finale pour les futures communications.

#### c- Cycle de modération des témoignages
Flux de sélection et de validation par l'admin pour l'affichage public des retours d'impact sur la page d'accueil.

### 5- Diagramme d’états
Modélisation des cycles de vie des entités : par exemple, le passage d'un message de l'état "Nouveau" à "Traité", ou d'une action de "En cours" à "Archivée".

---

## III- DIAGRAMME DES CLASSES

### 1- Glossaire

#### a- Définition de quelques termes
*   **PWA (Progressive Web App) :** Application web moderne installable et performante.
*   **JWT (JSON Web Token) :** Standard sécurisé pour l'échange de jetons d'authentification.
*   **Redevabilité :** Transparence et responsabilité d'une ONG vis-à-vis de son impact.

#### b- Glossaire de notre projet
*   **Pilier :** Axe stratégique d'intervention (ex: DSSR, Paix, Leadership).
*   **Action :** Activité terrain documentée et rattachée à un pilier.
*   **Traffic :** Données analytiques de fréquentation du site.

### 2- Règles de gestion
*   **RG1 :** L'authentification par token est obligatoire pour toute action d'écriture sur l'API.
*   **RG2 :** Toute action créée doit être obligatoirement associée à un ID de projet (pilier) valide.
*   **RG3 :** Les témoignages ne sont visibles publiquement qu'après validation explicite de l'Admin.
*   **RG4 :** La suppression d'un contenu est irréversible et entraîne le nettoyage des fichiers liés (images).

### 3- Diagramme Entité-Relation
Schématisation de la structure des documents MongoDB, mettant en évidence les relations de référence entre les objets (Actions/Projets).

### 4- Transformation du diagramme ER en diagramme de classe
Phase de traduction des schémas vers des classes logiques incluant les méthodes métier (comparePassword, etc.).

### 5- Diagramme des classes
Représentation statique finale regroupant les entités Admin, Project, Action, News, Testimonial, Message, Subscriber et Traffic.
