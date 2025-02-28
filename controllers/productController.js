const Product = require("../models/Product"); 
const mongoose = require("mongoose");
const { getEditForm, postForm } = require("../public/views/productForms")


const getAll = async(req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products); 
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "There was a problem trying get all the tasks" });
    }
};
const getById = async (req, res) => {
    try {
        const id = req.params._productId; 

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "There was a problem trying to get this product" });
    }
};
const create = async(req, res) => {
    try {
        const product = await Product.create(
            { 
            nombre: req.body.nombre, 
            descripcion: req.body.descripcion, 
            imagen: req.body.imagen,
            categoria: req.body.categoria,
            talla: req.body.talla,
            precio: req.body.precio
            }
        );
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a product" });
    }
};
 const editProduct = async (req, res) => {
    console.log(req.body, req.params)
    try {
        const id = req.params._productId; 
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Product ID" });
        }

        const productUpdated = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!productUpdated) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(productUpdated);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "There was a problem trying to update the product" });
    }
};
const deleteProduct = async (req, res) => {
    try {
        const id = req.params._productId;
        const deletedProduct = await Product.deleteOne({ _id: id });

        if (deletedProduct.deletedCount === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(deletedProduct);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "There was a problem trying to delete the Product" });
    }
};

//* Formularios (no usados)
const getAndEdit = async (req, res) => {
    try {
        const id = req.params._productId;  

        if (id === "new") {       
            return res.status(200).send(`<p>Este producto no existe aun</p>`);
        }

        const product = await Product.findById(id);
        const editFormHtml = await getEditForm(id); 
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).send(editFormHtml);

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to get this product" });
    }
}
const createNew = (req, res) => {
    try {
        res.status(200).send(postForm); 
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem sending the form" });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    deleteProduct,
    editProduct,
    getAndEdit,
    createNew
}