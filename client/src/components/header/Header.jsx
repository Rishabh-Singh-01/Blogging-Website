import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  const user = false;
  return (
    <div className='header'>
      <div className='header-cont container'>
        <div className='header-info'>
          <span>Write a new world.</span>
          <p>
            Discover a new passion for writing while journaling your daily life
            to inspire others.
          </p>
          <div className='header-btns'>
            {user ? (
              <Link className='link' to='/write'>
                <span className='header-btns-write'>Write a new story</span>
              </Link>
            ) : (
              <Link className='link' to='/login'>
                <span className='header-btns-write'>Start Writing</span>
              </Link>
            )}
            <span className='header-btns-read'>Read More &darr;</span>
          </div>
        </div>
        <picture className='header-img'>
          <img
            src='https://banner2.cleanpng.com/20180318/aae/kisspng-reading-free-content-clip-art-cartoon-boy-reading-book-5aaeab144f7ef7.2040153915213965003256.jpg'
            alt='book with qoute'
          />
        </picture>
      </div>
    </div>
  );
};

export default Header;
