# Corrections de code — Bussola (ONG BUSOLA)

Stack : Node.js/Express + MongoDB. Deux corrections issues de l'audit — la première touche **deux fichiers**, pas un seul comme l'audit initial le laissait penser.

---

## 1. Secret JWT avec valeur de repli en dur

**Problème :** `process.env.JWT_SECRET || 'SECRET_PAR_DEFAUT_A_CHANGER'` — si la variable d'environnement n'est pas définie, un secret **connu et prévisible** est utilisé. C'est grave à deux endroits : à la **vérification** des jetons (`middleware/auth.js`, déjà repéré à l'audit) et à leur **signature** (`controllers/authController.js`, plus critique encore, car c'est ce qui permettrait à un attaquant de forger de faux jetons).

### `middleware/auth.js`

**Avant :**
```javascript
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentification requise (Token manquant)' });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'SECRET_PAR_DEFAUT_A_CHANGER');
    req.userData = { userId: decodedToken.userId, username: decodedToken.username };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Session invalide ou expirée' });
  }
};
```

**Après :**
```javascript
const jwt = require('jsonwebtoken');

// L'ancien code utilisait process.env.JWT_SECRET || 'SECRET_PAR_DEFAUT_A_CHANGER'
// — si la variable d'environnement n'était pas définie, un secret CONNU ET
// PRÉVISIBLE était utilisé, permettant à un attaquant de forger des jetons
// JWT valides. On échoue désormais au démarrage du serveur si JWT_SECRET est
// absent (fail-fast), plutôt que de se rabattre sur une valeur par défaut.
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error(
    "JWT_SECRET n'est pas défini dans l'environnement. " +
    "Définissez une valeur forte et unique dans le fichier .env avant de démarrer le serveur."
  );
}

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentification requise (Token manquant)' });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.userData = { userId: decodedToken.userId, username: decodedToken.username };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Session invalide ou expirée' });
  }
};
```

### `controllers/authController.js` (même repli, côté signature — non signalé à l'audit initial)

**Avant (en-tête du fichier) :**
```javascript
const User = require('../models/User');
const Traffic = require('../models/Traffic');
const jwt = require('jsonwebtoken');
```

**Avant (génération du jeton, dans la fonction de connexion) :**
```javascript
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET || 'SECRET_PAR_DEFAUT_A_CHANGER',
      { expiresIn: '24h' }
    );
```

**Après (en-tête du fichier) :**
```javascript
const User = require('../models/User');
const Traffic = require('../models/Traffic');
const jwt = require('jsonwebtoken');

// Même correctif que middleware/auth.js — plus de secret par défaut
// prévisible pour SIGNER les jetons (encore plus critique ici que pour
// la simple vérification).
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error(
    "JWT_SECRET n'est pas défini dans l'environnement. " +
    "Définissez une valeur forte et unique dans le fichier .env avant de démarrer le serveur."
  );
}
```

**Après (génération du jeton) :**
```javascript
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
```

---

## 2. Politique de mot de passe trop faible

**Fichier :** `middleware/validator.js`

**Avant :**
```javascript
  auth: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    masterPassword: Joi.string().allow('', null)
  }),
```

**Après :**
```javascript
  auth: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(8).required(), // 6 -> 8 caractères minimum
    masterPassword: Joi.string().allow('', null)
  }),
```
