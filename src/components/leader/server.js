// server.js
const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const app = express();
const upload = multer();

app.post('/send-email', upload.fields([{ name: 'invoicePDF' }, { name: 'partnershipPDF' }]), async (req, res) => {
  try {
    const { email } = req.body;
    const invoicePDF = req.files['invoicePDF'][0];
    const partnershipPDF = req.files['partnershipPDF'][0];

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'votre-email@gmail.com',
        pass: 'votre-mot-de-passe',
      },
    });

    await transporter.sendMail({
      from: '"FlyPool" <votre-email@gmail.com>',
      to: email,
      subject: "Your Invoice and Partnership Documents",
      text: "Please find attached your invoice and partnership document.",
      attachments: [
        { filename: invoicePDF.originalname, content: invoicePDF.buffer },
        { filename: partnershipPDF.originalname, content: partnershipPDF.buffer },
      ],
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
