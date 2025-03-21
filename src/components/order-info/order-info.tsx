import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { RootState } from '../../services/reducers';
import { useParams, useLocation } from 'react-router-dom';
import { getOrderThunk } from '../../services/reducers/order';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>();
  const location = useLocation();

  const { ingredients } = useSelector((state: RootState) => state.ingredients);
  const { currentOrder, currentOrderRequest } = useSelector(
    (state: RootState) => state.order
  );
  const { feeds } = useSelector((state: RootState) => state.order);
  const { userOrders } = useSelector((state: RootState) => state.order);

  const orderData = useMemo(() => {
    if (currentOrder) return currentOrder;

    if (location.pathname.includes('/feed') && feeds) {
      return (
        feeds.orders.find((order) => order.number === Number(number)) || null
      );
    }

    if (location.pathname.includes('/profile/orders')) {
      return (
        userOrders.find((order) => order.number === Number(number)) || null
      );
    }

    return null;
  }, [currentOrder, feeds, userOrders, location.pathname, number]);

  useEffect(() => {
    if (!orderData && number) {
      dispatch(getOrderThunk(Number(number)) as any);
    }
  }, [dispatch, orderData, number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (currentOrderRequest || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
