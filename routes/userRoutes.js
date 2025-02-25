const express = require("express");
const router = express.Router();

const { userRegister, loginUser, logoutUser } = require('../controllers/userController')

router.post('/products/register', userRegister)
router.post('/products/login', loginUser)
router.delete('/logout', logoutUser)

module.exports = router;