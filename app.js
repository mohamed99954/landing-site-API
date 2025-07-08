const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// تحميل متغيرات البيئة
dotenv.config();

// استيراد الراوتات
const serviceRoutes = require('./routes/service.routes');
const articleRoutes = require('./routes/article.routes');
const projectRoutes = require('./routes/project.routes');
const landingRoutes = require('./routes/landing.routes');
const contactRoutes = require('./routes/contact.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

// ميدلويرات أساسية
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ملفات الصور
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ربط الراوتات
app.use('/api/services', serviceRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/landing', landingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// صفحة اختبار
app.get('/', (req, res) => {
  res.send('🚀 API is running');
});

module.exports = app;