import { DocumentDefinition } from 'mongoose'
import { ProductModel, ProductProps } from '../models/product.model'

const createProduct = async (input: DocumentDefinition<ProductProps>) => {
    try {
        return await ProductModel.create(input)
    } catch (error: any) {
        throw new Error(error)
    }
}

export default createProduct;