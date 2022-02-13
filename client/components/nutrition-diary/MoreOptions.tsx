import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import styled from "styled-components";

const Box = styled.div`
    margin: auto;
    display: grid;
`

const MoreOptions = ({ isDisabled }: { isDisabled: boolean }) => {
    return (
        <Box>
            <IconButton aria-label="More" color="primary">
                <MoreVertIcon fontSize="small" />
            </IconButton>
        </Box>
    );
}

export default MoreOptions;