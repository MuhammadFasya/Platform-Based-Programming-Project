const express = require("express");
const router = express.Router();
const {
  getAllEventsController,
  getEventByIdController,
  createEventController,
  updateEventController,
  deleteEventController,
} = require("../controllers/event-controller");
const authMiddleware = require("../middlewares/auth-middleware"); // Import middleware autentikasi

router.get("/", getAllEventsController);
router.get("/:id", getEventByIdController);

// Route yang membutuhkan autentikasi
router.post("/", authMiddleware, createEventController);
router.put("/:id", authMiddleware, updateEventController);
router.delete("/:id", authMiddleware, deleteEventController);

module.exports = router;
