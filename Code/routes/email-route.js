const express = require("express");
const router = express.Router();
const { sendEmailController } = require("../controllers/email-controller"); // Import controller email
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/", authMiddleware, sendEmailController); // Endpoint untuk mengirim email, membutuhkan autentikasi

module.exports = router;
