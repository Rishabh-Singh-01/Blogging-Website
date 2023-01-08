import Footer from '../footer/footer';
import './sidebarAuthor.css';

const SidebarAuthor = ({ post }) => {
  const PUBLIC_URL_IMG_USERS = 'http://localhost:3000/api/v1/img/users/';
  return (
    <div className='sidebarAuthor'>
      <div className='sidebarAuthor-main'>
        <img
          className='sidebarAuthor-img'
          src={`${PUBLIC_URL_IMG_USERS}${
            post.userProfilePicture || 'default.jpg'
          }`}
          alt={`User ${post.username} Profile`}
        />
        <span className='sidebarAuthor-author'>{post.username}</span>
        <p className='sidebarAuthor-description'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis
          aspernatur molestias laborum exercitationem necessitatibus quisquam
          maxime provident maiores laboriosam. Deserunt sapiente unde maiores
          iusto explicabo? Autem, ex. Quibusdam, accusamus nihil!
        </p>
      </div>
      <div className='sidebarAuthor-footerCont'>
        <Footer />
      </div>
    </div>
  );
};

export default SidebarAuthor;
