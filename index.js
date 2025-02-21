const express = require('express');
const app = express();
require('dotenv').config();
const PORT = 3000;
const admin = require('firebase-admin');
const cookieParser = require('cookie-parser');
const serviceAccount = require('./config/firebase')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const routesProducts = require('./routes/productRoutes');
const routesUsers = require('./routes/userRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use(cookieParser());

const { dbConnection } = require('./config/db');
dbConnection();

app.use('/', routesUsers);
app.use('/', routesProducts);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT} ✅`);
});