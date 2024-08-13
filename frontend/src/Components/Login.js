import {Container, Form, Button} from 'react-bootstrap'
import {toast, ToastContainer} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import './login.css'
import { useLogin } from '../loginContext'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const {setIsLogin, setToken} = useLogin()

    const handleSubmit = async() => {
        await axios.post('http://127.0.0.1:8000/auth/token/login/', {username:username, password:password})
        .then(
            (response) => {
                toast.success('Login Successful')
                localStorage.setItem('auth_token', response.data.auth_token)
                setToken(response.data.auth_token)
                setIsLogin(true)
                navigate("/")
            }
        )
        .catch(
            (error) => {
                toast.error('Something went wrong, please try again later!')
                console.log(error)
            }
        )
    }
    
    return (
        <Container>
            <ToastContainer />
            <h1 className="text-center" style={{marginTop:'50px'}}>Login</h1>

            <Form className="login-form">
                <Form.Group>
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control type="text" id="username" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="password">Password</Form.Label>        
                    <Form.Control type="password" id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
            </Form>

            <Container style={{display:'flex', justifyContent:'center'}}>
                <Button variant="primary" type="submit" style={{margin:'10px auto'}} onClick={handleSubmit}>Submit</Button>
            </Container>

        </Container>
    )
}