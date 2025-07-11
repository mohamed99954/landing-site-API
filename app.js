// app.js (مع خطأ متعمد)

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

// استيراد الراوتات (افتراض أن أحدها غير موجود أو undefined)
const serviceRoutes = require('./routes/service.routes');
const articleRoutes = require('./routes/article.routes');
const projectRoutes = undefined; // ⛔ خطأ متعمد هنا
const landingRoutes = require('./routes/landing.routes');
const contactRoutes = require('./routes/contact.routes');
const adminRoutes = require('./routes/admin.routes');
const featureRoutes = require('./routes/feature.routes');

// Middleware للحماية
const { verifyToken } = require('./middlewares/auth.middleware');

// إنشاء تطبيق Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ الراوتات العامة
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/landing', landingRoutes);

// ✅ الراوتات المحمية بالتوكن
app.use('/api/services', verifyToken, serviceRoutes);
app.use('/api/articles', verifyToken, articleRoutes);

// ⛔ هذا السطر سيتسبب في الخطأ
app.use('/api/projects', verifyToken, projectRoutes);

app.use('/api/features', verifyToken, featureRoutes);

// ✅ مسار فحص
app.get('/', (req, res) => {
  res.send('🚀 API is running (via Render)');
});

module.exports = app;