import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { FunctionComponent } from "react";
import styled from "styled-components";

interface MoreOptionsProps {
    isDisabled: boolean
}

const Box = styled.div`
    margin: auto;
    display: grid;
`

const MoreOptions: FunctionComponent<MoreOptionsProps> = ({ isDisabled }) => {

    return (
        <Box>
            <IconButton aria-label="More" color="primary">
                <MoreVertIcon fontSize="small" />
            </IconButton>
        </Box>
    );
}

export default MoreOptions;