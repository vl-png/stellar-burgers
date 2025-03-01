import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { registerUserThunk } from '../../services/actions/user';
import { RootState } from '../../services/reducers';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registerRequest, registerFailed, isLoggedIn } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerUserThunk({
        email,
        password,
        name: userName
      }) as any
    );
  };

  return (
    <RegisterUI
      errorText={registerFailed ? 'Ошибка регистрации' : ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
      isLoading={registerRequest}
    />
  );
};
