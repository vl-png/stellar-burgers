import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUserThunk } from '../../services/actions/user';
import { RootState } from '../../services/reducers';
import { useNavigate, useLocation } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loginRequest, loginFailed, isLoggedIn } = useSelector(
    (state: RootState) => state.user
  );

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn, navigate, from]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUserThunk({ email, password }) as any);
  };

  return (
    <LoginUI
      errorText={loginFailed ? 'Ошибка авторизации' : ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      isLoading={loginRequest}
    />
  );
};
