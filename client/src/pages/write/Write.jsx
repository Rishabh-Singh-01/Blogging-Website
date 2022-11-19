import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './write.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Write = () => {
  const [value, setValue] = useState(''); // for react quill
  const navigate = useNavigate();
  const authContextInstance = useContext(AuthContext);
  const [writeTitle, setWriteTitle] = useState('');
  const [writeDescription, setWriteDescription] = useState('');

  const writeFormSubmitHandler = async (e) => {
    e.preventDefault();
    const { user } = authContextInstance.userLogInfo;
    console.log(writeTitle);
    try {
      const res = await axios.post('/posts', {
        username: user.username,
        title: writeTitle,
        description: value,
      });
      const { status, data } = res.data;
      console.log(res.data);
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
