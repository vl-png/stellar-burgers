import { rootReducer } from '../index';
import { constructorSlice } from '../constructor';
import { ingredientsSlice } from '../ingredients';
import { orderSlice } from '../order';
import { userSlice } from '../user';

describe('rootReducer', () => {
  it('должен возвращать начальное состояние при вызове с undefined state и неизвестным action', () => {
    const expectedState = {
      ingredients: ingredientsSlice.getInitialState(),
      burgerConstructor: constructorSlice.getInitialState(),
      order: orderSlice.getInitialState(),
      user: userSlice.getInitialState()
    };

    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual(expectedState);
  });
});
