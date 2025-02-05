const express = require("express");
const router = express.Router();
const {
  getAllUsersController,
  getUserByIdController,
  registerUser,
  loginUser,
  updateUsercontroller,
  deleteUserController,
  createUser,
  updateUserRoleController,
} = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

// Route publik (tanpa autentikasi)
router.post("/register", registerUser); // Registrasi user baru
router.post("/login", loginUser); // Login user dan mendapatkan token JWT

// Route yang membutuhkan autentikasi
router.get("/", authMiddleware, adminMiddleware, getAllUsersController); // Hanya admin yang bisa melihat semua pengguna
router.get("/:id", authMiddleware, getUserByIdController); // Pengguna bisa melihat profilnya sendiri atau admin bisa melihat profil pengguna lain
router.put("/:id", authMiddleware, updateUsercontroller); // Hanya admin atau pengguna itu sendiri yang bisa mengubah data
router.delete("/:id", authMiddleware, adminMiddleware, deleteUserController); // Hanya admin yang bisa menghapus pengguna

// Route khusus untuk admin
router.post("/users", authMiddleware, adminMiddleware, createUser); // Hanya admin yang bisa membuat pengguna baru
router.put(
  "/:id/role",
  authMiddleware,
  adminMiddleware,
  updateUserRoleController
);
module.exports = router;
