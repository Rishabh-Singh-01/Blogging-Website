import axios from 'axios';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './index.css';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const PUBLIC_URL_IMG_USERS = 'http://localhost:3000/api/v1/img/users/';
  const authContextInstance = useContext(AuthContext);
  const { user, loggedIn } = authContextInstance.userLogInfo;

  const logOutHandler = async () => {
    try {
      await axios.get('/users/logout');
      authContextInstance.updateUserLogInfo(false, {});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='navBar'>
      <div className='navBar-left'>Diary</div>
      <div className='navBar-middle'>
        <ul className='navBar-middle-list'>
          <li>
            <Link className='link' to='/'>
              Home
            </Link>
          </li>
          <li>
            <Link className='link' to='/'>
              About
            </Link>
          </li>
          <li>
            <Link className='link' to='/posts'>
              Search
            </Link>
          </li>
          <li>
            <Link className='link' to='/write' state={null}>
              Write
            </Link>
          </li>
          {loggedIn ? (
            <li onClick={logOutHandler}>
              <Link className='link logout-btn' to='/'>
                Logout
              </Link>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
      <div className='navBar-right'>
        {loggedIn ? (
          <Link className='link navBar-right-img-cont' to='/profile'>
            <img
              className='navBar-right-img'
              src={`${PUBLIC_URL_IMG_USERS}${user.profilePic || 'default.jpg'}`}
              alt='woman face'
            />
          </Link>
        ) : (
          <Link className='link' to='/login'>
            <span className='userStartingBtn'>Start Writing</span>
          </Link>
        )}
      </div>
    </div>
  );
};
