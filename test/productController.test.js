const { getAll, getById, create, editProduct, deleteProduct } = require('../controllers/productController');
const Product = require('../models/Product');
const mongoose = require('mongoose')
jest.mock('../models/Product');

describe('getAll', () => {
    it('should return an array of product objects', async () => {

        const mockProducts = [
            {
                nombre: "Zapato",
                descripcion: "Zapato de prueba",
                imagen: "imagen.com/url",
                categoria: "Zapatos",
                talla: "XL",
                precio: 50
            }
        ];

        Product.find.mockResolvedValue(mockProducts);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAll(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockProducts);
    });

    it('should handle errors correctly', async () => {

        Product.find.mockRejectedValue(new Error("Database error"));

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getAll(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "There was a problem trying get all the tasks"
        });
    });
});
describe('getById', () => {
    let req, res;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
    });

    test('should return a product', async () => {
        req.params._productId = '123';
        const mockProduct = { nombre: 'Zapato' };
        Product.findById.mockResolvedValue(mockProduct);

        await getById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockProduct);
    });

    test('should return 404 if product not found', async () => {
        req.params._productId = '123';
        Product.findById.mockResolvedValue(null);

        await getById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
    });
});
describe('create', () => {
    let req, res;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
    });

    test('should create a product', async () => {
        req.body = {
            nombre: "Zapato",
            descripcion: "Zapato de prueba",
            imagen: "imagen.com/url",
            categoria: "Zapatos",
            talla: "XL",
            precio: 50
        };
        const mockProduct = { ...req.body, save: jest.fn() };
        Product.create.mockResolvedValue(mockProduct);

        await create(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockProduct);
    });
});
describe('editProduct', () => {
    let req, res;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
    });

    test('should update a product', async () => {
        req.params._productId = new mongoose.Types.ObjectId().toString();
        req.body = { nombre: 'Updated Zapato' };
        const mockUpdatedProduct = { _id: req.params._productId, ...req.body };
        Product.findByIdAndUpdate.mockResolvedValue(mockUpdatedProduct);

        await editProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUpdatedProduct);
    });
});
describe('deleteProduct', () => {
    let req, res;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
    });

    test('should delete a product', async () => {
        req.params._productId = '123';
        Product.deleteOne.mockResolvedValue({ deletedCount: 1 });

        await deleteProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ deletedCount: 1 });
    });

    test('should return 404 if product not found', async () => {
        req.params._productId = '1234';
        Product.deleteOne.mockResolvedValue({ acknowledged: true, deletedCount: 0 });


        await deleteProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
    });
});
