import bible from '../../bible';
import ProductProps from '../../interfaces/product';
import UserProps from '../../interfaces/user';
import productModel from '../models/product'

export default async (user: UserProps): Promise<Array<ProductProps>> => {
    return new Promise((resolve, reject) => {
        productModel.find({
            $and: [
                {
                    user_ID: user._id
                },
                {
                    deleted:
                    {
                        $exists: false
                    }
                }
            ]
        })
            .then((products: Array<ProductProps>) => resolve(products))
            .catch(() => reject(bible['ERROR']['500']))
    });
}