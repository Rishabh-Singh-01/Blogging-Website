import { Link } from 'react-router-dom';
import './../login/login.css';

const Register = () => {
  return (
    <div className='register'>
      <div className='mainWrapper' style={{ padding: '14rem' }}>
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
