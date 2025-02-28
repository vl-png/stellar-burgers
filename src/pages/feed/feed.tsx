import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import { getFeedsThunk } from '../../services/actions/order';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { feeds, feedsRequest } = useSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    dispatch(getFeedsThunk() as any);
  }, [dispatch]);

  if (feedsRequest || !feeds) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={feeds.orders}
      handleGetFeeds={() => dispatch(getFeedsThunk() as any)}
    />
  );
};
