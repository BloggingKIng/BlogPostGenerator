import {Navbar, Container, Button} from 'react-bootstrap'
import { useLogin } from '../loginContext'
import './navbar.css'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function NavigationBar() {

    const {isLogin,  setIsLogin, setToken, token} = useLogin()
    const navigate = useNavigate()

     const handleLogout = async() => {

        await axios.post('http://127.0.0.1:8000/auth/token/logout/', null, {
            headers: {
                Authorization: `Token ${token}`
            }
        })

        .then(
            (response) => {
                console.log(response.data)
                localStorage.removeItem('auth_token')
                toast.success('Logout Successful')
                setIsLogin(false);
                setToken('');
            }
        )

     }

    return (
        <Navbar bg='primary' data-bs-theme="dark">

            <ToastContainer />
            
            <Container>
                <Navbar.Brand href='/' style={{fontWeight:1000}}>Ai Blog Writer</Navbar.Brand>
            </Container>
            {!isLogin ? <Container className='nav-btns'>
                <Button variant='secondary' onClick={()=>{
                    navigate('/login')
                }}>Login</Button>
                <Button variant='secondary' onClick={()=>{
                    navigate('/signup')
                }}>SignUp</Button>
            </Container> :
            <Container className='nav-btns'>
                <Button variant='secondary' onClick={handleLogout}>Logout</Button>
            </Container>
            }
        </Navbar>
    )
}