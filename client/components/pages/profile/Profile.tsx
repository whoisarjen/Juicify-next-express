import styled from "styled-components";
import SimpleLineChart from "../../common/diagram-simple-line-chart";
import StackedBarChart from "../../common/diagram-stacked-bar-chart";
import NavbarComponent from "../../common/navbar-profile";
import { useProfileProps } from "./useProfile";

const Box = styled.div`
    width: 100%;
    max-height: 390px;
    min-height: 390px;
    padding-bottom: 30px;
`

const BaseProfile = ({ getTheme, barNamesWithColor, barNamesWithColorCalories, user, calories, nutrition_diary, t }: useProfileProps) => {
    return (
        <>
            <NavbarComponent user={user} tab={0} />
            <h3 style={{ color: getTheme('PRIMARY') }}>{t('Daily calories')}</h3>
            <Box>
                <SimpleLineChart data={calories} barNamesWithColor={barNamesWithColorCalories} />
            </Box>
            <h3 style={{ color: getTheme('PRIMARY') }}>{t("Daily macronutrients")}</h3>
            <Box>
                <StackedBarChart data={nutrition_diary} barNamesWithColor={barNamesWithColor} />
            </Box>
        </>
    );
};

export default BaseProfile;