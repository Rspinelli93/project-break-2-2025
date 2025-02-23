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
                <select id="categoria" name="categoria" required>
                    <option value="Camisetas" ${product.categoria == 'Camisetas' ? 'selected' : ''}>Camisetas</option>
                    <option value="Pantalones" ${product.categoria == 'Pantalones' ? 'selected' : ''}>Pantalones</option>
                    <option value="Zapatos" ${product.categoria == 'Zapatos' ? 'selected' : ''}>Zapatos</option>
                    <option value="Accesorios" ${product.categoria == 'Accesorios' ? 'selected' : ''}>Accesorios</option>
                </select>
                <br><br>

                <label for="talla">Talla:</label>
                <select id="talla" name="talla" required>
                    <option value="XS" ${product.talla == 'XS' ? 'selected' : ''}>XS</option>
                    <option value="S" ${product.talla == 'S' ? 'selected' : ''}>S</option>
                    <option value="M" ${product.talla == 'M' ? 'selected' : ''}>M</option>
                    <option value="L" ${product.talla == 'L' ? 'selected' : ''}>L</option>
                    <option value="XL" ${product.talla == 'XL' ? 'selected' : ''}>XL</option>
                </select>
                <br><br>
                
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
