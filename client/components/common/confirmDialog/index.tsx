import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import useTranslation from "next-translate/useTranslation"
import DialogContentText from '@mui/material/DialogContentText'
import { useState } from 'react'

interface ConfirmDialogProps {
    children: any
    confirmed: () => void
}

const ConfirmDialog = ({ children, confirmed }: ConfirmDialogProps) => {
    const [isDialog, setIsDialog] = useState(false)
    const { t } = useTranslation('home')

    return (
        <>
            <div onClick={() => setIsDialog(true)}>{children}</div>
            <Dialog
                open={isDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {t('Confirm Dialog Title')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t('This action can NOT be undone')}.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialog(false)}>{t('Deny')}</Button>
                    <LoadingButton
                        onClick={() => {
                            confirmed()
                            setIsDialog(false)
                        }}
                        autoFocus
                    >
                        {t('Confirm')}
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ConfirmDialog;