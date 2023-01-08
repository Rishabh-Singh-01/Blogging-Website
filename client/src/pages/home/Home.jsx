import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';

import './home.css';

const Home = () => {
  return (
    <>
      <Header />
      <div className='home container'>
        <Posts />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
