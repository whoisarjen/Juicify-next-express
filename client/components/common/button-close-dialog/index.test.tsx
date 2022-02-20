import { setupComponent } from "../../../test-utils/setupComponent.test.utils";
import BaseButtonCloseDialog from "./ButtonCloseDialog";
import useButtonCloseDialog from "./useButtonCloseDialog";
import { screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";

let clicked: any = null;

const Component = () => {
    const props = useButtonCloseDialog({ clicked: jest.fn() })

    clicked = jest.spyOn(props, 'clicked')

    return <BaseButtonCloseDialog {...props} />
}

beforeEach(() => {
    setupComponent(Component)
})


describe('Testing ButtonCloseDialog', () => {
    it('Expect to fire close function on click', () => {
        const button = screen.getByTestId('BaseButtonCloseDialog')

        userEvent.click(button)

        expect(clicked).toBeCalledTimes(1)
    })
})

export default {};