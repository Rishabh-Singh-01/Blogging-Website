import { Link } from 'react-router-dom';
import './post.css';

const Post = ({ post }) => {
  const PUBLIC_URL_IMG_POSTS = 'http://localhost:3000/api/v1/img/posts/';
  const PUBLIC_URL_IMG_USERS = 'http://localhost:3000/api/v1/img/users/';
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  return (
    <div className='post'>
      <div className='post-info'>
        <figure className='post-info-author'>
          <img
            src={`${PUBLIC_URL_IMG_USERS}${
              post.userProfilePicture || 'default.jpg'
            }`}
            alt='women face'
          />
          <span>{post.username}</span>
        </figure>
        <Link to={`/posts/${post._id}`} className='link'>
          <span className='post-info-title'>{post.title}</span>
        </Link>
        <p className='post-info-desc'>{getText(post.description)}</p>
        <div className='post-info-extra'>
          <span className='post-info-time'>
            {new Date(post.updatedAt).toDateString()}
          </span>
          <span>&#8226; </span>
          {post.categories.map((category, ind) => (
            <span
              key={`${post.title}-category-${ind + 1}`}
              className='post-info-niche'
            >
              {category}
            </span>
          ))}
        </div>
      </div>
      <picture className='post-img'>
        <img
          src={`${PUBLIC_URL_IMG_POSTS}${post.photo || 'default.jpg'}`}
          alt='Cover img for the post'
        />
      </picture>
    </div>
  );
};

export default Post;
