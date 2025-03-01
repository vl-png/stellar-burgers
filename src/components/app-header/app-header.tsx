import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/reducers';

export const AppHeader: FC = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return <AppHeaderUI userName={user?.name} />;
};
