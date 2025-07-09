const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

// استيراد الراوتات
const serviceRoutes = require('./routes/service.routes');
const articleRoutes = require('./routes/article.routes');
const projectRoutes = require('./routes/project.routes');
const landingRoutes = require('./routes/landing.routes');
const contactRoutes = require('./routes/contact.routes');
const adminRoutes = require('./routes/admin.routes');
const featureRoutes = require('./routes/feature.routes');

// ✅ استيراد الـ Middleware للحماية
const { verifyToken } = require('./middlewares/auth.middleware');

// إعداد التطبيق
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// تقديم ملفات الصور الثابتة (لرفع البانر أو الصور)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ ربط الراوتات العامة (غير محمية)
app.use('/api/admin', adminRoutes);         // تسجيل دخول / إنشاء أدمن
app.use('/api/contact', contactRoutes);     // نموذج التواصل
app.use('/api/landing', landingRoutes);

// ✅ ربط الراوتات المحمية (بعد التوكن)
app.use('/api/services', verifyToken, serviceRoutes);
app.use('/api/articles', verifyToken, articleRoutes);
app.use('/api/projects', verifyToken, projectRoutes);
app.use('/api/features', verifyToken, featureRoutes);

// نقطة فحص للتأكد من أن السيرفر يعمل
app.get('/', (req, res) => {
  res.send('🚀 API is running');
});

module.exports = app;