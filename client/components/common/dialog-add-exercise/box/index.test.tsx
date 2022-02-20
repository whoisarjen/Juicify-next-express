import BaseAddExercisesBox from "./AddExercisesBox";
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
require("fake-indexeddb/auto");

const exercise = {
    _id: '123',
    name: 'test_exercise',
    l: 13
}

let handleCheckSpy: any = null;

const Component = () => {
    const props = { exercise, handleCheck: jest.fn(), checked: false, getTheme: jest.fn() }
    
    handleCheckSpy = jest.spyOn(props, 'handleCheck')

    return <BaseAddExercisesBox {...props} />
}

describe('Checking Workout AddExercisesBox', () => {
    it('Expect to load exercise and show expected data', () => {
        render(<Component />)
        screen.getByText(exercise.name)
    })

    it('Expect checkbox to fire handleCheck', () => {
        render(<Component />)
        const checkBox = screen.getByRole('checkbox', {
            name: /controlled/i
        })
        userEvent.click(checkBox)
        expect(handleCheckSpy).toBeCalled()
    })
})

export default {};