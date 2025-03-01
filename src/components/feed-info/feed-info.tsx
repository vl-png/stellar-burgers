import { FC } from 'react';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/reducers';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const { feeds } = useSelector((state: RootState) => state.order);

  const orders = feeds?.orders || [];

  const feed = feeds || {
    orders: [],
    total: 0,
    totalToday: 0
  };

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
