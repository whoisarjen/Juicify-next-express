import { setupComponent } from "../../../test-utils/setupComponent.test.utils"
import BaseCreateExercise from "./CreateExercise"
import useCreateExercise from "./useCreateExercise"
import { screen, waitFor } from '@testing-library/react'
import userEvent from "@testing-library/user-event"

let setIsOpen: any = null;

const Component = () => {
    const props = useCreateExercise({ nameOfCreatedExercise: jest.fn() })

    setIsOpen = jest.spyOn(props, 'setIsOpen')

    return <BaseCreateExercise {...{ ...props, setIsOpen }} />
}

beforeEach(() => {
    setupComponent(Component)
})

const expectCloseDialogAndReturnButtonToOpenIt = () => {
    expect(screen.queryByRole('heading', {
        name: /create exercise/i
    })).toBeNull()

    return screen.getByRole('button', {
        name: /create exercise/i
    })
}

const openDialog = () => {
    const button = expectCloseDialogAndReturnButtonToOpenIt()

    userEvent.click(button)
}

describe('Testing createExercise', () => {

    it('Expect to show create exercise button and have not available dialog', () => {
        expectCloseDialogAndReturnButtonToOpenIt()
    })

    it('Expect to open dialog with correct inputs & buttons', () => {
        openDialog()

        screen.getByRole('heading', {
            name: /create exercise/i
        })

        screen.getByRole('textbox')

        screen.getByRole('button', {
            name: /cancel/i
        })

        screen.getByRole('button', {
            name: /submit/i
        })
    })

    it('Block input from allowing empty name', async () => {
        openDialog()

        const submit = screen.getByRole('button', {
            name: /submit/i
        })

        const textbox = screen.getByRole('textbox')

        userEvent.type(textbox, 'a')

        userEvent.click(submit)

        await waitFor(() => screen.getByText(/should be at least 3 characters/i))
    })

    it('Expect to close dialog', async () => {
        openDialog()

        userEvent.click(screen.getByRole('button', {
            name: /cancel/i
        }))

        await new Promise(resolve => setTimeout(() => resolve(true), 2000))

        expect(screen.queryByRole('button', {
            name: /cancel/i
        })).toBeNull()
    })

    it('Expect to send data', () => {
        
    })

})

export default {};