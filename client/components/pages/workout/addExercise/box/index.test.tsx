import BaseAddExercisesBox from "./AddExercisesBox";
import useAddExercisesBox from "./useAddExerciseBox";
import { render, screen, waitFor } from '@testing-library/react'
import { setupComponent } from "../../../../../test-utils/setupComponent.test.utils";
import userEvent from "@testing-library/user-event";
require("fake-indexeddb/auto");

const exercise = {
    _id: '123',
    name: 'test_exercise',
    l: 13
}

const refreshCheckedExercises = jest.fn()

const Component = () => {
    const props = useAddExercisesBox({ exercise, refreshCheckedExercises })
    handleCheckSpy = jest.spyOn(props, 'handleCheck')

    return <BaseAddExercisesBox {...props} />
}

let handleCheckSpy: any = null;

beforeEach(async () => {
    // const props = useAddExercisesBox({ exercise, refreshCheckedExercises })
    // const props = {
    //     exercise,
    //     refreshCheckedExercises,
    //     handleCheck: jest.fn(),
    //     getTheme: jest.fn()
    // }

    // handleCheckSpy = jest.spyOn(props, 'handleCheck')

    // render(<BaseAddExercisesBox {...props} />)
})

describe('Checking Workout AddExercisesBox', () => {
    it('Expect to load exercise and show expected data', () => {
        render(<Component />)
        screen.getByText(exercise.name)
    })

    it('Expect checkbox to be unchecked', () => {
        render(<Component />)
        const checkBox = screen.getByRole('checkbox', {
            name: /controlled/i
        })
        userEvent.click(checkBox)
        expect(handleCheckSpy).toBeCalled()
    })
})

export default {};