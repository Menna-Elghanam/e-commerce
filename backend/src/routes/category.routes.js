import express from 'express';
import * as categoryController from '../controllers/category.controller.js';
import { protect } from "../middleware/auth.middleware.js";


const router = express.Router();

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', categoryController.createCategory , protect);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);


export default router;
