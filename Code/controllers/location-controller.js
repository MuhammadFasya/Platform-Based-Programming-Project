const fetch = require("node-fetch");

const getLocationController = async (req, res) => {
  try {
    const address = req.query.address;
    if (!address) {
      return res.status(400).json({ message: "Parameter alamat diperlukan" });
    }

    const encodedAddress = encodeURIComponent(address);
    const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.length === 0) {
      return res.status(404).json({ message: "Lokasi tidak ditemukan" });
    }

    res.json(data[0]); // Mengirim data lokasi pertama yang ditemukan
  } catch (error) {
    console.error("Error in getLocationController:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server saat mencari lokasi" });
  }
};

module.exports = { getLocationController };
