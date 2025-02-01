const express = require("express");
const router = express.Router();
const { getLocationController } = require("../controllers/location-controller");

router.get("/", getLocationController);

module.exports = router;
