import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './../login/login.css';

const Register = () => {
  const navigate = useNavigate();
  const authContextInstance = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const registerFormSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('users/signup', {
        username,
        email,
        password,
        passwordConfirm,
      });
      const { user } = res.data.data;

      if (res.data.status === 'success') {
        console.log(user);
        authContextInstance.updateUserLogInfo(true, user);
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }

    setUsername('');
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
  };

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

  return (
    <div className='register'>
      <div className='mainWrapper' style={{ padding: '10rem' }}>
        <form className='registerForm' onSubmit={registerFormSubmitHandler}>
          <span>Create a new account.</span>
          <input
            className='registerForm-username'
            type='text'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            autoFocus
          />
          <input
            className='registerForm-email'
            type='email'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            className='registerForm-password'
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className='registerForm-passwordContainer'>
            <input
              className='registerForm-password'
              type={`${passwordInputFieldType}`}
              placeholder='Confirm Password'
              onChange={(e) => setPasswordConfirm(e.target.value)}
              value={passwordConfirm}
            />
            <i
              className={`registerForm-passwordEye fa-sharp fa-solid ${iconEyeType}`}
              onClick={setPasswordHandler}
            ></i>
          </div>
          <button className='registerBtn'>Sign Up</button>
        </form>
      </div>
      <div className='sideWrapper'>
        <span>Already a writer ?</span>
        <p>
          Login to continue your passion for writing while inspiring others !!!!
        </p>
        <Link className='link' to='/login'>
          <button className='sideWrapperBtn'>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
