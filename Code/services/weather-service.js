const fetch = require("node-fetch");
require("dotenv").config();

const getWeather = async (city) => {
  try {
    const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    if (!response.ok) {
      // Tangani error HTTP response
      const errorData = await response.json();
      throw new Error(
        `Error fetching weather: ${response.status} - ${errorData.message}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getWeather service:", error);
    throw error; // Penting untuk melempar error agar ditangani di controller
  }
};

module.exports = { getWeather };
