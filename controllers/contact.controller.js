const Contact = require('../models/contact.model');
const nodemailer = require('nodemailer');

exports.sendContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 1. حفظ الرسالة في قاعدة البيانات
    const savedMessage = await Contact.create({ name, email, message });

    // 2. إعداد nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_RECEIVER,         // بريدك
        pass: process.env.EMAIL_PASSWORD          // كلمة مرور التطبيق
      }
    });

    // 3. إعداد محتوى الرسالة
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_RECEIVER,
      subject: 'رسالة جديدة من نموذج التواصل',
      html: `
        <h3>رسالة جديدة من ${name}</h3>
        <p><strong>البريد:</strong> ${email}</p>
        <p><strong>الرسالة:</strong><br>${message}</p>
      `
    };

    // 4. إرسال الإيميل
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'تم الإرسال بنجاح', data: savedMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'فشل في إرسال الرسالة' });
  }
};

exports.getAllContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
};