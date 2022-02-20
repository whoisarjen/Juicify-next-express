import Dialog from '@mui/material/Dialog';
import { ExerciseSchemaProps } from '../../../../schema/exercise.schema';
import styled from 'styled-components'
import SlideUp from '../../../transition/SlideUp';
import { useAddExercisesProps } from './useAddExercises';
import AddExercisesBox from './box';
import ButtonSubmitItems from '../../../common/button-submit-items';
import AddItemsTabs from '../../../common/tabs-items';
import CreateExercise from './createExercise';
import Autocomplete from '../../../common/input-autocomplete';
import ButtonCloseDialog from '../../../common/button-close-dialog';
import ButtonPlusIcon from '../../../common/button-plus-icon';

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

const Title = styled.div`
    font-size: 2rem;
    margin-bottom: 10px;
    font-weight: bold;
`

const ButtonHolder = styled.div`
    margin: auto;
    display: grid;
`

const BaseAddExercises = ({ children, isDialog, setIsDialog, find, setFind, loading, searchCache, items, checked, t, setTab, setRefreshChecked, refreshChecked, addExercisesToWorkoutPlan }: useAddExercisesProps) => {
    return (
        <>
            <ButtonHolder onClick={() => setIsDialog(true)}>{children || <ButtonPlusIcon />}</ButtonHolder>

            <Dialog fullScreen scroll='body' open={isDialog} TransitionComponent={SlideUp}>
                <DialogContent>
                    <Title>{t('Add exercises')}</Title>

                    <Autocomplete {...{ find, setFind, loading, searchCache }} />

                    <AddItemsTabs changeTab={(value) => setTab(value)} checkedLength={checked.length} />

                    {
                        items?.map((item: ExerciseSchemaProps) =>
                            <AddExercisesBox refreshCheckedExercises={() => setRefreshChecked(refreshChecked + 1)} exercise={item} key={item._id} />
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

export default BaseAddExercises;