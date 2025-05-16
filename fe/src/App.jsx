import { Routes, Route, BrowserRouter } from 'react-router';
import { privateRoute } from './route/PrivateRoute';
import { publicRoute } from './route/PublicRoute';
import { useEffect, useLayoutEffect, useReducer, useState } from 'react';
import { AuthProvider, GolbalLoadingProvider, UserInfoProvider } from './components/layout/provider/provider';
import { CookieService } from './util/cookieService';
import { UserInfoReducer } from './redux/reducerStore';
import { DEFAULT_AVATAR_FILENAME, DEFAULT_AVATAR_URL } from './constant/general';
import { TokenService } from './util/tokenService';
import { UserInforService } from './service/user/userInforService';
import { ERRORCODE } from './constant/code';
import { UserClientService } from './service/client/user/userClientService';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(CookieService.getCookie('accessToken') || null);
  const [refreshToken, setRefreshToken] = useState(CookieService.getCookie('refreshToken') || null);
  const [userPublicInfo, dispatch] = useReducer(UserInfoReducer, {
    userId: '',
    userName: '',
    userEmail: '',
    phoneNumber: '',
    userAvatar: DEFAULT_AVATAR_FILENAME,
    userAvatarUrl: DEFAULT_AVATAR_URL
  });

  useEffect(() => {
    if (CookieService.getCookie('accessToken') && CookieService.getCookie('refreshToken')) {
      setAccessToken(CookieService.getCookie('accessToken'));
      setRefreshToken(CookieService.getCookie('refreshToken'));
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newAccessToken = CookieService.getCookie('accessToken') || null;
      if (newAccessToken !== accessToken) {
        setAccessToken(newAccessToken);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [accessToken, refreshToken]);

  useLayoutEffect(() => {
    try {
      // check if token is valid;
      if (!accessToken && !refreshToken) {
        throw new Error({ message: 'Token is null', code: ERRORCODE.TOKEN_NULL });
      }

      //get user info from server
      const { userId } = TokenService.decodeToken(accessToken || refreshToken) || {};
      UserInforService.getPublicUserInfo(userId)
        .then((userInfo) => {

          if (!userInfo) {
            throw new Error({ message: 'userInfo is null', code: ERRORCODE.USERINFO_NULL });
          }

          // If userInfo exists
          setIsAuth(true);
          dispatch({
            type: 'SET_USER_INFO',
            payload: {
              userId: userInfo.userId,
              userAvatar: userInfo.userProfileImage,
              userName: userInfo.userName,
              userEmail: userInfo.userEmail,
              phoneNumber: userInfo.phoneNumber
            }
          });
          return userInfo;
        })
        .then((res) => {
          UserClientService.setUserAvatarUrlToUserInfoProvider(userId, res.userProfileImage, dispatch);
          setLoading(false);
        })
        .catch((error) => {
          throw new Error({ message: error });
        });
    } catch (error) {
      switch (error.code) {
        case ERRORCODE.TOKEN_NULL: {
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
          console.warn('Token is null');
          break;
        }
        case ERRORCODE.USERINFO_NULL: {
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
          console.warn('UserInfo is null');
          break;
        }
        default: {
          console.warn('Error', error);
        }
      }
    }
  }, [accessToken, refreshToken]);
  return (
    <GolbalLoadingProvider.Provider value={{ loading, setLoading }}>
      <AuthProvider.Provider value={{ isAuth, setIsAuth }}>
        <UserInfoProvider.Provider value={{ userPublicInfo, dispatch }}>
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
