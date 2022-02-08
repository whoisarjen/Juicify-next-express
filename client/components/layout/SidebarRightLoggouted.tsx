import { FunctionComponent } from "react";
import styled from 'styled-components'

const SidebarRight = styled.aside`
    padding: 12px;
    @media (max-width: 1089px) {
        display: none;
    }
`

const SidebarRightLoggouted: FunctionComponent = () => {
    return (
        <SidebarRight>
            
        </SidebarRight>
    )
}

export default SidebarRightLoggouted;