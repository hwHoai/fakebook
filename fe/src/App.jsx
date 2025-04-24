import { Routes, Route, BrowserRouter } from 'react-router';
import { privateRoute } from './route/PrivateRoute';
import { publicRoute } from './route/PublicRoute';
import { useEffect, useReducer, useState } from 'react';
import { AuthProvider, GolbalLoadingProvider, UserInfoProvider } from './components/layout/provider/provider';
import { CookieService } from './util/cookieService';
import { UserInfoReducer } from './redux/reducerStore';
import { DEFAULT_AVATAR_FILENAME, DEFAULT_AVATAR_URL } from './constant/general';
import { TokenService } from './util/tokenService';
import { UserInforService } from './service/user/userInforService';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userPublicInfo, dispatch] = useReducer(UserInfoReducer, {
    userName: '',
    userEmail: '',
    phoneNumber: '',
    userAvatar: DEFAULT_AVATAR_FILENAME,
    userAvatarUrl: DEFAULT_AVATAR_URL
  });


  useEffect(() => {
    // check if token is valid;
    const authToken = CookieService.getCookie('accessToken');
    if (!authToken) {
      dispatch({
        type: 'SET_USER_INFO',
        payload: {
          userAvatar: DEFAULT_AVATAR_FILENAME,
          userAvatarUrl: DEFAULT_AVATAR_URL,
          userName: 'Guest',
          userEmail: '',
          phoneNumber: ''
        }
      });
      setIsAuth(false);
      return;
    }
    try {
    const { userId } = TokenService.decodeToken(authToken);
    //get user info from server
    const request = UserInforService.getPublicUserInfo(userId);
    request.then((userInfo) => {
      if (!userInfo) {
        dispatch({
          type: 'SET_USER_INFO',
          payload: {
            userAvatar: DEFAULT_AVATAR_FILENAME,
            userAvatarUrl: DEFAULT_AVATAR_URL,
            userName: 'Guest',
            userEmail: '',
            phoneNumber: ''
          }
        });
        setIsAuth(false);
        console.warn('userInfo is null');
        return;
      }

      // If userInfo exists
      setIsAuth(true);
      dispatch({
        type: 'SET_USER_INFO',
        payload: {
          userAvatar: userInfo.userProfileImage,
          userName: userInfo.userName,
          userEmail: userInfo.userEmail,
          phoneNumber: userInfo.phoneNumber
        }
      });
    });
    //get user avatar
    UserInforService.getFileFormFirebase(userPublicInfo.userAvatar).then((url) => {
      console.log('Avatar url: ', url);
      dispatch({
        type: 'SET_USER_AVATAR_URL',
        payload: {
          userAvatarUrl: url
        }
      });
    })
    setLoading(false);
    } catch (error) {
      console.error('Error :', error);
      setIsAuth(false);
    }
  }, [isAuth, userPublicInfo.userAvatar, userPublicInfo.userName, userPublicInfo.userEmail, userPublicInfo.phoneNumber]);
  return (
    <GolbalLoadingProvider.Provider value={{ loading, setLoading }}>
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
    </GolbalLoadingProvider.Provider>
  );
};

export default App;
