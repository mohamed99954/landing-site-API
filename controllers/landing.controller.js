const Landing = require('../models/landing.model');
const cloudinary = require('../config/cloudinary');

exports.updateLanding = async (req, res) => {
  try {
    const {
      logoText,
      welcomeMessage,
      aboutText,
      terms,
      privacyPolicy,
    } = req.body;

    const updateFields = {
      logoText,
      welcomeMessage,
      aboutText,
      terms,
      privacyPolicy,
    };

    // رفع logoImage إلى Cloudinary
    if (req.files?.logoImage?.[0]) {
      const logoBuffer = req.files.logoImage[0].buffer;
      const logoResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'landing/logo' },
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        ).end(logoBuffer);
      });

      updateFields.logoImage = logoResult.secure_url;
    }

    // رفع backgroundImage إلى Cloudinary
    if (req.files?.backgroundImage?.[0]) {
      const bgBuffer = req.files.backgroundImage[0].buffer;
      const bgResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'landing/background' },
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        ).end(bgBuffer);
      });

      updateFields.backgroundImage = bgResult.secure_url;
    }

    // تحديث أو إنشاء البيانات
    const updated = await Landing.findOneAndUpdate(
      {},
      updateFields,
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getLanding = async (req, res) => {
  try {
    const data = await Landing.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};