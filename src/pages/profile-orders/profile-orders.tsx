import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import { getUserOrdersThunk } from '../../services/actions/order';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { userOrders, userOrdersRequest } = useSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    dispatch(getUserOrdersThunk() as any);
  }, [dispatch]);

  if (userOrdersRequest || !userOrders.length) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={userOrders} />;
};
