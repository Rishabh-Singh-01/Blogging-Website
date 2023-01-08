import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';
import Post from '../../components/post/Post';
import Sidebar from '../../components/sidebar/Sidebar';
import Spinner from '../../components/spinner/Spinner';
import './SearchedPosts.css';

const SearchedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [postPageNo, setPostPageNo] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    (async () => {
      const res = !searchParams.get('search')
        ? await axios.get('/posts')
        : await axios.get(`/posts?search=${searchParams.get('search')}`);
      const { page, posts } = res.data.data;
      setHasMorePosts(res.data.results !== 0);
      setPosts(posts);
      setPostPageNo(page + 1);
      // console.log(posts);
    })();
  }, [searchParams]);

  const fetchMoreSearchedData = async () => {
    const res = !searchParams.get('search')
      ? await axios.get(`/posts?page=${postPageNo}`)
      : await axios.get(
          `/posts?search=${searchParams.get('search')}&page=${postPageNo}`
        );
    const { page, posts: newPosts } = res.data.data;
    setHasMorePosts(res.data.results !== 0);
    setPosts(posts.concat(newPosts));
    setPostPageNo(page + 1);
    console.log(postPageNo);
  };

  const searchFormHandler = (e) => {
    e.preventDefault();
    setSearchParams({ search: searchValue || '' });
    setSearchValue('');
    setPosts([]);
    setPostPageNo(1);
    setHasMorePosts(true);
  };

  return (
    <div className='searchedPosts'>
      <div className='searchedPosts-main container'>
        <div className='searchedPosts-main-top'>
          {!searchParams.get('search') ? (
            <h2>These are the most recent posts :</h2>
          ) : (
            <h2>
              These are the posts for
              {` "${searchParams.get('search').toLowerCase()}"`} :
            </h2>
          )}
          <form onSubmit={searchFormHandler}>
            <input
              type='text'
              placeholder='Search for a post title ...'
              className='searchBox'
              autoFocus={true}
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
            <button type='submit' className='searchBox-btn'>
              <i className='fa-solid fa-magnifying-glass'></i>
            </button>
          </form>
        </div>
        <div className='searchedPosts-main-postList'>
          {/* <Posts allPosts={false} /> */}
          <div className='posts'>
            <InfiniteScroll
              className='posts-container'
              dataLength={postPageNo * 10}
              next={fetchMoreSearchedData}
              hasMore={hasMorePosts}
              loader={<Spinner />}
            >
              {posts.map((post, ind) => (
                <Post post={post} key={ind + 1} />
              ))}
            </InfiniteScroll>
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default SearchedPosts;
