import { Routes, Route, BrowserRouter } from 'react-router';
import { privateRoute } from './route/PrivateRoute';
import { publicRoute } from './route/PublicRoute';
import { useEffect, useReducer, useState } from 'react';
import { AuthProvider } from './components/layout/provider/provider';
import { CookieService } from './util/cookieService';
import { UserInforReducer } from './redux/reducerStore';
import { DEFAULT_AVATAR_FILENAME, DEFAULT_AVATAR_URL } from './constant/general';
import { firebaseStorage } from './config/firebaseStorage';
import { getDownloadURL, ref } from 'firebase/storage';
import { TokenService } from './util/tokenService';
import { UserInforService } from './service/user/userInforService';

const App = () => {
  const [isAuth, setIsAuth] = useState();
  const [{ userAvatar, userName }, dispatch] = useReducer(
    UserInforReducer,
    {
      userName: '',
      userEmail: '',
      phoneNumber: '',   
      userAvatar: DEFAULT_AVATAR_FILENAME,
      userAvatarUrl: DEFAULT_AVATAR_URL,
    },
    (state) => {
      return { ...state };
    }
  );
  
  useEffect(() => {
    const authToken = CookieService.getCookie('accessToken');
    setIsAuth(authToken);
    
    if(isAuth) {
      const {userId} = TokenService.decodeToken(authToken);
      console.log('authTokenPayload', userId);

      //get user info from server
      const userInfo = UserInforService.getPublicUserInfo(userId);
      userInfo.then((res) => {
        console.log('userInfo', res);
        // if (res.status === 200) {
        //   const data = res.data.data;
        //   dispatch({
        //     type: 'SET_USER',
        //     payload: {
        //       userAvatar: data.avatar,
        //       userName: data.name,
        //       userEmail: data.email,
        //       phoneNumber: data.phoneNumber,
        //     }
        //   });
        // }
      });
      //get user avatar
      const avatarRef = ref(firebaseStorage, userAvatar);
      getDownloadURL(avatarRef).then((url) => {
        dispatch({
          type: 'SET_USER_AVATAR',
          payload: {
            userAvatar: url
          }
        });
      });
    }
  }, [isAuth, userAvatar]);
  return (
    <AuthProvider.Provider value={{ isAuth, setIsAuth }}>
      <BrowserRouter>
        {
          <Routes>
            {publicRoute.map((route, i) => (
              <Route key={i} {...route} />
            ))}
          </Routes>
        }
        {isAuth ? (
          <Routes>
            {privateRoute.map((route, i) => (
              <Route key={i} {...route} />
            ))}
          </Routes>
        ) : (
          <></>
        )}
      </BrowserRouter>
    </AuthProvider.Provider>
  );
};

export default App;
