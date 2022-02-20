import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import BookIcon from "@mui/icons-material/Book";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import { getShortDate } from "../../../utils/date.utils";
import { useTabsProfileProps } from './useTabsProfile';

const BaseTabsProfile = ({ tab, router }: useTabsProfileProps) => {
    return (
        <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            sx={{ marginBottom: '10px' }}
        >
            <Tab data-testid="target_profile" onClick={() => router.push(`/${router.query.login}`)} wrapped label={<AccountCircleIcon />} />
            <Tab data-testid="target_nutrition_diary" onClick={() => router.push(`/${router.query.login}/nutrition-diary/${getShortDate()}`)} wrapped label={<BookIcon />} />
            <Tab data-testid="target_workout_results" onClick={() => router.push(`/${router.query.login}/workout/results`)} wrapped label={<FitnessCenterIcon />} />
            <Tab data-testid="target_workout_plans" onClick={() => router.push(`/${router.query.login}/workout/plans`)} wrapped label={<NoteAltIcon />} />
        </Tabs>
    )
}

export default BaseTabsProfile;