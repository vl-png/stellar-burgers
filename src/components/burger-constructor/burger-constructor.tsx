import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { BurgerConstructorUI } from '@ui';
import { RootState } from '../../services/reducers';
import {
  closeOrderModal,
  createOrderThunk
} from '../../services/reducers/order';
import { AppDispatch } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bun, ingredients, totalPrice } = useSelector(
    (state: RootState) => state.burgerConstructor
  );

  const { orderRequest, order } = useSelector(
    (state: RootState) => state.order
  );

  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/' } });
      return;
    }

    const ingredientIds = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];

    dispatch(createOrderThunk(ingredientIds));
  };

  const handleCloseOrderModal = () => {
    dispatch(closeOrderModal());
  };

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={handleCloseOrderModal}
    />
  );
};
