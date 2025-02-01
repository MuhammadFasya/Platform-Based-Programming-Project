const express = require("express");
const router = express.Router();
const {
  getAllOrdersController,
  getOrderByIdController,
  createOrderController,
  updateOrderController,
  deleteOrderController,
} = require("../controllers/order-controller");
const authMiddleware = require("../middlewares/auth-middleware"); // Import middleware autentikasi

router.get("/", getAllOrdersController);
router.get("/:id", getOrderByIdController);

// Route yang membutuhkan autentikasi
router.post("/", authMiddleware, createOrderController);
router.put("/:id", authMiddleware, updateOrderController);
router.delete("/:id", authMiddleware, deleteOrderController);

module.exports = router;
