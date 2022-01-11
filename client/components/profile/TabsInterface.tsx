import { FunctionComponent } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import BookIcon from "@mui/icons-material/Book";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import { useRouter } from "next/router";
import { getShortDate } from "../../utils/manageDate";

interface TabsProps {
    tab: number
}

const TabsInterface: FunctionComponent<TabsProps> = ({ tab }) => {
    const router = useRouter()

    return (
        <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            sx={{ marginBottom: '10px' }}
        >
            <Tab onClick={() => router.push(`/${router.query.login}`)} wrapped label={<AccountCircleIcon />} />
            <Tab onClick={() => router.push(`/${router.query.login}/nutrition-diary/${getShortDate()}`)} wrapped label={<BookIcon />} />
            <Tab onClick={() => router.push(`/${router.query.login}/workout-results`)} wrapped label={<FitnessCenterIcon />} />
            <Tab onClick={() => router.push(`/${router.query.login}/workout-plans`)} wrapped label={<NoteAltIcon />} />
        </Tabs>
    )
}

export default TabsInterface;