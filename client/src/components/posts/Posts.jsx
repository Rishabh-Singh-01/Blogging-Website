import { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../post/Post';
import Spinner from '../spinner/Spinner';

import './posts.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [postPageNo, setPostPageNo] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  // const increasePageNo = () => {
  //   setPostPageNo((currentPageNumber) => currentPageNumber + 1);
  // };
  useEffect(() => {
    // Immediate evoke fn IIFE
    (async () => {
      const res = await axios.get(`/posts`);
      const { page, posts } = res.data.data;
      setHasMorePosts(res.data.results !== 0);
      setPosts(posts);
      setPostPageNo(page + 1);
      // setPostPageNo(page + 1);
      // setPostPageNo(postPageNo + 1);
    })();

    console.log('THIS IS A MESSAGE FROM HOME');
  }, []);

  const fetchMoreData = async () => {
    const res = await axios.get(`/posts?page=${postPageNo}`);
    const { page, posts: newPosts } = res.data.data;
    setHasMorePosts(res.data.results !== 0);
    setPosts(posts.concat(newPosts));
    setPostPageNo(page + 1);
    console.log(postPageNo);
  };

  return (
    <div className='posts'>
      <InfiniteScroll
        className='posts-container'
        dataLength={postPageNo * 10}
        next={fetchMoreData}
        hasMore={hasMorePosts}
        loader={<Spinner />}
      >
        {posts.map((post, ind) => (
          <Post post={post} key={ind + 1} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Posts;
