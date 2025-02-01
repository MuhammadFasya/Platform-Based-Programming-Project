const db = require("../config/db");

const getAllEvents = async () => {
  try {
    const [rows] = await db.execute("SELECT * FROM events");
    return rows;
  } catch (error) {
    console.error("Error getting events:", error);
    throw error;
  }
};

const getEventById = async (id) => {
  try {
    const [rows] = await db.execute("SELECT * FROM events WHERE id = ?", [id]);
    return rows[0];
  } catch (error) {
    console.error("Error getting event by ID:", error);
    throw error;
  }
};

const createEvent = async (
  name,
  description,
  date,
  time,
  location,
  category_id,
  user_id
) => {
  try {
    const [result] = await db.execute(
      "INSERT INTO events (name, description, date, time, location, category_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, description, date, time, location, category_id, user_id]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

const updateEvent = async (
  id,
  name,
  description,
  date,
  time,
  location,
  category_id,
  user_id
) => {
  try {
    const [result] = await db.execute(
      "UPDATE events SET name = ?, description = ?, date = ?, time = ?, location = ?, category_id = ?, user_id = ? WHERE id = ?",
      [name, description, date, time, location, category_id, user_id, id]
    );
    return result.affectedRows;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

const deleteEvent = async (id) => {
  try {
    const [result] = await db.execute("DELETE FROM events WHERE id = ?", [id]);
    return result.affectedRows;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
