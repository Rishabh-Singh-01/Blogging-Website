import axios from 'axios';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './index.css';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const authContextInstance = useContext(AuthContext);
  const { loggedIn } = authContextInstance.userLogInfo;

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
              src='https://media.istockphoto.com/id/1324877086/photo/portrait-beautiful-young-woman-with-clean-fresh-skin.jpg?s=612x612&w=0&k=20&c=j_gQlG9owLn23HFGpnL6DhauOHHuVG2wcmZhnH75lqs='
              alt='woman face'
            />
          </Link>
        ) : (
          <Link className='link' to='/login'>
            <span className='userLogoutStartingBtn'>Start Writing</span>
          </Link>
        )}
      </div>
    </div>
  );
};
