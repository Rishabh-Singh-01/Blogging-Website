import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import './SearchedPosts.css';

const SearchedPosts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  //   console.log(searchParams);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const searchFormHandler = (e) => {
    e.preventDefault();
    setSearchParams({ search: searchValue });
    setSearchValue('');
  };

  useEffect(() => {
    (async () => {
      const res = !searchParams.get('search')
        ? await axios.get('/posts')
        : await axios.get(`/posts?search=${searchParams.get('search')}`);
      const { posts } = res.data.data;
      setSearchedPosts(posts);
      console.log('this is me dio');
    })();
  }, [searchParams]);
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
          <Posts posts={searchedPosts} />
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default SearchedPosts;
