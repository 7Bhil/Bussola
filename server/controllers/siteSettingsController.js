const SiteSettings = require('../models/SiteSettings');

// GET /api/settings - Obtenir la configuration actuelle du site
exports.getSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      // Créer la configuration par défaut si elle n'existe pas encore
      settings = new SiteSettings({});
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    next(error);
  }
};

// PUT /api/settings - Mettre à jour la configuration du site (Admin uniquement)
exports.updateSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings(req.body);
    } else {
      // Fusionner les données reçues avec l'objet existant
      Object.assign(settings, req.body);
    }

    const updatedSettings = await settings.save();
    res.json({ message: 'Configuration du site mise à jour avec succès !', settings: updatedSettings });
  } catch (error) {
    next(error);
  }
};
