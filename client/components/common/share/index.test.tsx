import { setupComponent } from "../../../test-utils/setupComponent.test.utils";
import { screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import BaseShare from "./Share";

let handleShare: any = null;

const Component = () => {
    handleShare = jest.fn()

    return <BaseShare handleShare={handleShare} />
}

beforeEach(() => {
    setupComponent(Component)
})

describe('Testing share', () => {
    it('expect to fire handleShare', () => {
        const button = screen.getByTestId('shareButton')

        userEvent.click(button)

        expect(handleShare).toBeCalledTimes(1)
    })
})

export default {};