import { DocumentDefinition } from 'mongoose'
import { NutritionDiaryProps } from '../models/dailyMeasurement.model'
import { ProductModel, ProductProps } from '../models/product.model'
import { UserProps } from '../models/user.model'
import { omit } from 'lodash'

export const createProduct = async (input: DocumentDefinition<Array<ProductProps>>) => {
    try {
        const product = await ProductModel.create(input)
        return product
    } catch (error: any) {
        throw new Error(error)
    }
}

export const deleteManyProduct = async (input: DocumentDefinition<ProductProps>) => {
    try {
        const product = await ProductModel.updateOne(
            input,
            [
                {
                    $set: { deleted: true }
                }
            ]
        )
        return product
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getUserProducts = async (token: DocumentDefinition<UserProps> | DocumentDefinition<Omit<UserProps, 'comparePassword'>>) => {
    try {
        const products = await ProductModel.find({
            $and: [
                {
                    user_ID: token._id
                },
                {
                    deleted:
                    {
                        $exists: false
                    }
                }
            ]
        })
        return products
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getProduct = async (_id: string | undefined) => {
    try {
        const product = omit((await ProductModel.findOne({ _id })).toJSON(), 'deleted')
        return product
    } catch (error: any) {
        throw new Error(error)
    }
}