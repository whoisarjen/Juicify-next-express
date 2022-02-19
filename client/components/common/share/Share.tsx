import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import { useShareProps } from './useShare';

const BaseShare = ({ handleShare }: useShareProps) => {
    return (
        <div style={{ margin: 'auto' }} data-testid="shareButton" onClick={handleShare}>
            <IconButton>
                <ShareIcon color="primary" />
            </IconButton>
        </div>
    )
}

export default BaseShare;