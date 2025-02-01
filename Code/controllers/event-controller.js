const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../models/event");

const getAllEventsController = async (req, res) => {
  try {
    const events = await getAllEvents();
    res.json(events);
  } catch (error) {
    console.error("Error in getAllEventsController:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

const getEventByIdController = async (req, res) => {
  try {
    const event = await getEventById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event tidak ditemukan" });
    }
    res.json(event);
  } catch (error) {
    console.error("Error in getEventByIdController:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

const createEventController = async (req, res) => {
  try {
    const { name, description, date, time, location, category_id, user_id } =
      req.body;
    const newEventId = await createEvent(
      name,
      description,
      date,
      time,
      location,
      category_id,
      user_id
    );
    res
      .status(201)
      .json({ id: newEventId, message: "Event berhasil ditambahkan" });
  } catch (error) {
    console.error("Error in createEventController:", error);
    res.status(500).json({ message: "Gagal menambahkan event" });
  }
};

const updateEventController = async (req, res) => {
  try {
    const { name, description, date, time, location, category_id, user_id } =
      req.body;
    const affectedRows = await updateEvent(
      req.params.id,
      name,
      description,
      date,
      time,
      location,
      category_id,
      user_id
    );
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Event tidak ditemukan" });
    }
    res.json({ message: "Event berhasil diupdate" });
  } catch (error) {
    console.error("Error in updateEventController:", error);
    res.status(500).json({ message: "Gagal mengupdate event" });
  }
};

const deleteEventController = async (req, res) => {
  try {
    const affectedRows = await deleteEvent(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Event tidak ditemukan" });
    }
    res.json({ message: "Event berhasil dihapus" });
  } catch (error) {
    console.error("Error in deleteEventController:", error);
    res.status(500).json({ message: "Gagal menghapus event" });
  }
};

module.exports = {
  getAllEventsController,
  getEventByIdController,
  createEventController,
  updateEventController,
  deleteEventController,
};
