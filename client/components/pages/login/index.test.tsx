import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { setupComponent } from '../../../test-utils/setupComponent.test.utils';
import BaseLogin from './Login';
import useLogin from './useLogin';

let login: any = null;
let handleSubmit: any = null;

const Component = () => {
    const props = useLogin()

    login = jest.spyOn(props, 'login')
    handleSubmit = jest.spyOn(props, 'handleSubmit')

    return <BaseLogin {...{ ...props, login }} />
}

beforeEach(() => {
    setupComponent(Component, {})
})

describe('Testing login validation', () => {

    it('Expect to have login input', () => {
        screen.getByLabelText(/login/i)
    })

    it('Expect to have password input', () => {
        screen.getByLabelText(/password/i)
    })

    it('Expect to have register link', () => {
        screen.getByTestId('register_button')
    })

    it('Expect to have remind link', () => {
        screen.getByRole('link', {
            name: /auth:FORGOT_PASSWORD_RESET_IT/i
        })
    })

    it('Expect to have sign in button', () => {
        screen.getByTestId('login_button')
    })

    it('Expect to fire handleSubmit on sign in', () => {
        const button = screen.getByTestId('login_button')
        userEvent.click(button)
        expect(handleSubmit).toBeCalled()
    })
});

export default {}