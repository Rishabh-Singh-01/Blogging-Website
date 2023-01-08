import Footer from '../footer/footer';
import './sidebar.css';

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <div className='sidebar-discover'>
        <span>Discover what you like the most</span>
        <ul className='sidebar-discover-list'>
          <li>Technology</li>
          <li>Lifestyle</li>
          <li>Business</li>
          <li>Programming</li>
          <li>Fashion</li>
          <li>Travelling</li>
          <li>Spirituality</li>
          <li>Politics</li>
        </ul>
      </div>
      <Footer />
    </aside>
  );
};

export default Sidebar;
