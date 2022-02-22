import BarMacronutrients from ".";
import { setupComponent } from "../../../test-utils/setupComponent.test.utils";
import { render, screen } from '@testing-library/react'
import useTranslation from "next-translate/useTranslation";
import { getCalories } from "../../../utils/product.utils";
import userEvent from "@testing-library/user-event";

const object = {
    proteins: 0,
    carbs: 1,
    fats: 2,
}

let click: any = null;
let toggleLock: any = null;

const Component = () => {
    const { t } = useTranslation('nutrition-diary')
    const props = {
        object,
        click: jest.fn(),
        toggleLock: jest.fn(),
        t,
    }

    click = jest.spyOn(props, 'click')
    toggleLock = jest.spyOn(props, 'toggleLock')

    return <BarMacronutrients {...props as any} />
}

beforeEach(() => {
    setupComponent(Component)
})

describe('Test BarMacronutrient', () => {
    it('Expect to show macro on screen', () => {
        screen.getByText(/0 nutrition-diary:P/i)
        screen.getByText(/1 nutrition-diary:C/i)
        screen.getByText(/2 nutrition-diary:F/i)

        screen.getByText(getCalories({
            p: 0,
            c: 1,
            f: 2
        }))
    })

    it('expect to fire click', () => {
        const button = screen.getByText(/0 nutrition-diary:P/i)

        userEvent.click(button)

        expect(click).toBeCalledTimes(1)
    })

    it('expect to show LockOpenIcon and fire change', () => {
        const button = screen.getByTestId('LockOpenIcon')

        userEvent.click(button)

        expect(toggleLock).toBeCalledTimes(1)
    })

    it('expect to show LockOutlinedIcon and fire change', () => {
        const props = {
            object: { p: 0, locked: true },
            click: jest.fn(),
            toggleLock: jest.fn(),
            t: jest.fn(),
        }
        toggleLock = jest.spyOn(props, 'toggleLock')
        render(<BarMacronutrients {...props as any} />)


        const button = screen.getByTestId('LockOutlinedIcon')

        userEvent.click(button)

        expect(toggleLock).toBeCalledTimes(1)
    })
})

export default {};