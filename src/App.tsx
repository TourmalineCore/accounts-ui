import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { withPrivateRoute } from './common/withPrivateRoute';
import Template from './template/Template';

const WithPrivateRoute = withPrivateRoute(Template);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="account-management/*"
          element={<WithPrivateRoute />}
        />
      </Routes>
    </BrowserRouter>
  );
}
