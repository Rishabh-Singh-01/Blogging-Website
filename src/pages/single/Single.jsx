import Sidebar from './../../components/sidebar/Sidebar';
import './single.css';

const Single = () => {
  return (
    <div className='single'>
      <div className='single-main container'>
        <div className='single-main-extra specialContainerWrapper'>
          <img
            src='https://media.istockphoto.com/id/1324877086/photo/portrait-beautiful-young-woman-with-clean-fresh-skin.jpg?s=612x612&w=0&k=20&c=j_gQlG9owLn23HFGpnL6DhauOHHuVG2wcmZhnH75lqs='
            alt='women face'
          />
          <div className='single-main-extra-details'>
            <span className='single-main-author'>Alexandra Watson</span>
            <span className='single-main-time'>1 hour ago</span>
          </div>
        </div>
        <div className='single-main-post specialContainerWrapper'>
          <img
            src='https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=600'
            alt='beautiful landscape'
          />
          <div className='single-main-post-titleBox'>
            <span className='single-main-post-title'>
              Elon musk is approaching twitter as if its user are
              interchangable. Is it right?
            </span>
            <div className='single-main-post-titleBox-icons'>
              <i className='fa-solid fa-pen-to-square'></i>
              <i className='fa-regular fa-trash-can'></i>
            </div>
          </div>
          <p className='single-main-post-desc'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure vero,
            consequatur praesentium quos, cum sequi repudiandae provident ipsam
            quidem architecto, sapiente maiores numquam nam. Accusantium
            mollitia possimus nemo vero eaque! Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Iure vero, consequatur praesentium
            quos, cum sequi repudiandae provident ipsam quidem architecto,
            sapiente maiores numquam nam. Accusantium mollitia possimus nemo
            vero eaque! Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Iure vero, consequatur praesentium quos, cum sequi repudiandae
            provident ipsam quidem architecto, sapiente maiores numquam nam.
            Accusantium mollitia possimus nemo vero eaque! Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Iure vero, consequatur
            praesentium quos, cum sequi repudiandae provident ipsam quidem
            architecto, sapiente maiores numquam nam. Accusantium mollitia
            possimus nemo vero eaque! Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Iure vero, consequatur praesentium quos, cum sequi
            repudiandae provident ipsam quidem architecto, sapiente maiores
            numquam nam. Accusantium mollitia possimus nemo vero eaque!
          </p>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Single;
