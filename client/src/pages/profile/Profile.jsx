import './profile.css';
import Sidebar from './../../components/sidebar/Sidebar';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';

// ,
//     userEmail: {
//       type: String,
//       required: true,
//     },

const Profile = () => {
  const PUBLIC_URL_IMG_USERS = 'http://localhost:3000/api/v1/img/users/';

  const authContextInstance = useContext(AuthContext);
  const { user } = authContextInstance.userLogInfo;
  console.log(user);

  const [settingsUsername, setSettingsUsername] = useState('');
  // const [settingsEmail, setSettingsEmail] = useState('');
  const [settingsAboutMe, setSettingsAboutMe] = useState('');
  const [settingsUserProfilePic, setSettingsUserProfilePic] = useState(null);

  const submitSettingsProfileHandler = async (e) => {
    e.preventDefault();

    try {
      if (
        settingsUsername === '' &&
        // settingsEmail === '' &&
        settingsAboutMe === '' &&
        settingsUserProfilePic === null
      ) {
        throw new Error(
          'Please fill atleast one form field from profile section!!'
        );
      }

      const form = new FormData();
      form.append('username', settingsUsername || user.username);
      form.append('email', user.email);
      form.append('aboutme', settingsAboutMe || user.aboutme);
      if (settingsUserProfilePic) {
        form.append('photo', settingsUserProfilePic);
      }

      const res = await axios.patch('users/update-my-data', form);
      const { user: resUser } = res.data.data;
      if (res.data.status === 'success') {
        console.log(resUser);
        authContextInstance.updateUserLogInfo(true, resUser);
        // to reaload the whole page
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }

    setSettingsUsername('');
    // setSettingsEmail('');
    setSettingsAboutMe('');
    setSettingsUserProfilePic(null);
  };
  return (
    <div className='profile'>
      <div className='container'>
        <div className='profile-main specialContainerWrapper'>
          <div className='profile-main-details'>
            <span className='profile-main-details-username'>
              {user.username}
            </span>
            <p className='profile-main-details-desc'>{user.aboutme}</p>
          </div>
          <div className='profile-pic-cont'>
            <img
              className='profile-main-picture'
              src={`${PUBLIC_URL_IMG_USERS}${
                user?.profilePic || 'default.jpg'
              }`}
              alt={`User ${user.username} Profile`}
            />
          </div>
        </div>
        <div className='profile-update-settings specialContainerWrapper'>
          <div className='settings-heading'>
            <span className='settings-title'>Update your Account ...</span>
            <span className='settings-deleteBtn'>Delete Account</span>
          </div>
          <form
            className='settings-form'
            onSubmit={submitSettingsProfileHandler}
          >
            <label className='profilePic-update' htmlFor='inputProfilePicture'>
              <span>Upload Picture</span>
              <i className='fa-solid fa-image-portrait'></i>
            </label>
            <input
              type='file'
              id='inputProfilePicture'
              style={{ display: 'none' }}
              onChange={(e) => setSettingsUserProfilePic(e.target.files[0])}
            />
            <input
              type='text'
              placeholder={user.username}
              onChange={(e) => setSettingsUsername(e.target.value)}
              value={settingsUsername}
              autoFocus
            />
            {/* <input
              type='Email'
              placeholder={user.email}
              onChange={(e) => setSettingsEmail(e.target.value)}
              value={settingsEmail}
            /> */}
            <textarea
              placeholder={user.aboutme}
              onChange={(e) => setSettingsAboutMe(e.target.value)}
              value={settingsAboutMe}
            />
            <button className='profile-btn'>Update Profile</button>
          </form>
          <span className='settings-heading-password'>
            Update your password ...
          </span>
          <form className='settings-form settings-form-password'>
            <input type='Password' placeholder='Current Password' />
            <input type='Password' placeholder='New Password' />
            <input type='Password' placeholder='Confirm New Password' />

            <button className='profile-btn'>Update Password</button>
          </form>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Profile;
