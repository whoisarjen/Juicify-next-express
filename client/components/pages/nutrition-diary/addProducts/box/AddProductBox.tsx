import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { getCalories } from '../../../../../utils/product.utils';
import styled from 'styled-components';

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 30px 40px 50px 40px;
    margin-bottom: 10px;
    border: 1px solid #e4e4e4;
    border-left: 5px solid #e4e4e4;
    border-radius: 8px;
    padding: 10px 5px 10px 15px;
    width: calc(100% - 26px);
    font-size: 0.875rem;
`

const Name = styled.div`
    grid-column: 1;
    margin-top: auto;
    font-weight: bold;
`

const Description = styled.div`
    grid-column: 1;
    margin-bottom: auto;
`

const Favourite = styled.div`
    grid-column: 2;
    grid-row: 1 / 3;
    margin: auto;
`

const MoreInfo = styled.div`
    grid-column: 3;
    grid-row: 1 / 3;
    margin: auto;
`

const Value = styled.div`
    grid-column: 4;
    grid-row: 1 / 3;
    margin: auto;
`

const Submit = styled.div`
    grid-column: 5;
    grid-row: 1 / 3;
    margin: auto;
`

const AddProductsBox = ({ product, openMoreInformation, getTheme, value, handleValueChange, checked, handleCheck, handleLike, fav, t }: any) => {
    return (
        <Grid style={{ borderLeft: product.v ? `5px solid ${getTheme('PRIMARY')}` : '' }}>
            <Name style={{ color: getTheme('PRIMARY') }}>
                {product.name}
            </Name>
            <Description>
                {(product.p || 0)}{t('P')} {(product.c || 0)}{t('C')} {(product.f || 0)}{t('F')} {getCalories(product)}kcal
            </Description>
            <Favourite onClick={handleLike}>
                <Checkbox checked={fav} icon={<FavoriteBorder fontSize="small" />} checkedIcon={<Favorite fontSize="small" />} />
            </Favourite>
            <MoreInfo onClick={openMoreInformation}>
                <IconButton color="primary">
                    <InfoIcon fontSize="small" />
                </IconButton>
            </MoreInfo>
            <Value>
                <TextField type="number" value={value} onChange={(e) => handleValueChange(e.target.value)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
            </Value>
            <Submit onChange={handleCheck}>
                <Checkbox
                    checked={checked}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </Submit>
        </Grid>
    );
}

export default AddProductsBox;