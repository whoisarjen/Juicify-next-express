import { useMutation, useQuery } from 'urql';
import { PRODUCT_SCHEMA_PROPS } from '../schema/product.schema';

const PRODUCT = `
    _id
    name
    p
    c
    f
    updatedAt
`

const PRODUCTS_QUERY = `
    query{
        products{
            ${PRODUCT}
        }
    }
`;

const CREATE_PRODUCT = `
    mutation createProduct($createProductInput: CreateProductInput!){
        createProduct(createProductInput: $createProductInput){
            ${PRODUCT}
        }
    }
`;

const REMOVE_PRODUCT = `
    mutation removeProduct($_id: String!){
        removeProduct(_id: $_id){
            _id
        }
    }
`

const useProducts = () => {
    const [, createProduct] = useMutation(CREATE_PRODUCT);
    const [, removeProduct] = useMutation(REMOVE_PRODUCT);
    const [{ data, fetching, error }, productsReexecuteQuery] = useQuery({
        query: PRODUCTS_QUERY,
        pause: true,
    });

    return {
        products: data?.products || [],
        productsFetching: fetching,
        productsError: error,
        productsReexecuteQuery,
        createProduct: (createProductInput: Omit<PRODUCT_SCHEMA_PROPS, '_id'>) => createProduct({ createProductInput }),
        removeProduct: (_id: string) => removeProduct({ _id }),
    }
}

export default useProducts;