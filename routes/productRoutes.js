const express = require("express");
const router = express.Router();
 
const { getAll, getById, create, deleteProduct, editProduct, getAndEdit, createNew } = require("../controllers/productController")

router.post("/dashboard", create); //* Crea producto

// --- RUTAS TRAYENDO TODOS --- //

//!PAGINA PRINCIPAL (SIN AUTENTICAR, O SEA SIN QUE EL USUARIO NO HAYA LOGEADO)
router.get("/products", getAll); // Todos los productos /products 

//!PAGINA PRINCIPAL PERO AUTENTICADO
router.get("/dashboard", getAll); // Todos los productos /dashboard

// --- RUTAS TRAYENDO CON EL ID --- //
router.get("/products/:_productId", getById); //todo - GET Detalle de un producto /products (aca trabajar en la funcion)
router.get("/dashboard/:_productId", getById); //todo - GET Detalle de un producto /dashboard (aca trabajar en la funcion)
router.put("/dashboard/:_productId", editProduct); //todo - PUT Detalle de un producto (aca trabajar en la funcion) 

// --- RUTA EDIT --- //
router.get("/dashboard/:_productId/edit", getAndEdit) // action va a ser la url de editProduct y el metodo put (el formulario con values)
router.post("/dashboard/newProduct", createNew) // action va a ser la url de create y el metodo post (el formulario vacio)

router.delete("/dashboard/:_productId/delete", deleteProduct); //* Elimina un producto

module.exports = router;