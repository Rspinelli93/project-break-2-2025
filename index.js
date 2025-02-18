const express = require('express');
const app = express();
require('dotenv').config();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended:true }))

const { dbConnection } = require('./config/db');
dbConnection();

const routesProducts = require('./routes/productRoutes');
app.use('/', routesProducts);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT} ✅`);
});