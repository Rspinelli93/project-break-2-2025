import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "project-break-back.firebaseapp.com",
  projectId: "project-break-back",
  storageBucket: "project-break-back.firebasestorage.app",
  messagingSenderId: "408546883394",
  appId: "1:408546883394:web:5b3c6d1da75af5d1c8badb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user);
  } catch (error) {
    console.error("Error signing in:", error.message);
  }
};