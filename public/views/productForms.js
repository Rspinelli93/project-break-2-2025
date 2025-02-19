const Product = require("../../models/Product");

const getEditForm = async (id) => {
    try {
        const product = await Product.findById(id);

        if (!product) {
            return `<p>Product not found</p>`;
        }

        return `
            <form action="/dashboard/${id}" method="POST">
                <input type="hidden" name="_method" value="PUT"> <!-- For method override -->
                
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" value="${product.nombre}" required><br><br>
                
                <label for="descripcion">Descripción:</label>
                <textarea id="descripcion" name="descripcion" required>${product.descripcion}</textarea><br><br>
                
                <label for="imagen">Imagen URL:</label>
                <input type="url" id="imagen" name="imagen" value="${product.imagen}" required><br><br>
                
                <label for="categoria">Categoría:</label>
                <input type="text" id="categoria" name="categoria" value="${product.categoria}" required><br><br>
                
                <label for="talla">Talla:</label>
                <input type="text" id="talla" name="talla" value="${product.talla}" required><br><br>
                
                <label for="precio">Precio:</label>
                <input type="number" id="precio" name="precio" step="0.01" value="${product.precio}" required><br><br>
                
                <button type="submit">Enviar</button>
            </form>
        `;
    } catch (error) {
        console.error(error);
        return `<p>Error fetching product details</p>`;
    }
};

const postForm = `
        <form action="/dashboard" method="POST">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required><br><br>
            
            <label for="descripcion">Descripción:</label>
            <textarea id="descripcion" name="descripcion" required></textarea><br><br>
            
            <label for="imagen">Imagen URL:</label>
            <input type="url" id="imagen" name="imagen" required><br><br>
            
            <label for="categoria">Categoría:</label>
            <input type="text" id="categoria" name="categoria" required><br><br>
            
            <label for="talla">Talla:</label>
            <input type="text" id="talla" name="talla" required><br><br>
            
            <label for="precio">Precio:</label>
            <input type="number" id="precio" name="precio" step="0.01" required><br><br>
            
            <button type="submit">Enviar</button>
        </form>
    `;

// Export the functions
module.exports = {
    getEditForm,
    postForm
};
