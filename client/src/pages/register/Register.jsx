import { useState } from 'react';
import { Link } from 'react-router-dom';
import './../login/login.css';

const Register = () => {
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

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
        <form className='registerForm'>
          <span>Create a new account.</span>
          <input
            className='registerForm-username'
            type='text'
            placeholder='Username'
            autoFocus
          />
          <input
            className='registerForm-email'
            type='email'
            placeholder='Email'
          />
          <input
            className='registerForm-password'
            type='password'
            placeholder='Password'
          />
          <div className='registerForm-passwordContainer'>
            <input
              className='registerForm-password'
              type={`${passwordInputFieldType}`}
              placeholder='Confirm Password'
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
