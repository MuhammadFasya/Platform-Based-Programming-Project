const express = require("express");
const router = express.Router();
const {
  getAllCategoriesController,
  getCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/category-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.get("/", getAllCategoriesController);
router.get("/:id", getCategoryByIdController);

// Route yang membutuhkan autentikasi
router.post("/", authMiddleware, createCategoryController);
router.put("/:id", authMiddleware, updateCategoryController);
router.delete("/:id", authMiddleware, deleteCategoryController);

module.exports = router;
