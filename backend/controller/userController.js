const { validationResult } = require("express-validator");
const UserModel = require('../models/user');
const { hashedPassword, createToken, comparePassword } = require('../services/authServices');

//@route  POST  /api/register
//@access Public
//@desc Create user and return a token 
module.exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const { name, email, password } = req.body;
        try {
            const emailExist = await UserModel.findOne({ email });
            if (!emailExist) {
                // Hash the password
                const hashed = await hashedPassword(password);
                const newUser = new UserModel({
                    name,
                    email,
                    password: hashed
                });

                // Save the new user to the database
                await newUser.save();

                // Create a token for the user
                const token = await createToken(newUser);

                return res.status(201).json({msg:"Your account has been created!", token });
            } else {
                return res.status(400).json({ errors: [{ msg: `${email} is already taken`,param:'email'}]});
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).json("Server internal error!");
        }
    } else {
        // Validations failed
        return res.status(400).json({ errors: errors.array() });
    }
};

//@route  POST  /api/login
//@access Public
//@desc Login user and return a token
module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
      const { email, password } = req.body;
      try {
          const user = await UserModel.findOne({ email });
          if (user) {
              const isMatch = await comparePassword(password, user.password);
              if (isMatch) {
                  // Create a token
                  const token = await createToken(user);
                  return res.status(200).json({ 
                      token,
                      isAdmin: user.admin // Assuming you have an isAdmin field in your User model
                  });
              } else {
                  return res.status(400).json({ errors: [{ msg: 'Password not matched!', param:'password' }] });
              }
          } else {
              return res.status(400).json({ errors: [{ msg: `${email} is not found!`, param:'email' }] });
          }
      } catch (error) {
          console.log(error.message);
          return res.status(500).json("Server internal error!");
      }
  } else {
      // Validations failed
      return res.status(400).json({ errors: errors.array() });
  }
};

