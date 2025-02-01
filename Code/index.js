const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

// Import route
const userRoutes = require("./routes/user-route");
const eventRoutes = require("./routes/event-route");
const categoryRoutes = require("./routes/category-route");
const orderRoutes = require("./routes/order-route");
const locationRoutes = require("./routes/location-route");
const weatherRoutes = require("./routes/weather-route");
const emailRoutes = require("./routes/email-route");

// Middleware
app.use(cors());
app.use(express.json()); // Untuk parsing body request JSON
app.use(express.urlencoded({ extended: true })); // Untuk parsing body request URL encoded

// Gunakan route
app.use("/api/users", userRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/email", emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server run on  http://localhost:${PORT}`));
