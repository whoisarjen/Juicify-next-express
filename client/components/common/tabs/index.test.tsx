import { setupComponent } from "../../../test-utils/setupComponent.test.utils";
import BaseAddExercisesTabs from "./AddItemsTabs";
import useAddExercisesTabs from "./useAddItemsTabs";
import { screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";

const changeTab: any = jest.fn();

const Component = (useAddExercisesTabsObject: object) => {
    const props = useAddExercisesTabs({ ...{ changeTab, checkedLength: 1 }, ...useAddExercisesTabsObject })

    return <BaseAddExercisesTabs {...props} />
}

beforeEach(() => {
    setupComponent(Component)
})

describe('Testing AddExerciseTabs', () => {

    it('Expect to show tab 0', () => {
        const button = screen.getByRole('tab', {
            name: /all/i
        })

        expect(button.getAttribute('aria-selected')).toBe("true")
    })

    it('Expect to correctly change to tab 1', async () => {
        const button = screen.getByRole('tab', {
            name: /favourite/i
        })

        expect(button.getAttribute('aria-selected')).toBe("false")

        userEvent.click(button)

        expect(button.getAttribute('aria-selected')).toBe("true")

        expect(changeTab).toBeCalledTimes(1)

        expect(changeTab).toBeCalledWith(1)
    })

    it('Expect to correctly change to tab 2', () => {
        const button = screen.getByRole('tab', {
            name: /selected \(1\)/i
        })

        expect(button.getAttribute('aria-selected')).toBe("false")

        userEvent.click(button)

        expect(button.getAttribute('aria-selected')).toBe("true")

        expect(changeTab).toBeCalledTimes(2)

        expect(changeTab).toBeCalledWith(2)
    })

    it('Expect tab 3 to have declared value in text', () => {
        screen.getByText(/1/i)
    })
})

export default {};