import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  return (
    <div className='register'>
      <div className='mainWrapper'>
        <form className='registerForm'>
          <span>Login to your account.</span>
          <input
            className='registerForm-email'
            type='email'
            placeholder='Email'
            autoFocus
          />
          <input
            className='registerForm-password'
            type='password'
            placeholder='Password'
          />
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
          <button className='sideWrapperBtn'>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
