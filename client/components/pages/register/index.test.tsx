import { setupComponent } from "../../../test-utils/setupComponent.test.utils";
import BaseRegister from "./Register";
import useRegister from "./useRegister";
import { screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";

let handleSubmit: any = null;

const Component = () => {
    const props = useRegister()

    handleSubmit = jest.spyOn(props, 'handleSubmit');

    return <BaseRegister {...props} />
}

beforeEach(() => {
    setupComponent(Component, {})
})

describe('Testing register', () => {

    it('Expect to have login input', () => {
        screen.getByLabelText(/login/i)
    })

    it('Expect to have email input', () => {
        screen.getByLabelText(/email/i)
    })

    it('Expect to have password input', () => {
        screen.getByTestId(/password/i)
    })

    it('Expect to have password confirmation input', () => {
        screen.getByTestId(/confirmation/i)
    })

    it('Expect to have birth input', () => {
        screen.getByLabelText(/birth/i)
    })

    it('Expect to have height input', () => {
        screen.getByLabelText(/height/i)
    })

    it('Expect to have sex input', () => {
        screen.getByTestId(/sex/i)
    })

    it('Expect register button to trigger handleSubmit', () => {
        const register = screen.getByText(/register/i)

        userEvent.click(register)

        expect(handleSubmit).toBeCalled()
    })

})

export default {};