import styled from 'styled-components'

const Box = styled.div`
    width: 100%;
    min-height: calc(calc(100vh - var(--BothNavHeightAndPadding) + 24px));
`

export default () => {
    return (
        <Box>
            Coming soon.
        </Box>
    );
}