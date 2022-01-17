import { Request, Response } from "express"
import logger from '../../utils/logger'
import { CreateProductInput } from "../schema/product.schema"
import createProduct from "../service/product.service"

export const createProductHandler = async (req: Request<{}, {}, CreateProductInput['body']>, res: Response) => {
    try {
        const product = await createProduct(req.body)
        return res.send(product);
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}