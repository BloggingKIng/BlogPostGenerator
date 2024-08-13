import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Components/Navbar';
import BlogGenerationForm from './Components/BlogGenerationForm';
import Signup from './Components/Signup';
import Login from './Components/Login';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <NavigationBar />
      <Router>
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
