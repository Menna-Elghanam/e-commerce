import express from 'express';
import * as productController from '../controllers/products.controller.js';

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/search', productController.searchProducts);
router.get('/category/:categoryId', productController.getProductsByCategory);

export default router;