const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmailController = async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    // Validasi input
    if (!to || !subject || !text) {
      return res
        .status(400)
        .json({ message: "Semua field (to, subject, text) harus diisi" });
    }

    // Konfigurasi transporter Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // atau layanan email lain seperti 'outlook', 'yahoo', dll.
      auth: {
        user: process.env.EMAIL_USER, // Email pengirim (dari .env)
        pass: process.env.EMAIL_PASS, // Password email pengirim (dari .env, sebaiknya App Password)
      },
    });

    // Opsi email
    const mailOptions = {
      from: process.env.EMAIL_USER, // Email pengirim
      to: to, // Email penerima (dari body request)
      subject: subject, // Subjek email (dari body request)
      text: text, // Isi email dalam format teks biasa (dari body request)
      // html: '<h1>Hello</h1><p>HTML version</p>' // Anda bisa menambahkan format HTML jika diperlukan
    };

    // Kirim email
    await transporter.sendMail(mailOptions);

    res.json({ message: "Email berhasil dikirim" }); // Kirim response sukses
  } catch (error) {
    console.error("Error in sendEmailController:", error);

    // Penanganan error yang lebih spesifik
    if (error.code === "EAUTH") {
      return res
        .status(401)
        .json({
          message:
            "Autentikasi email gagal. Periksa kredensial email Anda di .env.",
        });
    } else if (error.code === "EENVELOPE") {
      return res
        .status(400)
        .json({ message: "Format email penerima tidak valid." });
    }

    res
      .status(500)
      .json({ message: "Terjadi kesalahan server saat mengirim email" }); // Response error umum
  }
};

module.exports = { sendEmailController };
