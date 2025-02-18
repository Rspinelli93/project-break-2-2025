const express = require("express");
const router = express.Router();
 
const { getAll, getById, create, deleteProduct } = require("../controllers/productController")

router.post("/dashboard", create);
router.get("/products", getAll);
router.get("/products/:_productId", getById);
router.delete("/dashboard/:_productId/delete", deleteProduct);

module.exports = router;

