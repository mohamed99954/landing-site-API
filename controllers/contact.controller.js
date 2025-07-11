const Contact = require('../models/contact.model');
const nodemailer = require('nodemailer');

// ✅ إنشاء رسالة تواصل + إرسال إيميل
exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'الاسم، البريد، والرسالة مطلوبة' });
    }

    const savedMessage = await Contact.create({ name, email, message });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_RECEIVER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

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

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: '✅ تم إرسال الرسالة بنجاح',
      data: savedMessage
    });
  } catch (err) {
    console.error('❌ فشل في إرسال الرسالة:', err.message);
    res.status(500).json({ error: '❌ حدث خطأ أثناء إرسال الرسالة' });
  }
};

// ✅ جلب كل الرسائل
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error('❌ فشل في جلب الرسائل:', err.message);
    res.status(500).json({ error: '❌ فشل في جلب الرسائل' });
  }
};