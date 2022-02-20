import { setupComponent } from "../../../test-utils/setupComponent.test.utils";
import BaseBottomFlyingGuestBanner from "./BottomFlyingGuestBanner";
import useBottomFlyingGuestBanner from "./useBottomFlyingGuestBanner";
import { screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";

let push: any = null;

const Component = () => {
    const props = useBottomFlyingGuestBanner({ user: { _id: '', login: 'Test' } })

    push = jest.spyOn(props.router, 'push')

    return <BaseBottomFlyingGuestBanner {...props} />
}

beforeEach(() => {
    setupComponent(Component)
})

describe('Testing bottomFlyingGuestBanner', () => {

    it('Expect showing login of guest user', () => {
        screen.getByText(/Test/i)
    })

    it('Expect to fire push on click', () => {
        const box = screen.getByText(/Test/i)

        userEvent.click(box)

        expect(push).toBeCalled()
    })

})

export default {};