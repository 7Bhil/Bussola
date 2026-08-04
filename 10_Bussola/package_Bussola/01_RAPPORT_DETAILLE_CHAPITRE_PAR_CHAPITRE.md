# CORRECTION DÉTAILLÉE — CHAPITRE PAR CHAPITRE (ONG BUSOLA)

**Auteurs :** CHITOU Bhilal & HOUNGUE Jolidon. `[À VÉRIFIER]` = à confirmer par les auteurs. Aucune source inventée.

## PAGE DE GARDE
**[BON]** « ENSEIGNEMENT SUPÉRIEUR » correct. **[URGENT]** Titre à harmoniser avec l'introduction (voir 1.1 du rapport global).

## INTRODUCTION
Bien rédigée (contexte PAG 2021-2026, « mur de silence numérique », objectifs). Corrections :
- Harmoniser le titre annoncé avec la page de garde.
- Insérer un appel de citation pour le PAG 2021-2026.
- **Cohérence de périmètre :** les objectifs listent CMS, newsletter, suivi d'audience — **mais pas le chatbot**, qui apparaît pourtant aux chapitres 3 et 4. Décider si le chatbot fait partie du périmètre (et alors l'ajouter aux objectifs et l'implémenter) ou non (et le retirer des chapitres 3-4).

## CHAPITRE 1 — LIEU DE STAGE
Bien rédigé (UTC Services, ONG BUSOLA). Convertir en paragraphes les listes à puces (objectifs, structure, services).

## CHAPITRE 2 — ÉTUDE DE L'EXISTANT
SWOT et BMC pertinents. Ajouter les appels de citation. Relecture.

## CHAPITRE 3 — MODÉLISATION
Riche (acteurs, cas d'utilisation, séquences, activités, états). **[URGENT] Retirer ou reformuler** le diagramme de séquence « Interaction avec le Chatbot intelligent » si le chatbot n'est pas implémenté. Diagrammes reconstruits en PlantUML (dossier `diagrammes/`) — classes et états repris du code réel, **sans chatbot** (conforme au code).

## CHAPITRE 4 — MISE EN ŒUVRE
- **[IMPORTANT] Compléter la section sécurité (VI)** : ajouter helmet (en-têtes HTTP), la limitation de débit (rate-limiting) et la validation par schémas Joi — réellement présents dans le code.
- **[URGENT] Chatbot :** le « Module chatbot » (V) et la conservation des conversations (II) décrivent une fonctionnalité absente du code. Reformuler en perspective ou implémenter.
- **[MINEUR]** Coquille « React et a été retenus » → « React a été retenu ».
- Listes de modules du back-end → phrase de cadrage + rédaction.

## CHAPITRE 5 (actuellement libellé « CHAPITRE 4 » — À RENUMÉROTER) — PRÉSENTATION & TESTS
- **[URGENT] Renuméroter en CHAPITRE 5.**
- Présentation des interfaces (public + admin) : bien rédigée, conservée.
- Tests : préciser la nature (tests fonctionnels manuels ; le code ne contient pas de tests automatisés).

## CONCLUSION
Bien écrite, avec de bonnes perspectives (SSL, dons mobiles, application native, multi-administrateurs, analyse d'audience, traduction fon/bariba). Préciser que le suivi d'audience (collection `Traffic`) est déjà partiellement en place.

## BIBLIOGRAPHIE
Excellente. Retirer la référence Next.js (hors sujet) et insérer les appels de citation (voir `03_BIBLIOGRAPHIE_VERIFIEE.md`).

## SYNTHÈSE DES PRIORITÉS
**Urgent :** titre harmonisé · doublon chapitre 4 → chapitre 5 · chatbot (perspective ou implémentation).
**Important :** appels de citation · section sécurité complétée (helmet/rate-limit/Joi) · listes → paragraphes.
**Mineur :** Next.js retiré · coquille « React » · harmonisation « ONG BUSOLA ».
