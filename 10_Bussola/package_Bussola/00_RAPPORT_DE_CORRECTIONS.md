# RAPPORT DE CORRECTIONS — Plateforme ONG BUSOLA

**Mémoire :** Conception et développement d'une plateforme web pour l'ONG BUSOLA
**Auteurs :** CHITOU Mouhamed Bhilal Aladé & HOUNGUE Missimahu Jolidon
**Encadrement :** Dr Meton Meton ATINDEHOU (maître de mémoire) ; Fadel KASSALI & Gérauld KAKI (maîtres de stage, UTC Services)
**Niveau :** Licence professionnelle — Informatique de gestion, IUT / Université de Parakou — 23ᵉ promotion — Juillet 2026
**Stack :** Node.js/Express + MongoDB (Mongoose) ; React (PWA) ; JWT ; Nodemailer

---

## APPRÉCIATION D'ENSEMBLE

Bon mémoire : page de garde **correcte** (« ENSEIGNEMENT SUPÉRIEUR »), introduction et problématique bien écrites (le « mur de silence numérique » d'une ONG), et **la meilleure bibliographie de tous les mémoires traités** (18 références techniques réelles, correctement formatées). Le code est **bien sécurisé** (helmet, rate-limit, Joi, bcrypt). Les corrections portent surtout sur des **incohérences** (titre, numérotation, chatbot) et l'absence d'appels de citation.

**Effort estimé :** 1 à 2 séances.

---

## PRIORITÉ 1 — URGENT

### 1.1 Incohérence de titre
- **Page de garde :** « Conception et Développement d'une Plateforme Web pour l'ONG BUSOLA ».
- **Introduction :** « Conception et réalisation d'une plateforme web intégrée de gestion et de promotion des actions sociales de l'ONG BUSOLA ».
→ **Harmoniser** (choisir un titre unique et l'employer partout).

### 1.2 Numérotation des chapitres (doublon)
Le mémoire contient **deux fois « CHAPITRE 4 : MISE EN ŒUVRE… »**. Le second (présentation de l'application + tests) doit être **« CHAPITRE 5 : PRÉSENTATION DE L'APPLICATION ET TESTS »**. La conclusion du premier chapitre 4 annonce d'ailleurs « le chapitre suivant présentera l'application… ».

### 1.3 Chatbot décrit mais absent du code
Le mémoire présente un **module chatbot** (ch. 4), la **conservation des conversations** en base (ch. 4) et un **diagramme de séquence « Interaction avec le Chatbot intelligent »** (ch. 3). Or **le code ne contient aucun chatbot** (ni modèle, ni route, ni composant — voir `AUDIT_CODE_Bussola.md`). Le chatbot n'est pas non plus mentionné dans les objectifs de l'introduction.
→ **Soit** reformuler ces passages en **perspective d'évolution**, **soit** implémenter réellement le module. À trancher avant la soutenance.

---

## PRIORITÉ 2 — IMPORTANT

### 2.1 Aucun appel de citation
La bibliographie (excellente) n'est **jamais citée** dans le corps du texte. Insérer des appels (ch. 4 : chaque technologie → sa référence ; ch. 2/intro : PAG, contexte).

### 2.2 Section sécurité à compléter (le code fait plus que le mémoire)
Le mémoire décrit HTTPS, validation serveur, JWT, bcrypt, traçabilité. Le code met **aussi** en place : en-têtes **helmet**, **limitation de débit (rate-limiting)** contre le brute force, et **validation par schémas Joi**. Ajouter ces éléments valorise le travail et reflète le code réel.

### 2.3 Style — listes à puces
Quelques listes à puces (objectifs et services au ch. 1, modules du back-end au ch. 4) à convertir en paragraphes ; les exigences fonctionnelles/non fonctionnelles peuvent rester en listes avec une phrase de cadrage.

---

## PRIORITÉ 3 — MINEUR

- **Référence Next.js** (webographie n° 2) : le projet utilise **React/Vite**, pas Next.js → référence hors sujet, à retirer.
- « React et a été retenus… » (ch. 4) → « React a été retenu… » (coquille).
- Harmoniser « BUSOLA » / « BUSOLA ONG » / « ONG BUSOLA ».
- L'« analyse d'audience » est citée en perspective alors que la collection `Traffic` existe déjà dans le code : préciser qu'un suivi de base est déjà en place.

---

## POINTS À VÉRIFIER (auteurs / code — voir l'audit)
- Les affirmations sécurité sont **exactes et même sous-estimées** (le code fait plus).
- **[MOYEN]** Secret JWT avec repli en dur (`'SECRET_PAR_DEFAUT_A_CHANGER'`) → à corriger (fail-fast).
- Politique de mot de passe (min 6) à renforcer ; ajouter des tests automatisés.

---

## PLAN DE CORRECTION (section par section)
1. **Page de garde / intro** — harmoniser le titre.
2. **Chapitres** — renuméroter le second « chapitre 4 » en **chapitre 5**.
3. **Ch. 3 & 4** — traiter le chatbot (perspective ou implémentation) ; retirer le diagramme de séquence chatbot si non implémenté.
4. **Ch. 4 (sécurité)** — ajouter helmet, rate-limiting, Joi.
5. **Ch. 1 / ch. 4** — listes → paragraphes ; coquille « React et a été retenus ».
6. **Bibliographie** — retirer Next.js ; insérer les appels de citation.

*Principe : aucune source, URL ou statistique inventée. Éléments non vérifiables signalés `[À VÉRIFIER]`.*
