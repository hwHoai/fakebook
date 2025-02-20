import { Routes, Route, BrowserRouter } from 'react-router';
import { privateRoute } from './route/PrivateRoute';
import { publicRoute } from './route/publicroute';

export const App = () => {
  return (
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
  );
};

export default App;
