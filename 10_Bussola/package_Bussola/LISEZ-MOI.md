# DOSSIER COMPLET DE CORRECTIONS — Mémoire ONG BUSOLA

**Mémoire :** Conception et développement d'une plateforme web pour l'ONG BUSOLA (CHITOU Bhilal & HOUNGUE Jolidon).
**Stack :** Node.js/Express + MongoDB (Mongoose) ; React (PWA) ; JWT ; Nodemailer.

## Contenu
- `Memoire_Bussola_corrige.docx` (+ `.pdf`) — corrections intégrées, chapitre par chapitre, 8 diagrammes UML insérés.
- `00_RAPPORT_DE_CORRECTIONS.md` — analyse globale par priorité.
- `01_RAPPORT_DETAILLE_CHAPITRE_PAR_CHAPITRE.md` — diagnostic + justifications.
- `03_BIBLIOGRAPHIE_VERIFIEE.md` — ajustements (Next.js) + appels de citation.
- `AUDIT_CODE_Bussola.md` — sécurité + surface d'attaque + fonctionnement + remarques (Express + React).
- `chapitres/` — un fichier par chapitre.
- `diagrammes/` — 8 diagrammes (.puml/.png/.svg) + README (classes et états reconstruits du code).

## Points saillants
- **[BON]** Page de garde correcte (« ENSEIGNEMENT SUPÉRIEUR ») ; **meilleure bibliographie** des mémoires traités (18 sources techniques réelles) ; code **bien sécurisé** (helmet, rate-limit, Joi, bcrypt, .env non committé).
- **[URGENT] Titre incohérent** entre page de garde et introduction — à harmoniser.
- **[URGENT] Doublon « CHAPITRE 4 »** — le second (présentation + tests) doit être « CHAPITRE 5 ».
- **[URGENT] Chatbot décrit mais absent du code** (aucun modèle/route/composant) — reformuler en perspective ou implémenter.
- **[IMPORTANT]** Aucun appel de citation ; section sécurité à compléter (helmet/rate-limit/Joi présents dans le code) ; retirer la référence Next.js (projet en React/Vite).
- **[Audit — MOYEN]** Secret JWT avec repli en dur (`'SECRET_PAR_DEFAUT_A_CHANGER'`) → fail-fast ; mot de passe min 6 → renforcer ; pas de tests automatisés.
- Diagrammes : classes/états issus du code (sans chatbot) ; à comparer aux figures d'origine (`docs/diagramme/`).
- Aucune source/URL/statistique inventée.

## Suggestions de code
- `02_SUGGESTIONS_CODE.md` — corrections de code prêtes à l'emploi (avant/après) pour les points relevés dans l'audit.
