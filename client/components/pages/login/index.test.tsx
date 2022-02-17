import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { setupComponent } from '../../../test-utils/setupComponent.test.utils';
import BaseLogin from './Login';
import useLogin from './useLogin';

let handleSubmit: any = null;

const component = () => {
    const props = useLogin()

    handleSubmit = jest.spyOn(props, 'handleSubmit')

    return <BaseLogin {...{
        ...props,
        login: jest.fn()
    }} />
}

beforeEach(() => {
    setupComponent(component, {})
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