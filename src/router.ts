import { Router } from 'express';
import { createProduct, deleteProduct, getProducts, getProductsByID, updateAvailability, updateProduct } from './handlers/products.handler';
import { body, param } from 'express-validator';
import { handleInputError } from './middleware';

const router =  Router();

/** 
* @swagger
* components:
*       schemas:
*           Product:
*               type: object
*               properties:
*                   id:
*                       type: integer
*                       description: The Product ID
*                       example: 1
*                   name:
*                       type: string
*                       description: The Product Name
*                       example: Monitor Curvo de 49 pulgadas
*                   price:
*                       type: number
*                       description: The Product Price
*                       example: 300000
*                   availability:
*                       type: boolean
*                       description: The Product Availability
*                       example: true
*/

/**
 * @swagger
 * /api/products:
 *      get:
 *          sumary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of profucts
 *          responses:
 *              200: 
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */

router.get('/', getProducts)

router.get('/:id', 
    param('id').isInt().withMessage('Id no válido'),
    handleInputError,
getProductsByID)

router.post('/', 
    body('name')
    .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
    .notEmpty().withMessage('El precio del producto no puede ir vacio')
    .isNumeric().withMessage('Valor no válido')
    .custom((value) => value > 0).withMessage('Precio no válido'),
    handleInputError,
createProduct);

router.put('/:id',
    param('id').isInt().withMessage('Id no válido'),
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .isNumeric().withMessage('Valor no válido')
        .custom((value) => value > 0).withMessage('Precio no válido'),
    body('availability')
        .isBoolean().withMessage("Valor no disponible"),
    handleInputError,
    updateProduct
)

router.patch('/:id',
    param('id').isInt().withMessage('Id no válido'),
    handleInputError,
    updateAvailability
 )

router.delete('/:id',
    param('id').isInt().withMessage('Id no válido'),
    handleInputError,
    deleteProduct
)


export default router;