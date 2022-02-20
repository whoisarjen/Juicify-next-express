import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { setupComponent } from '../../../test-utils/setupComponent.test.utils'
import BaseProfileTabs from './TabsProfile'
import useProfileTabs from './useTabsProfile'

let push: any = null;

const Component = () => {
    const props = useProfileTabs({ tab: 1 })

    push = jest.spyOn(props.router, 'push')

    return <BaseProfileTabs {...props} />
}

beforeEach(() => {
    setupComponent(Component, {})

    jest.clearAllMocks()
})

describe(`Testing profile's tabs`, () => {

    it('Expect to show profile tab and fire redirect', () => {
        const button = screen.getByTestId('target_profile')

        userEvent.click(button)

        expect(push).toBeCalled()
    })

    it('Expect to show nutrition diary tab and fire redirect', () => {
        const button = screen.getByTestId('target_nutrition_diary')

        userEvent.click(button)

        expect(push).toBeCalled()
    })

    it('Expect to show workout plans tab and fire redirect', () => {
        const button = screen.getByTestId('target_workout_plans')

        userEvent.click(button)

        expect(push).toBeCalled()
    })

    it('Expect to show workout results tab and fire redirect', () => {
        const button = screen.getByTestId('target_workout_results')

        userEvent.click(button)

        expect(push).toBeCalled()
    })

})

export default {};