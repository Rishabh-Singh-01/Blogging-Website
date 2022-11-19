// import axios from 'axios';
import { useState } from 'react';
import AuthContext from './AuthContext';

const AuthState = ({ children }) => {
  // let res;
  // useEffect(() => {
  //   (async () => {
  //     res = await axios.get('/users');
  //     console.log(res);
  //     // const userLogInfoObj = {
  //     //   loggedIn: false,
  //     //   user: {},
  //     // };
  //   })();
  // }, [userLogInfo]);

  const [userLogInfo, setUserLogInfo] = useState({
    loggedIn: false,
    user: {},
  });
  const updateUserLogInfo = function (loggedIn, user) {
    setUserLogInfo({ loggedIn, user });
  };

  return (
    <AuthContext.Provider value={{ userLogInfo, updateUserLogInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
