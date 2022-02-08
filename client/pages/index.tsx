import styled from 'styled-components'

const Box = styled.div`
    width: 100%;
    min-height: calc(calc(100vh - var(--BothNavHeightAndPadding) + 24px));
`

const Home = () => {
    return (
        <Box>
            Coming soon.
        </Box>
    );
}

export default Home;