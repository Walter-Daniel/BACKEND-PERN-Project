import { Request, Response } from 'express';
import Product from '../models/Product.model';


export const getProducts = async(req: Request, res:Response) => {

    const products = await Product.findAll({
        order: [
            // ['id', 'DESc']
            ['price', 'DESC']
        ],
        limit: 10,
        attributes: {
            exclude:[
                'createdAt', 'updatedAt'
            ]
        }
    })

    res.status(200).json({
        ok: true,
        data: products
    })

}

export const getProductsByID = async(req: Request, res:Response) => {

    const { id } = req.params;
    const product = await Product.findByPk(id);

    if(!product){
        return res.status(404).json({
            ok: false,
            error: 'Producto no encontrado'
        })
    }

    res.status(200).json({
        ok: true,
        data: product
    })
}

export const createProduct = async(req: Request, res: Response) => {

    const product = await Product.create(req.body);
    res.status(201).json({
        ok: true,
        data: product
    });

}

export const updateProduct = async(req:Request, res:Response)=>{

    const { id } = req.params;
        const product = await Product.findByPk(id);

        if(!product){
            return res.status(404).json({
                ok: false,
                error: 'Producto no encontrado'
            })
        }

        //Update

        await product.update(req.body);
        await product.save();

        res.json({
            ok: true,
            data: product
        });
    
}

export const updateAvailability = async(req:Request, res:Response)=>{

    const { id } = req.params;
    const product = await Product.findByPk(id);

    if(!product){
        return res.status(404).json({
            ok: false,
            error: 'Producto no encontrado'
        })
    }

    //Update
    product.availability = !product.dataValues.availability
    await product.save();

    return res.json({
        ok: true,
        data: product
    });
    
}

export const deleteProduct = async(req:Request, res:Response)=>{

    const { id } = req.params;
    const product = await Product.findByPk(id);

    if(!product){
        return res.status(404).json({
            ok: false,
            error: 'Producto no encontrado'
        })
    }

    await product.destroy();

    return res.json({
        ok: true,
        data: 'Producto Eliminado'
    });
    
}