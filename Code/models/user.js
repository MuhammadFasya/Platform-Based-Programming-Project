const db = require("../config/db");
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
  try {
    const [rows] = await db.execute("SELECT * FROM users");
    return rows;
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  } catch (error) {
    console.error("Error getting user by email:", error);
    throw error;
  }
};

const createUser = async (name, email, password, role = "user") => {
  // Set default role to 'user'
  try {
    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const updateUser = async (id, name, email, password, role) => {
  try {
    let updateQuery = "UPDATE users SET name = ?, email = ?";
    let params = [name, email];

    // Update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateQuery += ", password = ?";
      params.push(hashedPassword);
    }

    // Update role if provided
    if (role) {
      updateQuery += ", role = ?";
      params.push(role);
    }

    updateQuery += " WHERE id = ?";
    params.push(id);

    const [result] = await db.execute(updateQuery, params);
    return result.affectedRows;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const [result] = await db.execute("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

const comparePassword = async (inputPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(inputPassword, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error comparing password", error);
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  comparePassword,
};
