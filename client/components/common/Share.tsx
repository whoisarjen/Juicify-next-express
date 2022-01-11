import { FunctionComponent } from "react";
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';

const Share: FunctionComponent = () => {
    const handleShare = () => {
        navigator.share({
            url: location.href,
            title: 'Juicify.app'
        })
    }

    return (
        <div style={{ margin: 'auto' }}>
            <IconButton onClick={handleShare}>
                <ShareIcon color="primary" />
            </IconButton>
        </div>
    )
}

export default Share;