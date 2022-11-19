import Post from '../post/Post';
import './posts.css';

const Posts = ({ posts }) => {
  return (
    <div className='posts'>
      {posts.map((post, ind) => (
        <Post post={post} key={ind + 1} />
      ))}
    </div>
  );
};

export default Posts;
