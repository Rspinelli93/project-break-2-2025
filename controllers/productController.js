/* 
?GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
?GET /products/:productId: Devuelve el detalle de un producto.
GET /dashboard: Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
?POST /dashboard: Crea un nuevo producto.
GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.
PUT /dashboard/:productId: Actualiza un producto.
DELETE /dashboard/:productId/delete: Elimina un producto.

 */
const Product = require("../models/Product"); 

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
    deleteProduct
}