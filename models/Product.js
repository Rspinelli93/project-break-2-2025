const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    imagen: { type: String, required: true },
    categoria: {
        type: String,
        required: true,
        enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'],
    },
    talla: {
        type: String,
        required: true,
        enum: ['XS', 'S', 'M', 'L', 'XL'],
    },
    precio: { type: Number, required: true, min: 0 },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;