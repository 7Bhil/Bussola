# Bussola - Portail Principal

Ce dépôt est le point d'entrée principal du projet **Bussola**. Il regroupe la documentation globale du projet, les diagrammes d'architecture et fournit un script d'initialisation pour cloner et configurer les différents composants (Client, Serveur, Admin).

---

## 📂 Structure du Projet

```text
Bussola/
├── docs/                      # Diagrammes d'architecture, cas d'utilisation et spécifications
├── setup.sh                   # Script d'initialisation pour cloner les sous-projets
├── .gitignore                 # Fichier d'exclusion Git pour éviter de pousser les dépendances et sous-projets
└── README.md                  # Ce fichier d'explication
```

Les sous-projets suivants sont hébergés sur des dépôts séparés et ne sont pas suivis directement par ce dépôt principal :
*   **client** (Frontend public) : `https://github.com/joboy05/ONGBusola-front`
*   **server** (API / Backend) : `https://github.com/joboy05/busola-server`
*   **admin** (Panel d'administration) : `https://github.com/joboy05/BusolaAdmin`

---

## 🚀 Démarrage Rapide

### 1. Cloner ce dépôt principal
Commencez par récupérer ce dépôt sur votre machine :
```bash
git clone https://github.com/7Bhil/Bussola.git Bussola
cd Bussola
```

### 2. Cloner et configurer les sous-projets
Exécutez le script d'initialisation pour cloner automatiquement les trois dépôts (`client`, `server`, `admin`) :
```bash
./setup.sh
```

---

## 🛠️ Lancement des Composants

Une fois le script exécuté, vous disposerez de trois sous-dossiers. Voici comment démarrer chaque partie :

### 💻 1. Frontend Client (`client/`)
Le client est une application React/Vite.
```bash
cd client
npm install
npm run dev
```

### ⚙️ 2. Backend Server (`server/`)
Le serveur est une API Node.js/Express.
1. Créez un fichier `.env` à partir du fichier d'exemple :
   ```bash
   cd server
   cp .env.example .env
   ```
2. Installez les dépendances et lancez le serveur :
   ```bash
   npm install
   npm run dev  # ou npm start
   ```

### 🔑 3. Panel Administration (`admin/`)
Le panel d'administration est une application React/Vite pour gérer le contenu.
```bash
cd admin
npm install
npm run dev
```

---

## 📚 Documentation
Le dossier `docs/` contient tous les schémas d'analyse de conception (Diagrammes de cas d'utilisation, d'activité, de séquence, modèle Entité-Association, diagrammes de classes). Vous pouvez les visualiser ou les éditer avec des outils comme [draw.io](https://app.diagrams.net/).
