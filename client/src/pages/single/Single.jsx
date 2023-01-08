import axios from 'axios';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './single.css';
import DOMPurify from 'dompurify';
import AuthContext from '../../context/AuthContext';
import SidebarAuthor from '../../components/sidebarAuthor/SidebarAuthor';

const Single = () => {
  const PUBLIC_URL_IMG_POSTS = 'http://localhost:3000/api/v1/img/posts/';
  const PUBLIC_URL_IMG_USERS = 'http://localhost:3000/api/v1/img/users/';
  const authContextInstance = useContext(AuthContext);
  const { user } = authContextInstance.userLogInfo;
  const [post, setPost] = useState({});
  const location = useLocation();
  const [postLiked, setPostLiked] = useState(false);
  const [postLikeCount, setPostLikeCount] = useState(0);
  const postId = location.pathname.split('/')[2];
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/posts/${postId}`);
      const { post } = res.data.data;
      console.log(post);
      setPost(post);
    })();
  }, [postId]);

  useEffect(() => {
    setPostLiked(post.likes?.includes(user._id));
    setPostLikeCount(post.likes?.length);
  }, [user._id, post.likes]);

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(`/posts/${postId}`);
      console.log(res);
      if (res.status === 204) navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const updateLikeHandler = async () => {
    const res = await axios.patch(`/posts/${postId}/like`, {
      userId: user._id,
    });
    const { postLikes } = res.data.data;
    console.log(res.data);
    if (res.data.status === 'success') {
      setPostLiked(!postLiked);
      setPostLikeCount(postLikes);
      console.log(postLikes);
    }
  };

  return (
    <div className='single'>
      <div className='single-main container'>
        <div className='single-main-extra specialContainerWrapper'>
          <img
            src={`${PUBLIC_URL_IMG_USERS}${
              post.userProfilePicture || 'default.jpg'
            }`}
            alt={`User ${post.username} Profile`}
          />
          <div className='single-main-extra-details'>
            <span className='single-main-author'>{post.username}</span>
            <span className='single-main-time'>
              {new Date(post.updatedAt).toDateString()}
            </span>
          </div>
          <div className='single-main-extra-appreciation'>
            <i
              className={`fa-${
                postLiked === true ? 'solid' : 'regular'
              } fa-heart`}
              onClick={updateLikeHandler}
            ></i>
            <span>{postLikeCount} </span>
            {/* <i class='fa-regular fa-comment'></i> */}
          </div>
        </div>
        <div className='single-main-post specialContainerWrapper'>
          <img
            src={`${PUBLIC_URL_IMG_POSTS}${post.photo || 'default.jpg'}`}
            // src='https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=600'
            alt='beautiful landscape'
          />
          <div className='single-main-post-titleBox'>
            <span className='single-main-post-title'>{post.title}</span>
            {user.email === post.userEmail ? (
              <div className='single-main-post-titleBox-icons'>
                <Link className='link' to={`/write?edit=2`} state={post}>
                  <i className='fa-solid fa-pen-to-square updatePostBtn'></i>
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
      <SidebarAuthor post={post} />
    </div>
  );
};

export default Single;
