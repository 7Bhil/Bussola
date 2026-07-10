# Roadmap Globale - Projet Bussola

Ce document récapitule toutes les tâches nécessaires pour finaliser la version entièrement dynamique et professionnelle de la plateforme.

## 1. Hiérarchie Dynamique (Projets > Actions > Galerie) - ✅ TERMINÉ
*L'objectif est de permettre à l'administrateur de créer ses propres catégories de projets sans limitation.*

- **Backend (Serveur) :**
    - [x] Créer le modèle `Project` (Titre, Description, Image de couverture, Couleur).
    - [x] Mettre à jour le modèle `Action` pour y ajouter une référence `project` (ObjectId).
    - [x] Développer le contrôleur et les routes API pour la gestion complète (CRUD) des projets.
- **Admin (Interface de gestion) :**
    - [x] Créer une page **"Gestion des Projets"** pour administrer les piliers de l'ONG.
    - [x] Mettre à jour le formulaire des **Actions** pour inclure une sélection du projet parent.
    - [x] Optimiser l'interface d'envoi d'images pour supporter l'upload massif (30+ photos par action).
- **Site Public (Frontend) :**
    - [x] Refondre la page **Galerie** pour qu'elle consomme les données de l'API (Projets + Actions).
    - [x] Mettre à jour la page **Album** pour afficher dynamiquement le contenu d'une action spécifique.

## 2. Améliorations & Maintenance Admin - ✅ TERMINÉ
- [x] **Sécurité :** Permettre la suppression des comptes administrateurs depuis la liste des utilisateurs.
- [x] **Sauvegarde :** Implémenter un script de backup automatique de la base de données MongoDB.
- [x] **Performance :** Ajouter une étape de compression des images côté client (canvas/browser-image-compression) avant l'upload pour économiser de la bande passante.

---
*Dernière mise à jour : 13 Juin 2026 (Mise à jour par Gemini CLI)*
