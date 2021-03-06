import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';

const BaseShareButton = ({ shareLocation }: { shareLocation: () => void }) => {
    return (
        <div style={{ margin: 'auto' }} data-testid="shareButton" onClick={shareLocation}>
            <IconButton>
                <ShareIcon color="primary" />
            </IconButton>
        </div>
    )
}

export default BaseShareButton;