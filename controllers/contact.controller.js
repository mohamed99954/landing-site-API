const Contact = require('../models/contact.model');
const nodemailer = require('nodemailer');

exports.sendContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 1. حفظ الرسالة في قاعدة البيانات
    const savedMessage = await Contact.create({ name, email, message });

    // 2. إعداد البريد باستخدام Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_RECEIVER,   // بريد الاستلام
        pass: process.env.EMAIL_PASSWORD    // كلمة مرور التطبيق
      }
    });

    // 3. إعداد محتوى الرسالة
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_RECEIVER,
      subject: '📩 رسالة جديدة من نموذج التواصل',
      html: `
        <h2>📬 رسالة جديدة من ${name}</h2>
        <p><strong>البريد الإلكتروني:</strong> ${email}</p>
        <p><strong>الرسالة:</strong></p>
        <p>${message}</p>
      `
    };

    // 4. إرسال الإيميل
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: '✅ تم إرسال الرسالة بنجاح',
      data: savedMessage
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '❌ حدث خطأ أثناء إرسال الرسالة' });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: '❌ فشل في جلب الرسائل' });
  }
};