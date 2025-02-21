const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middlewares/authMiddlewares")
 
const { getAll, getById, create, deleteProduct, editProduct, getAndEdit, createNew } = require("../controllers/productController")

// --- RUTAS PUBLICAS --- //

router.get("/products", getAll); // Todos los productos /products 
router.get("/products/:_productId", getById); //todo - GET Detalle de un producto /products (aca trabajar en la funcion)

// MIDDLEWARE //

router.use(checkAuth);

// --- RUTAS AUTH --- //

router.post("/dashboard", create); //* Crea producto
router.get("/dashboard", getAll); // Todos los productos /dashboard
router.get("/dashboard/:_productId", getById); //todo - GET Detalle de un producto /dashboard (aca trabajar en la funcion)
router.put("/dashboard/:_productId", editProduct); //todo - PUT Detalle de un producto (aca trabajar en la funcion) 
router.get("/dashboard/:_productId/edit", getAndEdit) // action va a ser la url de editProduct y el metodo put (el formulario con values)
router.post("/dashboard/newProduct", createNew) // action va a ser la url de create y el metodo post (el formulario vacio)
router.delete("/dashboard/:_productId/delete", deleteProduct); //* Elimina un producto

module.exports = router;