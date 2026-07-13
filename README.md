# 🧭 Bussola - Portail Web de l'ONG Busola

**Bussola** est une plateforme web intégrée conçue pour l'ONG **Busola**, basée à Parakou (Nord-Bénin). L'ONG œuvre activement dans les domaines de l'autonomisation des femmes, de la citoyenneté des jeunes, de la santé sexuelle et reproductive (DSSR), de la lutte contre les violences basées sur le genre (VBG) et de la cohésion sociale.

Cette plateforme regroupe trois composants principaux (Client, Serveur, Admin) au sein d'un dépôt unique structuré sous forme de monorepo, facilitant le développement et le déploiement.

Le mémoire de fin d'études détaillant la conception, le développement et la validation opérationnelle du projet est disponible à la racine du dépôt : [Memoire Bhilal Jolidon.docx](./Memoire%20Bhilal%20Jolidon.docx).

---

## 📂 Structure du Dépôt

```text
Bussola/
├── client/                     # Frontend public (Vite + React + TypeScript)
├── admin/                      # Panel d'administration (Vite + React + Tailwind CSS)
├── server/                     # Backend API (Node.js + Express + MongoDB)
├── docs/                       # Spécifications et diagrammes d'architecture
│   └── diagramme/              # Diagrammes de classes, de cas d'utilisation, de séquence, etc.
├── Memoire Bhilal Jolidon.docx # Mémoire de fin d'études
└── README.md                   # Ce fichier d'explication
```

---

## 🛠️ Aperçu des Composants

### 💻 1. Portail Public (`client/`)
Le site vitrine destiné au grand public pour s'informer et interagir avec l'ONG.
*   **Technologies** : React, TypeScript, Vite, Framer Motion, Bootstrap CSS, Lucide Icons.
*   **Fonctionnalités** :
    *   Présentation de l'ONG (Histoire, missions, valeurs).
    *   Affichage dynamique des programmes d'actions (PAGEDA, YES, TEDIDJO) et des actualités.
    *   Formulaires d'interaction : Contact, inscription à la Newsletter.
    *   **Assistant Virtuel (Chatbot)** : Un agent conversationnel intelligent pour orienter les utilisateurs sur les programmes, l'équipe et les contacts de l'ONG.
    *   Optimisation des performances : Intégration d'images optimisées au format WebP.

### 🔑 2. Panel d'Administration (`admin/`)
Une interface d'administration sécurisée permettant aux membres autorisés de l'ONG de gérer le contenu en temps réel.
*   **Technologies** : React, Tailwind CSS, Vite, Axios.
*   **Fonctionnalités** :
    *   Gestion du contenu dynamique : Création, modification et suppression des actions (programmes) et des actualités.
    *   Gestion des témoignages (modération et affichage dynamique sur le portail).
    *   Gestion des administrateurs et des rôles.
    *   Visualisation des messages reçus via le formulaire de contact.
    *   Suivi de la liste des abonnés à la newsletter (et exports de données).
    *   Tableau de bord statistique : Suivi du trafic web et des interactions.

### ⚙️ 3. Serveur API (`server/`)
L'API REST centralisée gérant la logique métier et la persistance des données.
*   **Technologies** : Node.js, Express, MongoDB (via Mongoose).
*   **Sécurité & Robustesse** :
    *   Authentification sécurisée par JWT (JSON Web Tokens) et hachage de mot de passe avec `bcryptjs`.
    *   Validation des données via le validateur `Joi`.
    *   Protection des headers HTTP avec `helmet`.
    *   Limitation de débit pour prévenir les abus avec `express-rate-limit`.
    *   Service d'envoi d'e-mails automatique avec `nodemailer`.

---

## 🚀 Démarrage Rapide en Local

Pour lancer l'ensemble de la plateforme sur votre machine, suivez les étapes ci-dessous.

### Prérequis
*   **Node.js** (v18 ou supérieur recommandé)
*   **npm** ou **yarn**
*   Une instance locale ou distante de **MongoDB**

### 1. Configuration du Serveur API (`server/`)
1.  Rendez-vous dans le dossier du serveur :
    ```bash
    cd server
    ```
2.  Installez les dépendances :
    ```bash
    npm install
    ```
3.  Créez un fichier de configuration `.env` à partir du fichier d'exemple :
    ```bash
    cp .env.example .env
    ```
    *Remplissez les variables comme la connexion MongoDB (`MONGODB_URI`), la clé de sécurité pour l'inscription d'un admin (`ADMIN_MASTER_PASSWORD`), le secret JWT (`JWT_SECRET`) et les paramètres SMTP pour l'envoi d'emails.*
4.  Optionnel : Créez le premier administrateur (seeding) :
    ```bash
    npm run seed-admin
    ```
5.  Lancez le serveur en mode développement :
    ```bash
    npm run dev
    ```
    Le serveur tourne par défaut sur le port `5000` (`http://localhost:5000`).

### 2. Configuration du Portail Client (`client/`)
1.  Rendez-vous dans le dossier client (ouvrez un nouveau terminal) :
    ```bash
    cd client
    ```
2.  Installez les dépendances :
    ```bash
    npm install
    ```
3.  Créez un fichier `.env` (optionnel si vous tournez en local par défaut) :
    ```env
    VITE_API_URL=http://localhost:5000
    ```
4.  Lancez le serveur de développement :
    ```bash
    npm run dev
    ```
    L'application client sera généralement accessible sur `http://localhost:5173`.

### 3. Configuration du Panel Administration (`admin/`)
1.  Rendez-vous dans le dossier admin (ouvrez un nouveau terminal) :
    ```bash
    cd admin
    ```
2.  Installez les dépendances :
    ```bash
    npm install
    ```
3.  Créez un fichier `.env` (ou `.env.local`) :
    ```env
    VITE_API_URL=http://localhost:5000
    ```
4.  Lancez l'application en mode développement :
    ```bash
    npm run dev
    ```
    Le panel sera généralement accessible sur `http://localhost:5174` (ou le premier port disponible).

---

## 📚 Modélisation et Conception (`docs/`)

Le dossier `docs/diagramme/` contient les schémas d'analyse de conception au format `.drawio` (éditables sur [draw.io](https://app.diagrams.net/)) et `.png` :
*   **Diagramme de classes** : Représente la structure orientée objet de l'application.
*   **Diagramme Modèle Entité-Association (ER)** : Modélise la structure de la base de données MongoDB.
*   **Diagrammes de cas d'utilisation (Use Case)** : Décrit les interactions des utilisateurs (Visiteur, Administrateur).
*   **Diagrammes de séquence** : Détaillent les interactions d'abonnement, chatbot, actualités, et témoignages.
*   **Diagrammes d'état & d'activité** : Suivi des flux opérationnels de l'application.

---

## ✍️ Auteur
*   **Bhilal Jolidon** - *Conception, Développement et Rédaction du Mémoire*
