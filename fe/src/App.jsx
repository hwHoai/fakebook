import { Routes, Route, BrowserRouter } from 'react-router';
import { privateRoute } from './route/PrivateRoute';
import { publicRoute } from './route/PublicRoute';
import { useEffect, useReducer, useState } from 'react';
import { AuthProvider, UserInfoProvider } from './components/layout/provider/provider';
import { CookieService } from './util/cookieService';
import { UserInfoReducer } from './redux/reducerStore';
import { DEFAULT_AVATAR_FILENAME, DEFAULT_AVATAR_URL } from './constant/general';
import { firebaseStorage } from './config/firebaseStorage';
import { getDownloadURL, ref } from 'firebase/storage';
import { TokenService } from './util/tokenService';
import { UserInforService } from './service/user/userInforService';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [userPublicInfo, dispatch] = useReducer(
    UserInfoReducer,
    {
      userName: '',
      userEmail: '',
      phoneNumber: '',
      userAvatar: DEFAULT_AVATAR_FILENAME,
      userAvatarUrl: DEFAULT_AVATAR_URL
    }
  );

  useEffect(() => {
    const authToken = CookieService.getCookie('accessToken');
    setIsAuth(!!authToken);
    console.log('isAuth', isAuth);	
    if (isAuth) {
      const { userId } = TokenService.decodeToken(authToken);

      //get user info from server
      const request = UserInforService.getPublicUserInfo(userId);
      request.then((userInfo) => {
        if (userInfo) {
          console.log('userInfo', userInfo.userName);
          dispatch({
            type: 'SET_USER_INFO',
            payload: {
              userAvatar: userInfo.userProfileImage,
              userName: userInfo.userName,
              userEmail: userInfo.userEmail,
              phoneNumber: userInfo.phoneNumber
            }
          });
        }
      });
      //get user avatar
      const avatarRef = ref(firebaseStorage, userPublicInfo.userAvatar);
      getDownloadURL(avatarRef).then((url) => {
        dispatch({
          type: 'SET_USER_AVATAR_URL',
          payload: {
            userAvatarUrl: url
          }
        });
      });
    }
  }, [isAuth, userPublicInfo.userAvatar]);
  console.log('userAvatarUrl', userPublicInfo.userAvatarUrl);
  return (
    <AuthProvider.Provider value={{ isAuth, setIsAuth }}>
      <UserInfoProvider.Provider value={userPublicInfo}>
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
      </UserInfoProvider.Provider>
    </AuthProvider.Provider>
  );
};

export default App;
