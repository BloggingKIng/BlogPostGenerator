import { Container, Form, Button } from "react-bootstrap";
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css'
import './signup.css'

export default function Signup() {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async() => {
        await axios.post('http://127.0.0.1:8000/auth/users/', {email:email, username:username, password:password})
        .then(
            (response) => {
                toast.success('Account created successfully')
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            }
        )
        .catch(
            (error) => {
                toast.error('Something went wrong, please try again later!')
            }
        )
    }

    return (
        <Container>
            <ToastContainer />
            <h1 className="text-center" style={{marginTop:'50px'}}>Signup</h1>

            <Form className="signup-form">
                <Form.Group>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control type="email" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
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