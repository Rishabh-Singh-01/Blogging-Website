import axios from 'axios';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const authContextInstance = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordInputFieldType, setPasswordInputFieldType] =
    useState('password');
  const [iconEyeType, setIconEyeType] = useState('fa-eye');

  const setPasswordHandler = () => {
    passwordInputFieldType === 'password'
      ? setPasswordInputFieldType('input')
      : setPasswordInputFieldType('password');

    iconEyeType === 'fa-eye'
      ? setIconEyeType('fa-eye-slash')
      : setIconEyeType('fa-eye');
  };

  const loginEmailHandler = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const loginPasswordHandler = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('users/login', {
        email,
        password,
      });
      const { user } = res.data.data;
      if (res.data.status === 'success') {
        console.log(user);
        authContextInstance.updateUserLogInfo(true, user);
        navigate('/');
      }
    } catch (err) {
      console.error(err.response.data);
    }
    setEmail('');
    setPassword('');
  };

  return (
    <div className='register'>
      <div className='mainWrapper'>
        <form className='registerForm' onSubmit={loginSubmitHandler}>
          <span>Login to your account.</span>
          <input
            className='registerForm-email'
            type='email'
            placeholder='Email'
            autoFocus
            onChange={loginEmailHandler}
            value={email}
          />
          <div className='registerForm-passwordContainer'>
            <input
              className='registerForm-password'
              type={`${passwordInputFieldType}`}
              placeholder='Password'
              onChange={loginPasswordHandler}
              value={password}
            />
            <i
              className={`registerForm-passwordEye fa-sharp fa-solid ${iconEyeType}`}
              onClick={setPasswordHandler}
            ></i>
          </div>
          <button className='registerBtn'>Login</button>
        </form>
      </div>
      <div className='sideWrapper'>
        <span>New Here ?</span>
        <p>
          Sign up and discover a new passion for life and find the joy in
          inspiring others !!!!
        </p>
        <Link className='link' to='/register'>
          <button className='sideWrapperBtn' type='submit'>
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
