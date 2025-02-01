const express = require("express");
const router = express.Router();
const { getWeatherController } = require("../controllers/weather-controller"); // Import controller cuaca

router.get("/", getWeatherController); // Endpoint untuk mendapatkan data cuaca

module.exports = router;
