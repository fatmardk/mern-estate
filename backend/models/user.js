const connectDB = require('../config/db');

const createUser = async ({ name, email, password, admin }) => {
  try {
    const connection = await connectDB();
    const [result] = await connection.execute(
      'INSERT INTO users (name, email, password, admin) VALUES (?, ?, ?, ?)',
      [name, email, password, admin]
    );
    return result.insertId;
  } catch (error) {
    throw new Error('Kullanıcı oluşturulamadı: ' + error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const connection = await connectDB();
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  } catch (error) {
    throw new Error('Kullanıcı bilgileri alınamadı: ' + error.message);
  }
};

module.exports = { createUser, getUserByEmail };
