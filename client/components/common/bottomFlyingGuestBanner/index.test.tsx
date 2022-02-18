import { setupComponent } from "../../../test-utils/setupComponent.test.utils";
import BaseBottomFlyingGuestBanner from "./BottomFlyingGuestBanner";
import useBottomFlyingGuestBanner from "./useBottomFlyingGuestBanner";
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../../test-utils/createMockRouter.test.utils";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";

let push: any = null;

const Component = () => {
    const props = useBottomFlyingGuestBanner({ user: { _id: '', login: 'Test' } })

    push = jest.spyOn(props.router, 'push')

    return <BaseBottomFlyingGuestBanner {...props} />
}

beforeEach(() => {
    setupComponent(Component)
})

const Loggout = () => {
    const props = useBottomFlyingGuestBanner({ user: { _id: '', login: 'Test' } })
    return <BaseBottomFlyingGuestBanner {...props} />
}

describe('Testing bottomFlyingGuestBanner', () => {

    it('Expect showing login of guest user', () => {
        screen.getByText(/Test/i)
    })

    it('Expect to fire push on click', () => {
        const box = screen.getByText(/Test/i)

        userEvent.click(box)

        expect(push).toBeCalled()
    })

    // it('', () => {
    //     render(
    //         <Provider store={store}>
    //             <RouterContext.Provider value={createMockRouter({
    //                 locale: 'en',
    //                 locales: ['en', 'pl'],
    //                 query: {
    //                     login: 'Test'
    //                 }
    //             })}>
    //                 <Loggout />
    //             </RouterContext.Provider>
    //         </Provider>
    //     )

    //     screen.getByTestId('BottomFlyingGuestBanner')
    // })

})

export default {};