import style from "../../styles/nutrition-diary.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import EditProduct from './EditProduct'
import MoreOptions from './MoreOptions'
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

const MealBox = ({ index, products, openDialog }) => {
  const router = useRouter();
  const token = useSelector((state) => state.token.value);

  return (
    <div className={style.box}>
      <div className={style.boxMeal}> Meal {index + 1}</div>
      <div className={style.boxExtraOptions}>
        {token.login === router.query.login ? (
          <MoreOptions />
        ) : (
          <div />
        )}
      </div>
      <div className={style.boxAdd}>
        {token.login === router.query.login ? (
          <IconButton sx={{ margin: 'auto' }} aria-label="Add" color="primary" onClick={() => openDialog()}>
            <AddIcon fontSize="small" />
          </IconButton>
        ) : (
          <div />
        )}
      </div>
      <div>0.0P 0.0C 0.0F 0Kcal</div>
      {products.map((product, i) => (
        <div className={style.boxProduct} key={i}>
          <div className={style.boxProductEdit}>
            <EditProduct isOwner={token.login === router.query.login} />
          </div>
          <div className={style.boxProductContent}>
            <div>{product.name}</div>
            <div>305kcal</div>
          </div>
          <div className={style.boxProductContent}>
            <div>0.0P 20.0C 25.0F</div>
            <div>100g/ml</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MealBox;