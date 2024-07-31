const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const connect = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    console.log('MySQL bağlantısı başarılı'.green);
    return connection;
  } catch (error) {
    console.error('MySQL bağlantı hatası:', error.message.red);
    throw error;
  }
};

module.exports = connect;
