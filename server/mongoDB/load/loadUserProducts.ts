import bible from '../../bible';
import { ProductProps, ProductModel } from '../models/product.model';
import { UserProps } from '../models/user.model';

export default async (user: UserProps): Promise<Array<ProductProps>> => {
    return new Promise((resolve, reject) => {
        ProductModel.find({
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