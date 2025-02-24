const Product = require("../models/Product"); 
const mongoose = require("mongoose");
const { getEditForm, postForm } = require("../public/views/productForms")

//* - GET /products: Traer todos los productos

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
}

//* - GET /products/_productId: Buscar producto por id

const getById = async (req, res) => {
    try {
        const id = req.params._productId;  // Extract ID from route parameters

        // findById() is a Mongoose method used to find a document by its id.
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "There was a problem trying to get this product" });
    }
}

//* - POST /dashboard: Endpoint para crear un producto nuevo.

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
}

//* - GET / Edit

 const editProduct = async (req, res) => {
    try {
        const id = req.params._productId;  // Extract ID from route parameters
        
        // Validamos id
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
} 

//* - getAndEdit (returns a form with the values of the product to edit)

const getAndEdit = async (req, res) => {
    try {
        const id = req.params._productId;  // Extract ID from route parameters

        if (id === "new") {  
            // If "new" is received, return the form for creating a product
            return res.status(200).send(`<p>Este producto no existe aun</p>`);
        }

        // findById() is a Mongoose method used to find a document by its id.
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

//* - createNew (returns an empty form)

const createNew = (req, res) => {
    try {
        res.status(200).send(postForm); 
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem sending the form" });
    }
};

//* - DELETE /dashboard/:_productId/delete: Endpoint para eliminar una tarea.

const deleteProduct = async (req, res) => {
    try {
        const id = req.params._productId;  // Extract ID from route parameters

        // deleteOne() Deletes the first document that matches the query.
        const deletedProduct = await Product.deleteOne({ _id: id });

        if (deletedProduct === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(deletedProduct);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "There was a problem trying to delete the Product" });
    }
}

module.exports = {
    getAll,
    getById,
    create,
    deleteProduct,
    editProduct,
    getAndEdit,
    createNew
}