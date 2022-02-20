import BaseDialogAddWorkoutResult from "./DialogAddWorkoutResult"
import useDialogAddWorkoutResult from "./useDialogAddWorkoutResult"

const DialogAddWorkoutResult = () => {
    const props = useDialogAddWorkoutResult()

    return <BaseDialogAddWorkoutResult {...props} />
}

export default DialogAddWorkoutResult