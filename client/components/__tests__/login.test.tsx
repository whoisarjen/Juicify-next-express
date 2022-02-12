import Login from "../../pages/login"
import { render } from '@testing-library/react'
import { Provider } from "react-redux"
import { store } from "../../redux/store"

test('Login form protection', () => {
    render(
        <Provider store={store}>
            <Login />
        </Provider>
    )
})

export default {}