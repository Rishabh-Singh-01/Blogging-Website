import './write.css';

const Write = () => {
  return (
    <div className='write container'>
      <img
        className='writeImg'
        src='https://images.pexels.com/photos/2775196/pexels-photo-2775196.jpeg?auto=compress&cs=tinysrgb&w=600'
        alt='beautiful scene'
      />
      <form className='writeForm'>
        <div className='writeFormGroup'>
          <label htmlFor='fileInput' className='writeFormGroupIconCont'>
            <i class='fa-solid fa-image'></i>
          </label>
          <input type='file' id='fileInput' style={{ display: 'none' }} />
          <input
            type='text'
            placeholder='Title'
            className='writeInput'
            autoFocus={true}
          />
        </div>
        <div className='writeFormGroup'>
          <textarea
            placeholder='Tell your Story ...'
            typeof='text'
            className='writeInput writeText'
          />
        </div>
        <button className='writeSubmitBtn'>Publish</button>
      </form>
    </div>
  );
};

export default Write;
