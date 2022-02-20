import DateChangerFast from ".";
import { setupComponent } from "../../../test-utils/setupComponent.test.utils";
import { screen } from '@testing-library/react'
import { reverseDateDotes } from "../../../utils/date.utils";

const Component = () => {
    return <DateChangerFast />
}

beforeEach(() => {
    setupComponent(Component)
})

describe('Testing DateChangerFast', () => {
    it('Expect to show today date, and days of 4 days around', () => {
        screen.getByText(reverseDateDotes())
        
        const todayD = parseInt(reverseDateDotes().slice(0, 2))

        screen.getByText(todayD - 1)
        screen.getByText(todayD + 1)
        screen.getByText(todayD - 2)
        screen.getByText(todayD + 2)
    })
})

export default {};