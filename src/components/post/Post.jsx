import './post.css';

const Post = () => {
  return (
    <div className='post'>
      <div className='post-info'>
        <span className='post-info-title'>
          Elon musk is approaching twitter as if its user are interchangable. Is
          it right?
        </span>
        <p className='post-info-desc'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis
          impedit, cumque pariatur voluptate explicabo sapiente veniam beatae?
          Iste omnis, accusamus voluptatibus vitae mollitia accusantium iure
          inventore itaque, fuga modi delectus?
        </p>
        <div className='post-info-extra'>
          <span className='post-info-time'>1 hour ago</span>
          <span className='post-info-niche'>Technology</span>
        </div>
      </div>
      <picture className='post-img'>
        <img
          src='https://miro.medium.com/fit/c/250/168/1*qWiyMxttCwdDYm7YsVMiQQ.jpeg'
          alt='elon'
        />
      </picture>
    </div>
  );
};

export default Post;
