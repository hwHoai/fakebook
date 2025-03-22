import { Routes, Route, BrowserRouter } from 'react-router';
import { privateRoute } from './route/PrivateRoute';
import { publicRoute } from './route/PublicRoute';

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        {
          <Routes>
            {publicRoute.map((route, i) => (
              <Route key={i} {...route} />
            ))}
          </Routes>
        }
        {
          <Routes>
            {privateRoute.map((route, i) => (
              <Route key={i} {...route} />
            ))}
          </Routes>
        }
      </BrowserRouter>
    </div>
  );
};

export default App;
