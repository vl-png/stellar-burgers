import orderReducer, {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailed,
  closeOrderModal,
  orderSlice
} from '../order';
import { mockOrder } from './mockData';

describe('order reducer', () => {
  const initialState = orderSlice.getInitialState();

  it('должен возвращать начальное состояние', () => {
    expect(orderReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('должен обрабатывать экшен createOrderRequest', () => {
    const state = orderReducer(initialState, createOrderRequest());

    expect(state.orderRequest).toBe(true);
    expect(state.orderFailed).toBe(false);
    expect(state.order).toBeNull();
  });

  it('должен обрабатывать экшен createOrderSuccess', () => {
    let state = orderReducer(initialState, createOrderRequest());
    expect(state.orderRequest).toBe(true);

    state = orderReducer(state, createOrderSuccess(mockOrder));

    expect(state.orderRequest).toBe(false);
    expect(state.orderFailed).toBe(false);
    expect(state.order).toEqual(mockOrder);
    expect(state.orderModalOpen).toBe(true);
  });

  it('должен обрабатывать экшен createOrderFailed', () => {
    let state = orderReducer(initialState, createOrderRequest());
    expect(state.orderRequest).toBe(true);

    state = orderReducer(state, createOrderFailed());

    expect(state.orderRequest).toBe(false);
    expect(state.orderFailed).toBe(true);
    expect(state.order).toBeNull();
  });

  it('должен обрабатывать экшен closeOrderModal', () => {
    let state = orderReducer(initialState, createOrderRequest());
    state = orderReducer(state, createOrderSuccess(mockOrder));
    expect(state.orderModalOpen).toBe(true);

    state = orderReducer(state, closeOrderModal());

    expect(state.orderModalOpen).toBe(false);
    expect(state.order).toBeNull();
  });
});
