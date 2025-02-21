const admin = require('firebase-admin');
const auth = admin.auth();

const userRegister = async (req, res) => {
    const { email, password } = req.body;
    try {
      await auth.createUser({
        email,
        password
      });
      res.redirect('/login');
    } catch (error) {
      console.error('Error creating new user:', error);
      res.redirect('/register'); 
    }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      res.cookie("token", token, { httpOnly: true }); // Save token in a cookie
      res.json({ message: "Logged in!", user: userCredential.user });

  } catch (error) {
      res.status(400).json({ error: "Invalid email or password" });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
}

module.exports = {
userRegister,
loginUser,
logoutUser
}