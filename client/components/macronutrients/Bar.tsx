import LockOpenIcon from '@mui/icons-material/LockOpen';
import IconButton from '@mui/material/IconButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useMacro from "../../hooks/useMacro";
import useTranslation from "next-translate/useTranslation";
import styled from 'styled-components'

interface BarProps {
    object: {
        proteins: number,
        carbs: number,
        fats: number,
        day: number,
        locked: boolean,
        choosen?: boolean
    },
    click?: (arg0: object) => void,
    toggleLock?: (arg0: object) => void
}

const Box = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
    text-align: center;
    font-size: 0.875rem;
`
interface ContentProps {
    active: boolean;
}

const ActiveContent = styled.div<ContentProps>`
    ${(props: any) => props.active && 'transform: scale(1.05); transition: all .2s ease-in-out;'}
`;

const Proteins = styled.div`
    background: #ff8b42;
    height: 35%;
    color: #fff;
    border-radius: 8px 8px 0 0;
    display: grid;
`

const Carbs = styled.div`
    background: #ffbb33;
    height: 35%;
    color: #fff;
    display: grid;
`

const Fats = styled.div`
    background: #90c253;
    height: 20%;
    color: #fff;
    display: grid;
`

const Calories = styled.div`
    background: #3593cf;
    height: 10%;
    border-radius: 0 0 8px 8px;
    color: #fff;
    display: grid;
`

const Day = styled.div`
    display: grid;
    width: 100%;
    padding: 8px 0;
    {this} div{
        background: #f7f7f8;
        border-radius: 50%;
        margin: auto;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
    }
`

const Bar = ({ object, click, toggleLock }: BarProps) => {
    const [{ getShortDayName }] = useMacro()
    const { t } = useTranslation('macronutrients')

    return (
        <Box>
            <Day>
                <div>{t(getShortDayName(object.day).toUpperCase())}</div>
            </Day>
            <ActiveContent active={object.choosen ? true : false} onClick={click}>
                <Proteins>
                    <div className="marginAuto">
                        {object.proteins} {t('P')}
                    </div>
                </Proteins>
                <Carbs>
                    <div className="marginAuto">
                        {object.carbs} {t('C')}
                    </div>
                </Carbs>
                <Fats>
                    <div className="marginAuto">
                        {object.fats} {t('F')}
                    </div>
                </Fats>
                <Calories>
                    <div className="marginAuto">
                        {object.proteins * 4 + object.carbs * 4 + object.fats * 9}
                    </div>
                </Calories>
            </ActiveContent>
            <Day>
                {
                    object.locked ?
                        (
                            <IconButton
                                onClick={toggleLock}
                                color="secondary"
                                className="marginAuto"
                            >
                                <LockOutlinedIcon />
                            </IconButton>
                        ) : (
                            <IconButton
                                onClick={toggleLock}
                                color="primary"
                                className="marginAuto"
                            >
                                <LockOpenIcon />
                            </IconButton>
                        )
                }
            </Day>
        </Box>
    )
}

export default Bar;