import Button from '@mui/material/Button';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from "next/router";
import Avatar from "./Avatar";

export default ({ user }: { user: any }) => {
    const router = useRouter()
    const { t } = useTranslation()

    return (
        <>
            {
                user &&
                <>
                    <div
                        style={{
                            height: 36.5,
                            width: '100%'
                        }}
                    />
                    <Button
                        onClick={() => router.push(`/${router.query.login}`)}
                        sx={{
                            maxWidth: 700,
                            position: 'fixed',
                            bottom: 52,
                            width: 'calc( 100% - 24px )'
                        }}
                        variant="contained"
                        startIcon={<Avatar user={user} size="24px" />}
                    >
                        {t('WATCHING')} {user.login}
                    </Button>
                </>
            }
        </>
    )
}