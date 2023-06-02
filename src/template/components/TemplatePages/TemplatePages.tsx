import {
  memo,
  useContext,
  useEffect,
} from 'react';
import { Route, Routes } from 'react-router-dom';
import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';
import { authService } from '../../../common/authService';
import RoutesStateContext from '../../../routes/state/RoutesStateContext';
import { parseJwt } from '../../../common/utils/utilsForPermissions';

const token = authService.getAuthToken();

function TemplatePages({
  routes = [],
}: {
  routes: {
    path: string;
    breadcrumb: string | ((props: BreadcrumbComponentProps) => string | undefined);
    Component: () => JSX.Element;
  }[];
}) {
  const routesStateContext = useContext(RoutesStateContext);

  useEffect(() => {
    // @ts-ignore
    routesStateContext.checkPermissionFromToken(parseJwt(token).permissions);
  }, []);

  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={<Component />}
        />
      ))}
    </Routes>
  );
}

export default memo(TemplatePages);
