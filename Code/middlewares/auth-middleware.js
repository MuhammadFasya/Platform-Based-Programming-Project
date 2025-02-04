const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Tidak ada token, otorisasi ditolak" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Menambahkan data user ke request

    // Ekstrak role pengguna dari payload token
    req.user.role = decoded.user.role;

    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    res.status(401).json({ message: "Token tidak valid" });
  }
};

module.exports = authMiddleware;
