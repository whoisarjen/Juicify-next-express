import Button from '@mui/material/Button';
import PieChartIcon from '@mui/icons-material/PieChart';
import styled from "styled-components";
import { useDiagramsSectionButtonsProps } from "./useDiagramsSectionButtons";
import AddActivity from '../../../../common/dialog-create-activity';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const Box = styled.div`
    display: grid;
    margin-bottom: 24px;
`

const Buttons = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 1fr;
`

const BaseDiagramsSectionButtons = ({ router, t, data }: useDiagramsSectionButtonsProps) => {
    return (
        <Box>
            <Buttons>
                <div />
                <Button
                    onClick={() => router.push('/macronutrients')}
                    color="primary"
                    variant="outlined"
                    aria-label="macronutrients"
                    component="span"
                    startIcon={<PieChartIcon />}
                    sx={{ margin: 'auto' }}
                >
                    {t('Macronutrients')}
                </Button>
                <div />
                <AddActivity data={data}>
                    <Button
                        color="error"
                        variant="outlined"
                        aria-label="Burnt calories"
                        component="span"
                        startIcon={<LocalFireDepartmentIcon />}
                        sx={{ margin: 'auto' }}
                    >
                        {t('Burnt calories')}
                    </Button>
                </AddActivity>
                <div />
            </Buttons>
        </Box>
    )
}

export default BaseDiagramsSectionButtons;