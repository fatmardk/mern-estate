const connection = require('../config/db');

const createUser = async (user) => {
  const [result] = await connection.execute(
    'INSERT INTO users (name, email, password, admin) VALUES (?, ?, ?, ?)',
    [user.name, user.email, user.password, user.admin]
  );
  return result.insertId;
};

const getUserByEmail = async (email) => {
  const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

module.exports = { createUser, getUserByEmail };
