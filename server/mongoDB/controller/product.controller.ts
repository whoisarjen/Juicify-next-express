import logger from '../../utils/logger'
import { Request, Response } from "express"
import { ProductProps } from "../models/product.model"
import { CreateProductInput } from "../schema/product.schema"
import { createProduct, deleteManyProduct, getProductByCode, getProductByName, getUserProducts } from "../service/product.service"
import { redis, setRedisTimeout, socketHandleUserSynchronization } from '../../utils/socket'

export const createProductController = async (req: Request<{}, {}, CreateProductInput['body']>, res: Response) => {
    try {
        const product = await createProduct(req.body.array)
        await socketHandleUserSynchronization({ req, res, data: product, whatToDo: 'change', where: 'product' });
        return res.send(product);
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const deleteManyProductController = async (req: Request<{}, {}, CreateProductInput['body']>, res: Response) => {
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

export const getUserProductsController = async (req: Request<{}, {}, CreateProductInput['body']>, res: Response) => {
    try {
        const products = await getUserProducts(res.locals.token)
        return res.send(products);
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const getProductByNameController = async (req: Request, res: Response) => {
    try {
        const items = await getProductByName(req.body.find)
        redis.set(`products_${req.body.find.toString()}`, JSON.stringify(items || []))
        await setRedisTimeout(`products_${req.body.find.toString()}`, parseInt(process.env.REDIS_TIMEOUT_CACHE_IN_S as string))
        return res.send({ items });
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}

export const getProductByCodeController = async (req: Request, res: Response) => {
    try {
        const item = await getProductByCode(req.body.code)
        return res.send(item);
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}