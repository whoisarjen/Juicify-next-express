import { DocumentDefinition } from 'mongoose'
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

export const getProductByName = async (find: string) => {
    try {
        let regex: any = { name: { $regex: find, $options: 'im' } }
        if (find.split(" ").length > 1) regex = { $text: { $search: find.split(" ").map((str: any) => "\"" + str + "\"").join(' ') } }
        const products = await ProductModel.find({
            $and:
                [
                    { user_ID: { $exists: false } },
                    { deleted: { $exists: false } },
                    regex
                ]
        })
            .sort({ l: 1, v: -1 })
            .limit(10)
        return products
    } catch (error: any) {
        throw new Error(error)
    }
}