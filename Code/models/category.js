const db = require("../config/db");

const getAllCategories = async () => {
  try {
    const [rows] = await db.execute("SELECT * FROM categories");
    return rows;
  } catch (error) {
    console.error("Error getting categories:", error);
    throw error;
  }
};

const getCategoryById = async (id) => {
  try {
    const [rows] = await db.execute("SELECT * FROM categories WHERE id = ?", [
      id,
    ]);
    return rows[0];
  } catch (error) {
    console.error("Error getting category by ID:", error);
    throw error;
  }
};

const createCategory = async (name) => {
  try {
    const [result] = await db.execute(
      "INSERT INTO categories (name) VALUES (?)",
      [name]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

const updateCategory = async (id, name) => {
  try {
    const [result] = await db.execute(
      "UPDATE categories SET name = ? WHERE id = ?",
      [name, id]
    );
    return result.affectedRows;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

const deleteCategory = async (id) => {
  try {
    const [result] = await db.execute("DELETE FROM categories WHERE id = ?", [
      id,
    ]);
    return result.affectedRows;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
