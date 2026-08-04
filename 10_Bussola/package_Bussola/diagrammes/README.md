# DIAGRAMMES UML — Plateforme ONG BUSOLA (reconstruction PlantUML)

Chaque diagramme : `.puml` (source) + `.png` + `.svg`. Le dépôt d'origine contient déjà des diagrammes (dossier `docs/diagramme/`, format draw.io) ; ceux-ci en sont une version reconstruite et fiabilisée, le **diagramme de classes et les diagrammes d'états étant repris du code réel** (modèles Mongoose).

| Fichier | Contenu |
|---|---|
| `fig01_uc_visiteur` | Cas d'utilisation — Visiteur (espace public) |
| `fig02_uc_admin` | Cas d'utilisation — Administrateur (unique) |
| `fig03_diagramme_classe` | Diagramme de classes (modèles Mongoose : User, News, Action, Project, Testimonial, Subscriber, Message, Traffic) |
| `fig04_seq_publication` | Séquence — publication d'une actualité et notification des abonnés (Nodemailer) |
| `fig05_seq_contact` | Séquence — envoi d'un message de contact (validation Joi) |
| `fig06_etat_message` | États — message de contact (nouveau → lu → traité) |
| `fig07_etat_action` | États — action (En attente → En cours → Terminé) |
| `fig08_deploiement` | Déploiement — client/admin React (PWA), API Node/Express, MongoDB, Nodemailer |

**Note :** le mémoire décrit un « chatbot » et un diagramme de séquence associé ; ce module **n'a pas été retrouvé dans le code** (aucun modèle, route ni composant). Les diagrammes reconstruits ci-dessus reflètent donc le système réellement implémenté, sans chatbot (voir le rapport de corrections et l'audit).
