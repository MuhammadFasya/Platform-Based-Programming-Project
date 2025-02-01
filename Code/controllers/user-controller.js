const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  comparePassword,
} = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error in getAllUsersController:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server saat mengambil data user" });
  }
};

const getUserByIdController = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error in getUserByIdController:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server saat mengambil data user" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const newUserId = await createUser(name, email, password);
    res
      .status(201)
      .json({ id: newUserId, message: "User berhasil didaftarkan" });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server saat mendaftarkan user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "email tidak terdaftar" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "password salah" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error("Error in loginUser", error);
    res.status(500).json({ message: "Terjadi kesalahan server saat login" });
  }
};

const updateUsercontroller = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const affectedRows = await updateUser(req.params.id, name, email, password);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    res.json({ message: "User berhasil diupdate" });
  } catch (error) {
    console.error("Error in updateUsercontroller:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server saat mengupdate user" });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const affectedRows = await deleteUser(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    res.json({ message: "User berhasil dihapus" });
  } catch (error) {
    console.error("Error in deleteUserController:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server saat menghapus user" });
  }
};

module.exports = {
  getAllUsersController,
  getUserByIdController,
  registerUser,
  loginUser,
  updateUsercontroller,
  deleteUserController,
};
