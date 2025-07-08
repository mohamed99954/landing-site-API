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
      facebook,
      instagram,
      twitter,
      linkedin,
      youtube,
      tiktok
    } = req.body;

    const updateFields = {
      logoText,
      welcomeMessage,
      aboutText,
      terms,
      privacyPolicy,
      socialLinks: {
        facebook,
        instagram,
        twitter,
        linkedin,
        youtube,
        tiktok
      }
    };

    // 🔽 Helper function لرفع صورة إلى cloudinary
    const uploadToCloudinary = (fileBuffer, folder) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder },
          (err, result) => {
            if (err) return reject(err);
            resolve(result.secure_url);
          }
        ).end(fileBuffer);
      });
    };

    // 🔹 الصور المفردة المطلوبة
    const fileFields = [
      { key: 'logoImage', folder: 'landing/logo' },
      { key: 'backgroundImage', folder: 'landing/background' },
      { key: 'hero1', folder: 'landing/hero' },
      { key: 'hero2', folder: 'landing/hero' },
      { key: 'hero3', folder: 'landing/hero' },
      { key: 'hero4', folder: 'landing/hero' },
      { key: 'hero5', folder: 'landing/hero' },
      { key: 'about1', folder: 'landing/about' },
      { key: 'about2', folder: 'landing/about' },
    ];

    for (const { key, folder } of fileFields) {
      if (req.files?.[key]?.[0]) {
        const buffer = req.files[key][0].buffer;
        const url = await uploadToCloudinary(buffer, folder);
        updateFields[key] = url;
      }
    }

    // 🔄 تحديث أو إدخال جديد
    const updated = await Landing.findOneAndUpdate({}, updateFields, {
      new: true,
      upsert: true,
    });

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