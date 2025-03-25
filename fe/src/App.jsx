import { Routes, Route, BrowserRouter } from 'react-router';
import { privateRoute } from './route/PrivateRoute';
import { publicRoute } from './route/PublicRoute';
import { useEffect, useState } from 'react';
import { AuthProvider } from './components/layout/provider/AuthProvider';
import { CookieService } from './util/cookieService';

const App = () => {
  const [isAuth, setIsAuth] = useState();
useEffect(() => {
  setIsAuth(CookieService.getCookie('accessToken'));
}, [])
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
