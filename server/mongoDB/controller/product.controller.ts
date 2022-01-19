import logger from '../../utils/logger'
import { Request, Response } from "express"
import { ProductProps } from "../models/product.model"
import { CreateProductInput } from "../schema/product.schema"
import { createProduct, deleteManyProduct, getProductByName, getUserProducts } from "../service/product.service"
import { socketHandleUserSynchronization } from '../../utils/socket'

export const createProductHandler = async (req: Request<{}, {}, CreateProductInput['body']>, res: Response) => {
    try {
        const product = await createProduct(req.body.array)
        await socketHandleUserSynchronization({ req, res, data: product, whatToDo: 'change', where: 'product' })
        return res.send(product);
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const deleteManyProductHandler = async (req: Request<{}, {}, CreateProductInput['body']>, res: Response) => {
    try {
        req.body.array.forEach(async (product: ProductProps) => {
            await deleteManyProduct({
                _id: product._id,
                user_ID: product.user_ID
            })
        })
        await socketHandleUserSynchronization({ req, res, data: req.body.array, whatToDo: 'delete', where: 'product' })
        return res.send({});
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const getUserProductsHandler = async (req: Request<{}, {}, CreateProductInput['body']>, res: Response) => {
    try {
        const products = await getUserProducts(res.locals.token)
        return res.send(products);
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const getProductByNameHandler = async (req: Request, res: Response) => {
    try {
        const items = await getProductByName(req.body.find)
        return res.send({ items });
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}