import {Navbar, Container, Button} from 'react-bootstrap'
import './navbar.css'

export default function NavigationBar() {
    return (
        <Navbar bg='primary' data-bs-theme="dark">
            <Container>
                <Navbar.Brand href='/' style={{fontWeight:1000}}>Ai Blog Writer</Navbar.Brand>
            </Container>
            <Container className='nav-btns'>
                <Button variant='secondary'>Login</Button>
                <Button variant='secondary'>SignUp</Button>
            </Container>
        </Navbar>
    )
}