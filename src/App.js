import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './app.css';
import Footer from './components/footer/footer';
import NavBar from './components/NavBar';
import Profile from './pages/profile/Profile';
import Write from './pages/write/Write';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Single from './pages/single/Single';

const App = () => {
  const user = false;
  return (
    <BrowserRouter>
      <div className='App'>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={user ? <Home /> : <Register />} />
          <Route path='/login' element={user ? <Home /> : <Login />} />
          <Route path='/write' element={user ? <Write /> : <Login />} />
          <Route path='/profile' element={user ? <Profile /> : <Login />} />
          <Route path='/post/:postId' element={<Single />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
