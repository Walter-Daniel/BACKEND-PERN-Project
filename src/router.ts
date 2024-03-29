import { Router } from 'express';
import { createProduct } from './handlers/products.handler';
import { body } from 'express-validator';

const router =  Router();

router.post('/', 
    body('name')
    .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
    .notEmpty().withMessage('El precio del producto no puede ir vacio')
    .isNumeric().withMessage('Valor no válido')
    .custom((value) => value > 0).withMessage('Precio no válido'),
createProduct);

export default router;