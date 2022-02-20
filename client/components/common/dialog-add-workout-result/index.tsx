import BaseDialogAddWorkoutResult from "./DialogAddWorkoutResult"
import useDialogAddWorkoutResult from "./useDialogAddWorkoutResult"

const DialogAddWorkoutResult = ({ children }: { children: any }) => {
    const props = useDialogAddWorkoutResult({ children })

    return <BaseDialogAddWorkoutResult {...props} />
}

export default DialogAddWorkoutResult