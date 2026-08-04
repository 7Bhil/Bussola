# AUDIT DU CODE — Plateforme ONG BUSOLA (dépôt 7Bhil/Bussola)

**Projet :** plateforme web (site public + panneau d'administration) pour l'ONG BUSOLA. **Stack MERN :** backend Node.js/Express 5 + MongoDB (Mongoose) ; deux frontends React (`client/` public, `admin/`) ; JWT ; Nodemailer.
**Mémoire associé :** CHITOU Bhilal & HOUNGUE Jolidon.
**Portée :** analyse **statique** du code (sécurité défensive, surface d'attaque, fonctionnement, qualité). Aucune exécution, aucune attaque, aucun exploit.

---

## 1. AUDIT DE SÉCURITÉ

### Synthèse
**Aucune vulnérabilité critique ni élevée.** C'est un backend Express **bien sécurisé** : le code applique plusieurs bonnes pratiques que le mémoire ne mentionne même pas. Deux durcissements (moyens/faibles) et une incohérence fonctionnelle (chatbot) à traiter.

### ✅ Bonnes pratiques constatées (dans le code)
| Élément | Constat |
|---|---|
| En-têtes HTTP de sécurité | ✅ `helmet()` activé |
| Limitation de débit (anti-brute-force) | ✅ `express-rate-limit` (globalLimiter) |
| Validation des entrées | ✅ **Joi** (schémas auth, newsletter, contact, news…) |
| Hachage des mots de passe | ✅ **bcrypt** (salt, 10 tours), `comparePassword` |
| CORS | ✅ configuré avec options (origines maîtrisées) |
| Authentification | ✅ JWT, middleware de vérification sur les routes protégées |
| Secrets | ✅ **`.env` non committé** ; `.gitignore` correct |
| Minimisation des données | ✅ collection abonnés = e-mail seul |

> Le mémoire décrit HTTPS, validation serveur, JWT, bcrypt et traçabilité. **Le code va plus loin** (helmet, rate-limiting, Joi) : ces éléments gagneraient à être **ajoutés au mémoire** (voir corrections).

### Points à corriger

**🟠 [MOYEN] M1 — Secret JWT avec valeur de repli en dur.**
Dans `server/middleware/auth.js` :
`jwt.verify(token, process.env.JWT_SECRET || 'SECRET_PAR_DEFAUT_A_CHANGER')`.
Si `JWT_SECRET` n'est pas défini dans l'environnement, un secret **connu et prévisible** est utilisé → un attaquant pourrait forger des jetons valides.
*Correctif :* supprimer la valeur de repli et **échouer au démarrage** si `JWT_SECRET` est absent (fail-fast), plutôt que d'utiliser un secret par défaut.

**🟡 [FAIBLE] M2 — Politique de mot de passe faible.**
Le schéma Joi impose `password` ≥ **6** caractères. Relever à **8+** avec exigences de complexité, d'autant que ce compte est l'unique accès d'administration.

**🟡 [FAIBLE] M3 — Absence de tests automatisés.**
Le script `test` est un simple message d'erreur ; aucun test unitaire/intégration. Ajouter quelques tests (auth, publication, validation Joi) renforcerait la fiabilité.

---

## 2. INCOHÉRENCE MÉMOIRE ↔ CODE : LE CHATBOT

Le mémoire décrit un **module chatbot** (chapitre 4 : « traitement des requêtes des visiteurs et génération des réponses automatisées »), la **conservation des conversations** en base (chapitre 4, conception BDD), et un **diagramme de séquence « Interaction avec le Chatbot intelligent »** (chapitre 3).

**Or, ce module est absent du code :** aucun modèle `Conversation`/`Chatbot`, aucune route dédiée, aucun composant chatbot côté `client/` ou `admin/` (recherche `chatbot|conversation|dialogflow|openai|gpt` : aucun résultat). Le chatbot n'apparaît pas non plus dans les objectifs de l'introduction.

**Recommandation :** soit **retirer/reformuler** les passages sur le chatbot (le présenter comme une **perspective** d'évolution), soit **l'implémenter** avant la soutenance. Laisser le mémoire décrire une fonctionnalité inexistante expose à une question difficile du jury. (Traité aussi comme correction du mémoire.)

---

## 3. SURFACE D'ATTAQUE (test d'intrusion statique)

| Point d'entrée | Tentative | Protection |
|---|---|---|
| `/auth` (login admin) | Brute force | ✅ rate-limit + bcrypt ; ⚠ mot de passe min 6 (M2) |
| Routes protégées | Accès sans jeton | ✅ middleware JWT |
| Falsification de jeton | Forger un JWT | ⚠ repli de secret en dur (M1) |
| Formulaires publics | Injection / données malformées | ✅ validation Joi |
| En-têtes HTTP | Clickjacking, sniffing MIME… | ✅ helmet |
| Dépôt | Fuite de secrets | ✅ `.env` non committé |

**Priorité : M1 (secret JWT).**

---

## 4. AUDIT DE FONCTIONNEMENT (statique)

- **Backend :** Express structuré (controllers, middleware, models, routes, utils) ; 8 collections Mongoose (User, News, Action, Project, Testimonial, Subscriber, Message, Traffic) ; scripts d'administration (`seedAdmin`, `cleanupAdmins`, `exportAdmins`). Newsletter par **Nodemailer**. Suivi d'audience via la collection **Traffic**.
- **Frontends :** deux applications React (site public `client/` en PWA, `admin/` pour la gestion), Tailwind.
- **Fonctionnalités réelles :** CMS (actualités, actions, projets, témoignages), newsletter automatisée, formulaire de contact, statistiques d'audience. **Pas de chatbot** (cf. §2).

---

## 5. REMARQUES GÉNÉRALES

**Points forts :** posture de sécurité solide (helmet, rate-limit, Joi, bcrypt, `.env` non committé), séparation claire public/admin, code lisible, périmètre cohérent (administrateur unique).

**À améliorer :** M1 (secret JWT), M2 (politique de mot de passe), M3 (tests), et surtout **aligner le mémoire sur le code** concernant le chatbot.

---

## 6. PLAN D'ACTION PRIORISÉ

1. **M1** — supprimer le repli de secret JWT (fail-fast si `JWT_SECRET` absent).
2. **Chatbot** — reformuler en perspective dans le mémoire, ou implémenter le module.
3. **M2** — renforcer la politique de mot de passe (≥ 8, complexité).
4. **M3** — ajouter quelques tests automatisés.
5. Valoriser dans le mémoire les mesures réellement présentes (helmet, rate-limit, Joi).

---

*Méthode : analyse défensive du code, sans exécution ni attaque, sans exploit. Limites (pas d'exécution) signalées.*
