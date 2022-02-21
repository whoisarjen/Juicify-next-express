import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import { setupComponent } from "../../../test-utils/setupComponent.test.utils";
import BaseDialogAddExercise from "./DialogAddExercise";
import useDialogAddExercise from "./useDialogAddExercise";

// require("fake-indexeddb/auto");
// const FDBFactory = require("fake-indexeddb/lib/FDBFactory");

// Whenever you want a fresh indexedDB
// indexedDB = new FDBFactory();

// import { Provider } from 'react-redux'
// import { store } from "../../../redux/store";

// const Wrapper = ({ children }: any) => (
//     <Provider store={store}>{children}</Provider>
// )

// const setIsDialog = jest.spyOn({ setIsDialog: jest.fn() }, 'setIsDialog')
const setIsDialog = jest.fn()

const Component = () => {
    const props: any = {
        isDialog: false,
        // setIsDialog: jest.fn(),
        setIsDialog,
        find: '',
        setFind: jest.fn(),
        loading: false,
        searchCache: [],
        items: [],
        checked: [],
        setTab: jest.fn(),
        setRefreshChecked: jest.fn(),
        refreshChecked: 0,
        addExercisesToWorkoutPlan: []
    }
    // const props = useDialogAddExercise({ skipThoseIDS: [],addThoseExercises: jest.fn() })
    // console.log(props)
    return <BaseDialogAddExercise children={undefined} {...props} />
}

beforeEach(() => {
    setupComponent(Component)
})

describe('Testing DialogAddExercise', () => {
    // it('', () => {
    //     const { result } = renderHook(() => useDialogAddExercise({ skipThoseIDS: [], addThoseExercises: jest.fn() }), {
    //         wrapper: Wrapper,
    //     })
    //     // console.log(result.current)
    //     // render(Component(props))

    //     // screen.getByTestId('Button')
    // })

    it('Expect to open dialog on button click', () => {
        const button = screen.getByTestId('button')

        userEvent.click(button)

        expect(setIsDialog).toBeCalledTimes(1)
    })
})

it.todo('')

export default {};