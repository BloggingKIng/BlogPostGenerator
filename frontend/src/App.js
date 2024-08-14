import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Components/Navbar';
import BlogGenerationForm from './Components/BlogGenerationForm';
import Signup from './Components/Signup';
import Login from './Components/Login';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLogin } from './loginContext';
import axios from 'axios';

function App() {
  const {setIsLogin, setToken, setUser, token} = useLogin()
  const checkLogin = async() => {

    const token = localStorage.getItem('auth_token')

    if (token) {

      await axios.get('http://127.0.0.1:8000/auth/users/me/', {
        headers: {
          Authorization: `Token ${token}`
        }
      })

      .then(
        (response) => {
          console.log(response.data)
          setUser(response.data)
          setIsLogin(true)
          setToken(token)
        }
      )

      .catch(
        (error) => {
          console.log(error)
          setIsLogin(false)
          setToken(null)
          setUser([])
        }
      )

    }

    else {

      setIsLogin(false)
      setToken(null)
      setUser([])
      
    }
  }

  useEffect(()=>{

    if (token !=""){
      checkLogin();
    }

  }, [token])

  return (
    <>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<BlogGenerationForm />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
