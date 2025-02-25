const admin = require('firebase-admin');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "project-break-back.firebaseapp.com",
  projectId: "project-break-back",
  storageBucket: "project-break-back.firebasestorage.app",
  messagingSenderId: "408546883394",
  appId: "1:408546883394:web:5b3c6d1da75af5d1c8badb"
};

//???
// Initialize Firebase Admin SDK (only once for backend use)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
} else {
  admin.app(); // If already initialized, use the existing app.
}

// Initialize Firebase Client SDK separately for client-side functionality
const { initializeApp } = require('firebase/app');
const clientApp = initializeApp(firebaseConfig);  // Use a unique name for client-side app
const auth = getAuth(clientApp);  // Firebase client auth for user authentication
//???

const userRegister = async (req, res) => {
  const { email, password } = req.body;

  try {
      const existingUser = await admin.auth().getUserByEmail(email).catch(() => null);

      if (existingUser) {
          return res.status(400).json({ response: 'false', mensaje: 'El usuario ya existe' });
      }
      
      const newUser = await admin.auth().createUser({ email, password });

      res.json({
          response: 'ok',
          mensaje: 'Usuario creado con éxito',
          user: { uid: newUser.uid, email: newUser.email }
      });

  } catch (error) {
      console.error('Error creating new user:', error);
      res.status(400).json({ response: 'false', mensaje: error.message });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password); 

      const token = await userCredential.user.getIdToken();
      
      res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'Strict' });

      res.json({ message: "Logged in!", user: userCredential.user, token });

  } catch (error) {
      console.error("Login error:", error.message);
      res.status(400).json({ error: "Invalid email or password" });
  }
};
const logoutUser = (req, res) => {
  try {
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Not signed in" });
  }
};

module.exports = {
    userRegister,
    loginUser,
    logoutUser
};
