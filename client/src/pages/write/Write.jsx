import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './write.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Write = () => {
  const PUBLIC_URL_IMG_POSTS = 'http://localhost:3000/api/v1/img/posts/';
  const stateEditPost = useLocation().state;
  const [writeTitle, setWriteTitle] = useState(stateEditPost?.title || '');
  const [value, setValue] = useState(stateEditPost?.description || ''); // for react quill description
  const navigate = useNavigate();
  const authContextInstance = useContext(AuthContext);
  // const [writeDescription, setWriteDescription] = useState('');
  const [settingsPostPic, setSettingsPostPic] = useState(null);
  const [category, setCategory] = useState('Technology');

  const writeFormSubmitHandler = async (e) => {
    e.preventDefault();
    const { user } = authContextInstance.userLogInfo;
    console.log(user);
    try {
      let res;
      const form = new FormData();
      form.append(
        'username',
        stateEditPost ? stateEditPost.username : user.username
      );
      form.append('title', writeTitle);
      form.append('description', value);
      form.append('userProfilePicture', user.profilePic);
      form.append('userEmail', user.email);
      form.append('categories', category);
      if (settingsPostPic) {
        form.append('photo', settingsPostPic);
      }
      stateEditPost
        ? (res = await axios.put(`/posts/${stateEditPost._id}`, form))
        : (res = await axios.post('/posts', form));
      console.log('//////////////////////////////////////////');

      console.log('dat');
      const { status, data } = res.data;
      if (status === 'success') {
        navigate(`/posts/${data.post._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='write container'>
      <img
        className='writeImg'
        src={`${PUBLIC_URL_IMG_POSTS}${
          stateEditPost === null ? 'default.jpg' : stateEditPost.photo
        }`}
        // src='https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg?auto=compress&cs=tinysrgb&w=600'
        alt='beautiful scene'
      />
      <form className='writeForm' onSubmit={writeFormSubmitHandler}>
        <div className='writeFormGroup'>
          <label htmlFor='fileInput' className='writeFormGroupIconCont'>
            <i className='fa-solid fa-image'></i>
          </label>
          <input
            type='file'
            id='fileInput'
            style={{ display: 'none' }}
            onChange={(e) => setSettingsPostPic(e.target.files[0])}
          />
          <input
            type='text'
            placeholder='Title'
            className='writeInput'
            autoFocus={true}
            onChange={(e) => setWriteTitle(e.target.value)}
            value={writeTitle}
          />
        </div>
        <ReactQuill
          theme='snow'
          value={value}
          onChange={setValue}
          className='reactQuill'
        />
        <div className='writeSubmitBtnsCont'>
          <div className='writeCategory'>
            <label htmlFor='categories'>Category:</label>
            <select
              name='categories'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value='Technology'>Technology</option>
              <option value='Lifestyle'>Lifestyle</option>
              <option value='Business'>Business</option>
              <option value='Programming'>Programming</option>
              <option value='Fashion'>Fashion</option>
              <option value='Travelling'>Travelling</option>
              <option value='Spirituality'>Spirituality</option>
              <option value='Politics'>Politics</option>
            </select>
          </div>
          <button className='writeSubmitBtn' type='submit'>
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;
