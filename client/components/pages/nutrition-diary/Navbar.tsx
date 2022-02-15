import Share from "../../common/Share";
import DateChanger from "../../common/DateChanger";
import useTranslation from "next-translate/useTranslation";
import styled from 'styled-components'

const Box = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 36px 36px;
    ${this} button {
        margin: auto;
    }
`

const Title = styled.div`
    font-size: 2rem;
    margin-bottom: 10px;
    font-weight: bold;
`

const Navbar = () => {
    const { t } = useTranslation('nutrition-diary')

    return (
        <Box>
            <Title>{t('title')}</Title>
            <Share />
            <DateChanger />
        </Box>
    )
}

export default Navbar;