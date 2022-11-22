import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './write.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Write = () => {
  const stateEditPost = useLocation().state;
  const [writeTitle, setWriteTitle] = useState(stateEditPost?.title || '');
  const [value, setValue] = useState(stateEditPost?.description || ''); // for react quill description
  const navigate = useNavigate();
  const authContextInstance = useContext(AuthContext);
  // const [writeDescription, setWriteDescription] = useState('');

  const writeFormSubmitHandler = async (e) => {
    e.preventDefault();
    const { user } = authContextInstance.userLogInfo;
    // console.log();
    try {
      let res;
      console.log(stateEditPost);
      stateEditPost
        ? (res = await axios.put(`/posts/${stateEditPost._id}`, {
            username: stateEditPost.username,
            title: writeTitle,
            description: value,
          }))
        : (res = await axios.post('/posts', {
            username: user.username,
            title: writeTitle,
            description: value,
          }));

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
        src='https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg?auto=compress&cs=tinysrgb&w=600'
        alt='beautiful scene'
      />
      <form className='writeForm' onSubmit={writeFormSubmitHandler}>
        <div className='writeFormGroup'>
          <label htmlFor='fileInput' className='writeFormGroupIconCont'>
            <i className='fa-solid fa-image'></i>
          </label>
          <input type='file' id='fileInput' style={{ display: 'none' }} />
          <input
            type='text'
            placeholder='Title'
            className='writeInput'
            autoFocus={true}
            onChange={(e) => setWriteTitle(e.target.value)}
            value={writeTitle}
          />
        </div>
        <div className='writeFormGroup'>
          {/* <textarea
            placeholder='Tell your Story ...'
            typeof='text'
            className='writeInput writeText'
            onChange={(e) => setWriteDescription(e.target.value)}
            value={writeDescription}
          /> */}
          <ReactQuill
            theme='snow'
            value={value}
            onChange={setValue}
            className='reactQuill'
          />
        </div>
        <button className='writeSubmitBtn' type='submit'>
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
