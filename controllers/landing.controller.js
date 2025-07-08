const Landing = require('../models/landing.model');

exports.updateLanding = async (req, res) => {
  try {
    const {
      logoText,
      welcomeMessage,
      aboutText,
      terms,
      privacyPolicy,
    } = req.body;

    const logoImage = req.files?.find(f => f.fieldname === 'logoImage')?.path || '';
    const backgroundImage = req.files?.find(f => f.fieldname === 'backgroundImage')?.path || '';

    const updated = await Landing.findOneAndUpdate(
      {},
      {
        logoText,
        welcomeMessage,
        aboutText,
        terms,
        privacyPolicy,
        ...(logoImage && { logoImage }),
        ...(backgroundImage && { backgroundImage }),
      },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLanding = async (req, res) => {
  const data = await Landing.findOne();
  res.json(data);
};