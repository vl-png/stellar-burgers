import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';

type TProtectedRouteProps = {
  children: ReactNode;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  if (!onlyUnAuth && !isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isLoggedIn) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};
