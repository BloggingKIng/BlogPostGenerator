import {Navbar, Container, Nav} from 'react-bootstrap'

export default function NavigationBar() {
    return (
        <Navbar bg='primary' data-bs-theme="dark">
            <Container>
                <Navbar.Brand href='/' style={{fontWeight:1000}}>Ai Blog Writer</Navbar.Brand>
            </Container>
        </Navbar>
    )
}