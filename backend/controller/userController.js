const { createUser, getUserByEmail } = require('../models/user');
const { hashedPassword, createToken, comparePassword } = require('../services/authServices');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPass = await hashedPassword(password);
    const userId = await createUser({ name, email, password: hashedPass, admin: false });
    const token = await createToken({ id: userId, name });
    res.status(201).json({ message: "Registration successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (user && await comparePassword(password, user.password)) {
      const token = await createToken(user);
      res.status(200).json({ message: "Login successful", token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
