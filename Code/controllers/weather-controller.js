const fetch = require("node-fetch");
require("dotenv").config();

const getWeatherController = async (req, res) => {
  try {
    const city = req.query.city;
    if (!city) {
      return res.status(400).json({ message: "Parameter kota diperlukan" });
    }

    const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      // Cek kode status dari API OpenWeatherMap
      return res.status(data.cod).json({ message: data.message });
    }

    res.json(data);
  } catch (error) {
    console.error("Error in getWeatherController:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server saat mengambil data cuaca" });
  }
};

module.exports = { getWeatherController };
