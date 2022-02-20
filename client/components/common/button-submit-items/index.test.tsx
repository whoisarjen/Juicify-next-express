import { setupComponent } from "../../../test-utils/setupComponent.test.utils";
import BaseButtonSubmitItems from "./ButtonSubmitItems";
import useButtonSubmitItems from "./useButtonSubmitItems";
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";

let clicked: any = null;

let number = 10;

const Component = () => {
    const props = useButtonSubmitItems({ clicked: jest.fn(), showNumber: number })

    clicked = jest.spyOn(props, 'clicked')

    return <BaseButtonSubmitItems {...props} />
}

beforeEach(() => {
    setupComponent(Component)

    number = 0;
})


describe('Testing ButtonSubmitItems', () => {
    it('Expect to fire close function on clicked', () => {
        const button = screen.getByTestId('BaseButtonSubmitItems')

        userEvent.click(button)

        expect(clicked).toBeCalledTimes(1)
    })

    describe(`ShowNumber is equal to 0`, () => {
        it('Expect to have button hidden', () => {
            expect(screen.queryByTestId('BaseButtonSubmitItems')).toBeNull()
        })
    })
})

export default {};