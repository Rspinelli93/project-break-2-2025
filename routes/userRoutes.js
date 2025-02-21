const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');
const auth = admin.auth();
const { checkAuth } = require("../middlewares/authMiddlewares")

const { userRegister, loginUser, logoutUser } = require('../controllers/userController')

router.post('/products/register', userRegister)
router.post('/products/login', loginUser)
router.delete('/logout', logoutUser)

/* Así, el frontend hará la petición a:

POST http://localhost:3000/login
 */

module.exports = router;