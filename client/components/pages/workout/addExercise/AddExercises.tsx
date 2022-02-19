import Dialog from '@mui/material/Dialog';
import { ExerciseSchemaProps } from '../../../../schema/exercise.schema';
import styled from 'styled-components'
import SlideUp from '../../../transition/SlideUp';
import { useAddExercisesProps } from './useAddExercises';
import AddExercisesBox from './box';
import ButtonPlus from '../../../common/buttons/buttonPlus';
import ButtonSubmitItems from '../../../common/buttons/submitItems';
import AddItemsTabs from '../../../common/tabs';
import CreateExercise from './createExercise';
import Autocomplete from '../../../common/autocomplete';
import ButtonCloseDialog from '../../../common/buttons/closeDialog';

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
            <ButtonHolder onClick={() => setIsDialog(true)}>{children || <ButtonPlus />}</ButtonHolder>

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

                    <ButtonSubmitItems showNumberValue={checked.length} clicked={addExercisesToWorkoutPlan} />

                    <ButtonCloseDialog clicked={() => setIsDialog(false)} />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default BaseAddExercises;