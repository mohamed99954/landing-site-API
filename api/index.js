const app = require('../app');

// ملف الدخول الرئيسي لـ Vercel
module.exports = (req, res) => {
  // Express app يتم التعامل معه مباشرة
  return app(req, res);
};