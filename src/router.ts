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
 *          summary: Get a list of products
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

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *          400:
 *              description: Bad Request - Invalid ID
 */

router.get('/:id', 
    param('id').isInt().withMessage('Id no válido'),
    handleInputError,
getProductsByID)

/**
 * @swagger
 *  /api/products:
 *      post:
 *          summary: Create a new product
 *          tags:
 *              - Products
 *          description: Return a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo de 29 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 150000
 *          responses:
 *              201:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - invalid input data
 */

router.post('/', 
    body('name')
    .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
    .notEmpty().withMessage('El precio del producto no puede ir vacio')
    .isNumeric().withMessage('Valor no válido')
    .custom((value) => value > 0).withMessage('Precio no válido'),
    handleInputError,
createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the update product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo de 21 pulgadas - Actualizado"
 *                              price:
 *                                  type: number
 *                                  example: 75000
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                           $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid ID  or Invalid input data
 *          404:
 *              description: Product Not Found
 */

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

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update Product Availavility
 *      tags:
 *          - Products
 *      description: Return the updated availavility
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                           $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid ID
 *          404:
 *              description: Product Not Found
 *          
 */

router.patch('/:id',
    param('id').isInt().withMessage('Id no válido'),
    handleInputError,
    updateAvailability
 )

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Delete Product By ID
 *      tags:
 *          - Products
 *      description: Return a confirmation message
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to delete
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                           type: object
 *                           properties:
 *                              ok:
 *                                  type: boolean
 *                                  example: true
 *                              data:
 *                                  type: string
 *                                  example: "Producto Eliminado"
 *          400:
 *              description: Bad Request - invalid ID
 *          404:
 *              description: Product Not Found
 *          
 */
router.delete('/:id',
    param('id').isInt().withMessage('Id no válido'),
    handleInputError,
    deleteProduct
)


export default router;