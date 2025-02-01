const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST, // Host database
  user: process.env.DB_USER, // Username database
  password: process.env.DB_PASSWORD, // Password database
  database: process.env.DB_NAME, // Nama database
  waitForConnections: true, // Tunggu koneksi jika semua koneksi sedang digunakan
  connectionLimit: 10, // Jumlah maksimum koneksi dalam pool
  queueLimit: 0, // Jumlah maksimum request yang diantrikan jika semua koneksi sibuk
});

module.exports = pool;
