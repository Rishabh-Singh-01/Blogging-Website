import { Link } from 'react-router-dom';
import './post.css';

const Post = ({ post }) => {
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };
  return (
    <div className='post'>
      <div className='post-info'>
        <Link to={`/posts/${post._id}`} className='link'>
          <span className='post-info-title'>{post.title}</span>
        </Link>
        <p className='post-info-desc'>{getText(post.description)}</p>
        <div className='post-info-extra'>
          <span className='post-info-time'>
            {new Date(post.updatedAt).toDateString()}
          </span>
          <span className='post-info-niche'>Technology</span>
        </div>
      </div>
      <picture className='post-img'>
        <img
          src='https://miro.medium.com/fit/c/250/168/1*qWiyMxttCwdDYm7YsVMiQQ.jpeg'
          alt='elon'
        />
      </picture>
    </div>
  );
};

export default Post;
