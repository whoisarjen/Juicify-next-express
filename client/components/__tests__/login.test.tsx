import Login from "../../pages/login"
import { render, screen } from '@testing-library/react'
import { Provider } from "react-redux"
import { store } from "../../redux/store"
import user from '@testing-library/user-event'

describe('Testing login form', () => {
    describe('Gave correct data', () => {
        test('Expect correct sign in', async () => {
            render(
                <Provider store={store}>
                    <Login />
                </Provider>
            )

            const login = screen.getByLabelText(/login/i)
            const password = screen.getByLabelText(/password/i)

            user.type(login, '')
            user.type(password, '')

            const submit = screen.getByRole('button')
            user.click(submit)

            // login.toHaveErrorMessage('Should be at least 3 characters')
        })
    })
})

export default {}