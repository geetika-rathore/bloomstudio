require('dotenv').config();
const mongoose = require('mongoose');
const mysql = require('mysql2/promise');

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully.');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
};

const mysqlPool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const connectMySQL = async () => {
  try {
    const connection = await mysqlPool.getConnection(); 
    connection.release();
    console.log('MySQL connected successfully.');
  } catch (err) {
    console.error('MySQL connection error:', err.message);
  }
};

module.exports = { connectMongoDB, connectMySQL, mysqlPool };
 