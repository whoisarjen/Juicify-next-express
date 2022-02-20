import { setupComponent } from "../../../test-utils/setupComponent.test.utils";
import { screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import BaseShare from "./ShareButton";

let shareLocation: any = null;

const Component = () => {
    shareLocation = jest.fn()

    return <BaseShare shareLocation={shareLocation} />
}

beforeEach(() => {
    setupComponent(Component)
})

describe('Testing share', () => {
    it('expect to fire shareLocation', () => {
        const button = screen.getByTestId('shareButton')

        userEvent.click(button)

        expect(shareLocation).toBeCalledTimes(1)
    })
})

export default {};