const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middlewares/authMiddlewares")
 
const { getAll, getById, create, deleteProduct, editProduct, getAndEdit, createNew } = require("../controllers/productController")

// --- RUTAS PUBLICAS --- //

router.get("/products", getAll);
router.get("/products/:_productId", getById);

// MIDDLEWARE //

//!router.use(checkAuth);

// --- RUTAS AUTH --- //

router.post("/dashboard", create);
router.get("/dashboard", getAll);
router.get("/dashboard/newProduct", createNew) //*formulario
router.get("/dashboard/:_productId", getById);
router.put("/dashboard/:_productId", editProduct);
router.get("/dashboard/:_productId/edit", getAndEdit) //*formulario
router.delete("/dashboard/:_productId/delete", deleteProduct);

module.exports = router;