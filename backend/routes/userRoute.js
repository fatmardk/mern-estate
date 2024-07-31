const express = require('express');

const {registerValidations, loginValidations} = require ("../validations/userValidations")

const {registerUser, loginUser} = require('../controller/userController');
const router = express.Router();


router.post("/register",registerValidations,registerUser);
router.post("/login",loginValidations,loginUser)





module.exports = router;
