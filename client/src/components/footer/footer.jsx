import './footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <ul className='footer-nav'>
        <li>
          <a className='footer-link' href='random.shit'>
            Help
          </a>
        </li>
        <li>
          <a className='footer-link' href='random.shit'>
            Status
          </a>
        </li>
        <li>
          <a className='footer-link' href='random.shit'>
            Blogs
          </a>
        </li>
        <li>
          <a className='footer-link' href='random.shit'>
            Privacy
          </a>
        </li>
        <li>
          <a className='footer-link' href='random.shit'>
            Copyrights
          </a>
        </li>
        <li>
          <a className='footer-link' href='random.shit'>
            Terms
          </a>
        </li>
        <li>
          <a className='footer-link' href='random.shit'>
            About Us
          </a>
        </li>
        <li>
          <a className='footer-link' href='random.shit'>
            <div className='sidebar-follow-icon'>
              <i className='fa-brands fa-instagram'></i>
              <i className='fa-brands fa-facebook'></i>
              <i className='fa-brands fa-twitter'></i>
              <i className='fa-brands fa-pinterest'></i>
            </div>
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
