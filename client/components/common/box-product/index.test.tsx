import { fireEvent, screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { wait } from "@testing-library/user-event/dist/utils";
import { setupComponent } from "../../../test-utils/setupComponent.test.utils";
import BaseBoxProduct from "./BoxProduct";
import useBoxProduct from "./useBoxProduct";

let handleLike: any = null;
let handleCheck: any = null;
let openMoreInformation: any = null;

const Component = () => {
    const props = {
        ...useBoxProduct({ product: { _id: '123', name: 'test', p: 123 }, refreshCheckedProducts: jest.fn(), openMoreInformation: jest.fn() }),
        handleCheck: jest.fn(),
        handleLike: jest.fn(),
        openMoreInformation: jest.fn(),
    }

    handleLike = jest.spyOn(props, 'handleLike')
    handleCheck = jest.spyOn(props, 'handleCheck')
    openMoreInformation = jest.spyOn(props, 'openMoreInformation')


    return <BaseBoxProduct {...{ ...props, handleCheck, openMoreInformation }} handleLike={handleLike} />
}

beforeEach(() => {
    setupComponent(Component)
})

describe('Testing BoxProduct', () => {
    it('Expect to show data on screen', () => {
        screen.getByText(/test/i)
        screen.getByText(/123nutrition-diary:P/i)
        screen.getByText(/0nutrition-diary:C/i)
        screen.getByText(/0nutrition-diary:F/i)
        screen.getByText(/492kcal/i)
    })

    it('Expect to fire openMoreInformation', () => {
        const click = screen.getByTestId('openMoreInformation')

        userEvent.click(click)

        expect(openMoreInformation).toBeCalledTimes(1)
    })

    it('Expect to fire handleLike', () => {
        const click = screen.getByTestId('handleLike')

        userEvent.click(click)

        expect(handleLike).toBeCalledTimes(1)
    })
})

export default {};