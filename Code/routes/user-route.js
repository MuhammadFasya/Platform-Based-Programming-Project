const express = require("express");
const router = express.Router();
const {
  getAllUsersController,
  getUserByIdController,
  registerUser,
  loginUser,
  updateUsercontroller,
  deleteUserController,
} = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");

// Route publik (tanpa autentikasi)
router.post("/register", registerUser); // Registrasi user baru
router.post("/login", loginUser); // Login user dan mendapatkan token JWT

// Route yang membutuhkan autentikasi
router.get("/", authMiddleware, getAllUsersController); // Mendapatkan semua user (membutuhkan autentikasi)
router.get("/:id", authMiddleware, getUserByIdController); // Mendapatkan user berdasarkan ID (membutuhkan autentikasi)
router.put("/:id", authMiddleware, updateUsercontroller); // Mengupdate data user (membutuhkan autentikasi)
router.delete("/:id", authMiddleware, deleteUserController); // Menghapus user (membutuhkan autentikasi)

module.exports = router;
