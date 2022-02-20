import Dialog from '@mui/material/Dialog';
import { ExerciseSchemaProps } from '../../../schema/exercise.schema';
import styled from 'styled-components'
import SlideUp from '../../transition/SlideUp';
import { useDialogAddExerciseProps } from './useDialogAddExercise';
import BoxExercise from '../box-exercise';
import ButtonSubmitItems from '../button-submit-items';
import AddItemsTabs from '../tabs-items';
import CreateExercise from '../dialog-create-exercise';
import Autocomplete from '../input-autocomplete';
import ButtonCloseDialog from '../button-close-dialog';
import ButtonPlusIcon from '../button-plus-icon';
import NavbarOnlyTitle from '../navbar-only-title';

const DialogContent = styled.div`
    width: 100%;
    margin: 0 auto;
    max-width: 702px;
    padding: 12px;
    display: grid;
    min-height: calc(100vh - var(--BothNavHeightAndPadding));
    ${this} {
        min-height: auto;
    }
    @media (max-width: 726px) {
        ${this} {
            width: calc(100% - 24px);
        }
    }
`

const ButtonHolder = styled.div`
    margin: auto;
    display: grid;
`

const BaseDialogAddExercise = ({ children, isDialog, setIsDialog, find, setFind, loading, searchCache, items, checked, setTab, setRefreshChecked, refreshChecked, addExercisesToWorkoutPlan }: useDialogAddExerciseProps) => {
    return (
        <>
            <ButtonHolder onClick={() => setIsDialog(true)}>{children || <ButtonPlusIcon />}</ButtonHolder>

            <Dialog fullScreen scroll='body' open={isDialog} TransitionComponent={SlideUp}>
                <DialogContent>
                    <NavbarOnlyTitle title="workout:ADD_EXERCISES" />

                    <Autocomplete {...{ find, setFind, loading, searchCache }} />

                    <AddItemsTabs changeTab={(value) => setTab(value)} checkedLength={checked.length} />

                    {
                        items?.map((item: ExerciseSchemaProps) =>
                            <BoxExercise refreshCheckedExercises={() => setRefreshChecked(refreshChecked + 1)} exercise={item} key={item._id} />
                        )
                    }

                    <CreateExercise nameOfCreatedExercise={(name: string) => name == find ? setFind(null) : setFind(name)} />

                    <ButtonSubmitItems showNumber={checked.length} clicked={addExercisesToWorkoutPlan} />

                    <ButtonCloseDialog clicked={() => setIsDialog(false)} />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default BaseDialogAddExercise;