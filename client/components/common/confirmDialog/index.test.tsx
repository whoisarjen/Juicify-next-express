import ConfirmDialog from '.'
import { screen } from '@testing-library/react'
import { setupComponent } from '../../../test-utils/setupComponent.test.utils'
import userEvent from '@testing-library/user-event'
import { wait } from '@testing-library/user-event/dist/utils'

const props = {
    confirmed: jest.fn()
}

const confirmed = jest.spyOn(props, 'confirmed')

const setup = () => <ConfirmDialog {...props}><button data-testid="button">buttonToClick</button></ConfirmDialog>

beforeEach(() => {
    setupComponent(setup)
})

describe('Testing confirmDialog', () => {

    it('Expect to load properly custome button', () => { })

    it('Expect to open dialog', async () => {
        const button = screen.getByTestId('button')

        userEvent.click(button)

        await wait(1000)

        screen.getByText(/Title/i)
    })

    it('Expect to close dialog', async () => {
        const button = screen.getByTestId('button')

        userEvent.click(button)

        await wait(1000)

        screen.getByText(/Title/i)

        const deny = screen.getByRole('button', {
            name: /deny/i
        })

        userEvent.click(deny)

        await wait(1000)

        expect(screen.queryByText(/Title/i)).toBeNull()
    })

    it('Expect to confirm', async () => {
        const button = screen.getByTestId('button')

        userEvent.click(button)

        await wait(1000)

        screen.getByText(/Title/i)

        const confirm = screen.getByRole('button', {
            name: /confirm/i
        })

        userEvent.click(confirm)

        await wait(1000)

        expect(confirmed).toBeCalledTimes(1)
    })

})

export default {};