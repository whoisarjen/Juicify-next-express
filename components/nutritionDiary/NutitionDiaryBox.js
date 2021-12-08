import style from '../../styles/NutritionDiary.module.css'
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

const NutritionDiaryBox = ({ index }) => {
    return (
        <div className={style.box}>
            <div className={style.boxMeal}> Meal {index + 1}</div>
            <div className={style.boxExtraOptions}>
                <IconButton aria-label="More" color="primary">
                    <MoreVertIcon />
                </IconButton>
            </div>
            <div className={style.boxAdd}>
                <IconButton aria-label="Add" color="primary">
                    <AddIcon />
                </IconButton>
            </div>
            <div>0.0P 0.0C 0.0F 0Kcal</div>
        </div>
    );
}
 
export default NutritionDiaryBox;