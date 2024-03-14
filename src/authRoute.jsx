import { Route, Navigate } from 'react-router-dom';
import { useUserContext } from './component/conext api/userContext';

const AuthRoute = ({ element, ...rest }) => {
  const { user } = useUserContext();

  return user ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
};

export default AuthRoute;
