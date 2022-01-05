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
        <IconButton onClick={handleShare}>
            <ShareIcon />
        </IconButton>
    )
}

export default Share;