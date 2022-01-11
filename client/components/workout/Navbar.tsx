import { useRouter } from "next/router";
import { useAppSelector } from "../../hooks/useRedux";
import SaveIcon from '@mui/icons-material/Save'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import DeleteIcon from '@mui/icons-material/Delete'
import useTranslation from "next-translate/useTranslation"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { FunctionComponent } from "react";

interface NavbarProps {
    title: string,
    where: string,
    saveLoading: boolean,
    setIsDialog: (arg0: boolean) => void,
    saveWorkout: () => void
}

const Navbar: FunctionComponent<NavbarProps> = ({ title, where, saveLoading, setIsDialog, saveWorkout }) => {
    const router = useRouter()
    const { t } = useTranslation('workout')
    const token: any = useAppSelector(state => state.token.value)
    const isOwner = token && token.login == router.query.login

    return (
        <>
            <div className="title">{t(`${title}`)}</div>
            <div className="grid4WithButton">
                <IconButton aria-label="route" onClick={() => router.push(`/${router.query.login}/${where}`)} sx={{ margin: 'auto' }}>
                    <KeyboardBackspaceIcon />
                </IconButton>
                <div />
                {
                    isOwner
                        ?
                        <>
                            <IconButton aria-label="delete" onClick={() => setIsDialog(true)} sx={{ margin: 'auto' }}>
                                <DeleteIcon />
                            </IconButton>
                            <LoadingButton
                                loading={saveLoading}
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                variant="outlined"
                                onClick={saveWorkout}
                            >
                                {t('Save')}
                            </LoadingButton></>
                        :
                        <>
                            <div />
                            <div />
                        </>
                }
            </div>
        </>
    );
}

export default Navbar;