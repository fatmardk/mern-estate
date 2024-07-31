const { createUser, getUserByEmail } = require('../models/user');

const registerUser = async (req, res) => {
  const { name, email, password, admin } = req.body;
  try {
    const userId = await createUser({ name, email, password, admin });
    res.status(201).json({ id: userId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (user && user.password === password) {
      res.status(200).json({ id: user.id, name: user.name, email: user.email });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
