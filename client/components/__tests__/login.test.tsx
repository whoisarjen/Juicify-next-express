import Login from "../../pages/login"
import { render } from '@testing-library/react'

test('Login form protection', () => {
    render(<Login />)
    // render(<AddProductsBox
    //     refreshCheckedProducts={() => console.log()}
    //     product={
    //         {
    //             _id: 'asdasddasdas',
    //             name: "Kamil",
    //             p: 100,
    //             c: 100,
    //             f: 50
    //         }
    //     }
    //     key={1}
    // />

})

export default {}