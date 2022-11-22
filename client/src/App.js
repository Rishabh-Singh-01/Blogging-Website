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
import AuthContext from './context/AuthContext';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import SearchedPosts from './pages/searchedPosts/SearchedPosts';

const App = () => {
  const authContextInstance = useContext(AuthContext);
  const { loggedIn } = authContextInstance.userLogInfo;

  // THE BELOW USE EFFECT IS FOR THE CASE IF WEBSITE IS LOADED FOR THE FIRST TIME
  // AND ITS CONDITIONAL AUTHENTICALTION
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/users', {
          withCredentials: true,
        });
        if (!res) {
          authContextInstance.updateUserLogInfo(false, {});
        } else {
          const { user } = res.data.data;
          console.log(res.data.data.user);
          authContextInstance.updateUserLogInfo(true, user);
        }
      } catch (err) {
        // alert('This is wrong passcode');
        console.log(err);
      }
    })();
    // eslint-disable-next-line
  }, []);
  return (
    <BrowserRouter>
      <div className='App'>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/register'
            element={loggedIn ? <Home /> : <Register />}
          />
          <Route path='/login' element={loggedIn ? <Home /> : <Login />} />
          <Route path='/write' element={loggedIn ? <Write /> : <Login />} />
          <Route path='/profile' element={loggedIn ? <Profile /> : <Login />} />
          <Route path='/posts' element={<SearchedPosts />} />
          <Route path='/posts/:postId' element={<Single />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
