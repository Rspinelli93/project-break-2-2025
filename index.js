const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = 3000;
const admin = require('firebase-admin');
const cookieParser = require('cookie-parser');
const serviceAccount = require('./config/firebase')
const swaggerUI = require('swagger-ui-express')
const docs = require('./docs/index')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})
app.use(cors())

const routesProducts = require('./routes/productRoutes');
const routesUsers = require('./routes/userRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use(cookieParser());

const { dbConnection } = require('./config/db');
dbConnection();

app.use('/', routesUsers);
app.use('/', routesProducts);

app.use('/api-docs', swaggerUI.serve,swaggerUI.setup(docs))

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT} ✅`);
});