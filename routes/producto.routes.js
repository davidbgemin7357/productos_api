import {Router} from 'express'
import { getAllProducts, getAllProductsStatic } from '../controllers/producto.controller.js';

export const router = Router();

router.get('/static', getAllProductsStatic)
router.get('/', getAllProducts)