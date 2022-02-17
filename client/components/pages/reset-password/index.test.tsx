import { setupComponent } from "../../../test-utils/setupComponent.test.utils";
import BaseResetPassword from "./ResetPassword";
import useResetPassword from "./useResetPassword";
import { screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";

let handleSubmit: any = null;

const component = () => {
    const props = useResetPassword()

    handleSubmit = jest.spyOn(props, 'handleSubmit')

    return <BaseResetPassword {...props} />
}

beforeEach(() => {
    setupComponent(component, {})
})

describe('', () => {

    it('Expect to have email input', () => {
        screen.getByLabelText(/email/i)
    })

    it('Expect to fire handleSubmit on button click', () => {
        const button = screen.getByRole('button', {
            name: /confirm/i
        })

        userEvent.click(button)

        expect(handleSubmit).toBeCalled()
    })

})

export default {};