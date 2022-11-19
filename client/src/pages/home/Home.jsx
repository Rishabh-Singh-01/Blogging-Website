import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import './home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // Immediate evoke fn IIFE
    (async () => {
      const res = await axios.get('/posts');
      const { posts } = res.data.data;
      setPosts(posts);
    })();

    console.log('THIS IS A MESSAGE FROM HOME');
  }, []);
  return (
    <>
      <Header />
      <div className='home container'>
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
