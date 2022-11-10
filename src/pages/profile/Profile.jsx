import './profile.css';
import Sidebar from './../../components/sidebar/Sidebar';

const Profile = () => {
  return (
    <div className='profile'>
      <div className='container'>
        <div className='profile-main specialContainerWrapper'>
          <div className='profile-main-details'>
            <span className='profile-main-details-username'>
              Alexandra Watson
            </span>
            <p className='profile-main-details-desc'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              rem dolore modi non fuga quo magni ut est aut sequi tempora, quam
              maxime inventore praesentium, aperiam aliquam quisquam maiores
              illum!
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              rem dolore modi non fuga quo magni ut est aut sequi tempora, quam
              maxime inventore praesentium, aperiam aliquam quisquam maiores
              illum!
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              rem dolore modi non fuga quo magni ut est aut sequi tempora, quam
              maxime inventore praesentium, aperiam aliquam quisquam maiores
              illum!
            </p>
          </div>
          <div className='profile-pic-cont'>
            <img
              className='profile-main-picture'
              src='https://media.istockphoto.com/id/1324877086/photo/portrait-beautiful-young-woman-with-clean-fresh-skin.jpg?s=612x612&w=0&k=20&c=j_gQlG9owLn23HFGpnL6DhauOHHuVG2wcmZhnH75lqs='
              alt='women face'
            />
          </div>
        </div>
        <div className='profile-update-settings specialContainerWrapper'>
          <div className='settings-heading'>
            <span className='settings-title'>Update Your Information</span>
            <span className='settings-deleteBtn'>Delete Account</span>
          </div>
          <form className='settings-form'>
            <label className='profilePic-update' htmlFor='inputProfilePicture'>
              <span>Upload Picture</span>
              <i className='fa-solid fa-image-portrait'></i>
            </label>
            <input
              type='file'
              id='inputProfilePicture'
              style={{ display: 'none' }}
            />
            <input type='text' placeholder='Username' autoFocus />
            <input type='Email' placeholder='Email' />
            <input type='Password' placeholder='Password' />

            <button className='profile-btn'>Update Profile</button>
          </form>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Profile;
