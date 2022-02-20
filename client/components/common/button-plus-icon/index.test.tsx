import { setupComponent } from "../../../test-utils/setupComponent.test.utils";
import BaseButtonPlusIcon from "./ButtonPlusIcon";
import useButtonPlusIcon from "./useButtonPlusIcon";
import { screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";

let click: any = null;

const Component = () => {
    const props = useButtonPlusIcon({ click: jest.fn() })

    click = jest.spyOn(props, 'click')

    return <BaseButtonPlusIcon {...props} />
}

beforeEach(() => {
    setupComponent(Component)
})


describe('Testing ButtonPlusIcon', () => {
    it('Expect to fire close function on click', () => {
        const button = screen.getByTestId('BaseButtonPlusIcon')

        userEvent.click(button)

        expect(click).toBeCalledTimes(1)
    })
})

export default {};