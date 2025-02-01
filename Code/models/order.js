const db = require("../config/db");

const getAllOrders = async () => {
  try {
    const [rows] = await db.execute("SELECT * FROM orders");
    return rows;
  } catch (error) {
    console.error("Error getting orders:", error);
    throw error;
  }
};

const getOrderById = async (id) => {
  try {
    const [rows] = await db.execute("SELECT * FROM orders WHERE id = ?", [id]);
    return rows[0];
  } catch (error) {
    console.error("Error getting order by ID:", error);
    throw error;
  }
};

const createOrder = async (user_id, event_id, quantity) => {
  try {
    const [result] = await db.execute(
      "INSERT INTO orders (user_id, event_id, quantity) VALUES (?, ?, ?)",
      [user_id, event_id, quantity]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

const updateOrder = async (id, user_id, event_id, quantity) => {
  try {
    const [result] = await db.execute(
      "UPDATE orders SET user_id = ?, event_id = ?, quantity = ? WHERE id = ?",
      [user_id, event_id, quantity, id]
    );
    return result.affectedRows;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

const deleteOrder = async (id) => {
  try {
    const [result] = await db.execute("DELETE FROM orders WHERE id = ?", [id]);
    return result.affectedRows;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
