const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../models/category");

const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error in getAllCategoriesController:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

const getCategoryByIdController = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }
    res.json(category);
  } catch (error) {
    console.error("Error in getCategoryByIdController:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

const createCategoryController = async (req, res) => {
  try {
    const newCategoryId = await createCategory(req.body.name);
    res
      .status(201)
      .json({ id: newCategoryId, message: "Kategori berhasil ditambahkan" });
  } catch (error) {
    console.error("Error in createCategoryController:", error);
    res.status(500).json({ message: "Gagal menambahkan kategori" });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const affectedRows = await updateCategory(req.params.id, req.body.name);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }
    res.json({ message: "Kategori berhasil diupdate" });
  } catch (error) {
    console.error("Error in updateCategoryController:", error);
    res.status(500).json({ message: "Gagal mengupdate kategori" });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const affectedRows = await deleteCategory(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }
    res.json({ message: "Kategori berhasil dihapus" });
  } catch (error) {
    console.error("Error in deleteCategoryController:", error);
    res.status(500).json({ message: "Gagal menghapus kategori" });
  }
};

module.exports = {
  getAllCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
