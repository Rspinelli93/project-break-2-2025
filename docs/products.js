module.exports = {
    paths: {
        "/dashboard": {
            get: {
                tags: ["Productos"],
                description: "Obtener todos los productos",
                operationId: "getAllProducts",
                responses: {
                    200: { 
                        description: "Lista de productos obtenida con éxito",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Producto" }
                                }
                            }
                        }
                    },
                    500: { description: "Error del servidor" }
                }
            },
            post: {
                tags: ["Productos"],
                description: "Crear un nuevo producto",
                operationId: "createProduct",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Producto" }
                        }
                    }
                },
                responses: {
                    201: { description: "Producto creado con éxito" },
                    500: { description: "Error del servidor" }
                }
            }
        },

        "/dashboard/{_productId}": {
            get: {
                tags: ["Productos"],
                description: "Obtener un producto por su ID",
                operationId: "getProductById",
                parameters: [
                    {
                        name: "_productId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                        description: "ID del producto a obtener"
                    }
                ],
                responses: {
                    200: { 
                        description: "Producto obtenido con éxito",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Producto" }
                            }
                        }
                    },
                    404: { description: "Producto no encontrado" },
                    500: { description: "Error del servidor" }
                }
            },
            put: {
                tags: ["Productos"],
                description: "Actualizar un producto por su ID",
                operationId: "editProduct",
                parameters: [
                    {
                        name: "_productId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                        description: "ID del producto a actualizar"
                    }
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Producto" }
                        }
                    }
                },
                responses: {
                    200: { description: "Producto actualizado con éxito" },
                    400: { description: "ID de producto inválido" },
                    404: { description: "Producto no encontrado" },
                    500: { description: "Error del servidor" }
                }
            },
            delete: {
                tags: ["Productos"],
                description: "Eliminar un producto por su ID",
                operationId: "deleteProduct",
                parameters: [
                    {
                        name: "_productId",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                        description: "ID del producto a eliminar"
                    }
                ],
                responses: {
                    200: { description: "Producto eliminado con éxito" },
                    404: { description: "Producto no encontrado" },
                    500: { description: "Error del servidor" }
                }
            }
        }
    }
};
