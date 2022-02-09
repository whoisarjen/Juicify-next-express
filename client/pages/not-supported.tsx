import styled from 'styled-components'

const Box = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    margin: auto;
`

const Content = styled.div`
    margin: auto;
    text-align: center;
`

const notSupported = () => {
    return (
        <Box>
            <Content>
                <h1>We got a problem!</h1>
                <h2>Your browser is too old. If you want to use Juicify, you have to use newest one.</h2>
            </Content>
        </Box>
    )
}

export default notSupported;