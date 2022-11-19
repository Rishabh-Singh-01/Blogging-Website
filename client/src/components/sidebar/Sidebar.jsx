import './sidebar.css';

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <div className='sidebar-discover'>
        <span>Discover what you like the most</span>
        <ul className='sidebar-discover-list'>
          <li>Writing</li>
          <li>Technology</li>
          <li>Productivity</li>
          <li>Creativity</li>
          <li>Programming</li>
          <li>Life</li>
          <li>Spirituality</li>
          <li>Self Improvement</li>
        </ul>
      </div>
      <div className='sidebar-follow'>
        <span>Follow me :</span>
        <div className='sidebar-follow-icon'>
          <i className='fa-brands fa-instagram'></i>
          <i className='fa-brands fa-facebook'></i>
          <i className='fa-brands fa-twitter'></i>
          <i className='fa-brands fa-pinterest'></i>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
