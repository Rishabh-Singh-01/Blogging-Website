import './footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container grid grid--footer'>
        <div className='logo-col'>
          <a href='google.com' className='footer-logo'>
            <img className='logo' alt='Diary logo' src='img/diary-logo.png' />
          </a>

          <div className='sidebar-follow'>
            <div className='sidebar-follow-icon'>
              <i className='fa-brands fa-instagram'></i>
              <i className='fa-brands fa-facebook'></i>
              <i className='fa-brands fa-twitter'></i>
              <i className='fa-brands fa-pinterest'></i>
            </div>
          </div>

          <p className='copyright'>
            Copyright &copy; <span className='year'>2027</span> by Diary, Inc.
            All rights reserved.
          </p>
        </div>

        <div className='address-col'>
          <p className='footer-heading'>Contact us</p>
          <address className='contacts'>
            <p className='address'>
              623 Harrison St., 2nd Floor, San Francisco, CA 94107
            </p>
            <p>
              <a className='footer-link' href='tel:415-201-6370'>
                415-201-6370
              </a>
              <br />
              <a className='footer-link' href='mailto:hello@diary.com'>
                hello@diary.com
              </a>
            </p>
          </address>
        </div>

        <nav className='nav-col'>
          <p className='footer-heading'>Account</p>
          <ul className='footer-nav'>
            <li>
              <a className='footer-link' href='random.shit'>
                Create account
              </a>
            </li>
            <li>
              <a className='footer-link' href='random.shit'>
                Sign in
              </a>
            </li>
            <li>
              <a className='footer-link' href='random.shit'>
                iOS app
              </a>
            </li>
            <li>
              <a className='footer-link' href='random.shit'>
                Android app
              </a>
            </li>
          </ul>
        </nav>

        <nav className='nav-col'>
          <p className='footer-heading'>Company</p>
          <ul className='footer-nav'>
            <li>
              <a className='footer-link' href='random.shit'>
                About Diary
              </a>
            </li>
            <li>
              <a className='footer-link' href='random.shit'>
                For Business
              </a>
            </li>
            <li>
              <a className='footer-link' href='random.shit'>
                Our partners
              </a>
            </li>
            <li>
              <a className='footer-link' href='random.shit'>
                Careers
              </a>
            </li>
          </ul>
        </nav>

        <nav className='nav-col'>
          <p className='footer-heading'>Resources</p>
          <ul className='footer-nav'>
            <li>
              <a className='footer-link' href='random.shit'>
                Recipe directory{' '}
              </a>
            </li>
            <li>
              <a className='footer-link' href='random.shit'>
                Help center
              </a>
            </li>
            <li>
              <a className='footer-link' href='random.shit'>
                Privacy & terms
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
