module.exports = {
    components: {
        schemas: {
            Producto: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        description: "Identificación del producto",
                        example: "65f4a2b7c8d4e8a1b2c3d4e5"
                    },
                    nombre: {
                        type: 'string',
                        description: "Nombre del producto",
                        example: "Camiseta de algodón"
                    },
                    descripcion: {
                        type: 'string',
                        description: "Descripción del producto",
                        example: "Camiseta 100% algodón, cómoda y fresca"
                    },
                    imagen: {
                        type: 'string',
                        description: "URL de la imagen del producto",
                        example: "https://ejemplo.com/imagen.jpg"
                    },
                    categoria: {
                        type: 'string',
                        description: "Categoría del producto",
                        enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'],
                        example: "Camisetas"
                    },
                    talla: {
                        type: 'string',
                        description: "Talla del producto",
                        enum: ['XS', 'S', 'M', 'L', 'XL'],
                        example: "M"
                    },
                    precio: {
                        type: 'number',
                        description: "Precio del producto",
                        example: 30
                    },
                }
            }
        }
    }
}
