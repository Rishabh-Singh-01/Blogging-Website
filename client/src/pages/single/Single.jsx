import axios from 'axios';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './../../components/sidebar/Sidebar';
import './single.css';
import DOMPurify from 'dompurify';
import AuthContext from '../../context/AuthContext';

const Single = () => {
  const authContextInstance = useContext(AuthContext);
  const { user } = authContextInstance.userLogInfo;
  const [post, setPost] = useState({});
  const location = useLocation();
  const postId = location.pathname.split('/')[2];
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const res = await axios.get(`/posts/${postId}`);
      const { post } = res.data.data;
      setPost(post);
    })();
  }, [postId]);

  const updatePostHandler = () => {
    console.log(post);
  };

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(`/posts/${postId}`);
      console.log(res);
      if (res.status === 204) navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='single'>
      <div className='single-main container'>
        <div className='single-main-extra specialContainerWrapper'>
          <img
            src='https://media.istockphoto.com/id/1324877086/photo/portrait-beautiful-young-woman-with-clean-fresh-skin.jpg?s=612x612&w=0&k=20&c=j_gQlG9owLn23HFGpnL6DhauOHHuVG2wcmZhnH75lqs='
            alt='women face'
          />
          <div className='single-main-extra-details'>
            <span className='single-main-author'>{post.username}</span>
            <span className='single-main-time'>
              {new Date(post.updatedAt).toDateString()}
            </span>
          </div>
        </div>
        <div className='single-main-post specialContainerWrapper'>
          <img
            src='https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=600'
            alt='beautiful landscape'
          />
          <div className='single-main-post-titleBox'>
            <span className='single-main-post-title'>{post.title}</span>
            {user?.username === post.username ? (
              <div className='single-main-post-titleBox-icons'>
                <Link className='link' to={`/write?edit=2`} state={post}>
                  <i
                    className='fa-solid fa-pen-to-square updatePostBtn'
                    onClick={updatePostHandler}
                  ></i>
                </Link>
                <i
                  className='fa-regular fa-trash-can deletePostBtn'
                  onClick={deletePostHandler}
                ></i>
              </div>
            ) : (
              <></>
            )}
          </div>
          <p
            className='single-main-post-desc'
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.description, {
                USE_PROFILES: { html: true },
              }),
            }}
          ></p>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Single;
