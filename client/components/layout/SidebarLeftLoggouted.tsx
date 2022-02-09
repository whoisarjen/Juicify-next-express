import { FunctionComponent } from "react";
import styled from 'styled-components'

const Grid = styled.aside`
    padding: 12px;
    margin-left: auto;
    margin-right: 0;
    width: 100%;
    max-width: 200px;
    @media(max-width: 1452px) {
        display: none;
    }
`

const SidebarLeftLoggouted: FunctionComponent = () => {
    return (
        <Grid>
            
        </Grid>
    )
}

export default SidebarLeftLoggouted;