const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../models/order");

const getAllOrdersController = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error("Error in getAllOrdersController:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server saat mengambil data order" });
  }
};

const getOrderByIdController = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order tidak ditemukan" });
    }
    res.json(order);
  } catch (error) {
    console.error("Error in getOrderByIdController:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server saat mengambil data order" });
  }
};

const createOrderController = async (req, res) => {
  try {
    const { user_id, event_id, quantity } = req.body;
    const newOrderId = await createOrder(user_id, event_id, quantity);
    res.status(201).json({ id: newOrderId, message: "Order berhasil dibuat" });
  } catch (error) {
    console.error("Error in createOrderController:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server saat membuat order" });
  }
};

const updateOrderController = async (req, res) => {
  try {
    const { user_id, event_id, quantity } = req.body;
    const affectedRows = await updateOrder(
      req.params.id,
      user_id,
      event_id,
      quantity
    );
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Order tidak ditemukan" });
    }
    res.json({ message: "Order berhasil diupdate" });
  } catch (error) {
    console.error("Error in updateOrderController:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server saat mengupdate order" });
  }
};

const deleteOrderController = async (req, res) => {
  try {
    const affectedRows = await deleteOrder(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Order tidak ditemukan" });
    }
    res.json({ message: "Order berhasil dihapus" });
  } catch (error) {
    console.error("Error in deleteOrderController:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server saat menghapus order" });
  }
};

module.exports = {
  getAllOrdersController,
  getOrderByIdController,
  createOrderController,
  updateOrderController,
  deleteOrderController,
};
