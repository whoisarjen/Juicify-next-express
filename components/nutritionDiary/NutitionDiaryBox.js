import style from '../../styles/NutritionDiary.module.css'
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const NutritionDiaryBox = ({ index, products }) => {
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
            {
                products.map((product, i) =>
                    <div className={style.boxProduct} key={i}>
                        <div className={style.boxProductEdit}><IconButton aria-label="edit"><EditIcon/></IconButton></div>
                        <div className={style.boxProductContent}>
                            <div>{product.name}</div>
                            <div>305kcal</div>
                        </div>
                        <div className={style.boxProductContent}>
                            <div>0.0P 20.0C 25.0F</div>
                            <div>100g/ml</div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
 
export default NutritionDiaryBox;