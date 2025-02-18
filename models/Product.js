const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    imagen: { type: String, required: true }, // URL o ruta de la imagen
    categoria: {
        type: String,
        required: true,
        enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'], // Valida que la categoría esté en esta lista
    },
    talla: {
        type: String,
        required: true,
        enum: ['XS', 'S', 'M', 'L', 'XL'], // Valida que la talla esté en esta lista
    },
    precio: { type: Number, required: true, min: 0 }, // El precio debe ser un número positivo
}, { timestamps: true });

// Crear el modelo del producto
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;