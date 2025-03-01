import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '../../utils/types';
import { AppDispatch } from '../store';
import {
  orderBurgerApi,
  getOrderByNumberApi,
  getFeedsApi,
  getOrdersApi
} from '../../utils/burger-api';
import { resetConstructor } from './constructor';

type TOrderState = {
  order: TOrder | null;
  orderRequest: boolean;
  orderFailed: boolean;
  orderModalOpen: boolean;

  feeds: TOrdersData | null;
  feedsRequest: boolean;
  feedsFailed: boolean;

  userOrders: TOrder[];
  userOrdersRequest: boolean;
  userOrdersFailed: boolean;

  currentOrder: TOrder | null;
  currentOrderRequest: boolean;
  currentOrderFailed: boolean;
};

const initialState: TOrderState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
  orderModalOpen: false,

  feeds: null,
  feedsRequest: false,
  feedsFailed: false,

  userOrders: [],
  userOrdersRequest: false,
  userOrdersFailed: false,

  currentOrder: null,
  currentOrderRequest: false,
  currentOrderFailed: false
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrderRequest: (state) => {
      state.orderRequest = true;
      state.orderFailed = false;
    },
    createOrderSuccess: (state, action: PayloadAction<TOrder>) => {
      state.order = action.payload;
      state.orderRequest = false;
      state.orderModalOpen = true;
    },
    createOrderFailed: (state) => {
      state.orderRequest = false;
      state.orderFailed = true;
    },
    closeOrderModal: (state) => {
      state.orderModalOpen = false;
      state.order = null;
      state.orderRequest = false;
    },

    getFeedsRequest: (state) => {
      state.feedsRequest = true;
      state.feedsFailed = false;
    },
    getFeedsSuccess: (state, action: PayloadAction<TOrdersData>) => {
      state.feeds = action.payload;
      state.feedsRequest = false;
    },
    getFeedsFailed: (state) => {
      state.feedsRequest = false;
      state.feedsFailed = true;
    },

    getUserOrdersRequest: (state) => {
      state.userOrdersRequest = true;
      state.userOrdersFailed = false;
    },
    getUserOrdersSuccess: (state, action: PayloadAction<TOrder[]>) => {
      state.userOrders = action.payload;
      state.userOrdersRequest = false;
    },
    getUserOrdersFailed: (state) => {
      state.userOrdersRequest = false;
      state.userOrdersFailed = true;
    },

    getOrderRequest: (state) => {
      state.currentOrderRequest = true;
      state.currentOrderFailed = false;
    },
    getOrderSuccess: (state, action: PayloadAction<TOrder>) => {
      state.currentOrder = action.payload;
      state.currentOrderRequest = false;
    },
    getOrderFailed: (state) => {
      state.currentOrderRequest = false;
      state.currentOrderFailed = true;
    }
  }
});

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailed,
  closeOrderModal,

  getFeedsRequest,
  getFeedsSuccess,
  getFeedsFailed,

  getUserOrdersRequest,
  getUserOrdersSuccess,
  getUserOrdersFailed,

  getOrderRequest,
  getOrderSuccess,
  getOrderFailed
} = orderSlice.actions;

export const createOrderThunk =
  (ingredientIds: string[]) => (dispatch: AppDispatch) => {
    dispatch(createOrderRequest());
    orderBurgerApi(ingredientIds)
      .then((data) => {
        dispatch(createOrderSuccess(data.order));
        dispatch(resetConstructor());
      })
      .catch(() => {
        dispatch(createOrderFailed());
      });
  };

export const getFeedsThunk = () => (dispatch: AppDispatch) => {
  dispatch(getFeedsRequest());
  getFeedsApi()
    .then((data) => {
      dispatch(getFeedsSuccess(data));
    })
    .catch(() => {
      dispatch(getFeedsFailed());
    });
};

export const getUserOrdersThunk = () => (dispatch: AppDispatch) => {
  dispatch(getUserOrdersRequest());
  getOrdersApi()
    .then((orders) => {
      dispatch(getUserOrdersSuccess(orders));
    })
    .catch(() => {
      dispatch(getUserOrdersFailed());
    });
};

export const getOrderThunk = (number: number) => (dispatch: AppDispatch) => {
  dispatch(getOrderRequest());
  getOrderByNumberApi(number)
    .then((data) => {
      if (data.orders.length > 0) {
        dispatch(getOrderSuccess(data.orders[0]));
      } else {
        dispatch(getOrderFailed());
      }
    })
    .catch(() => {
      dispatch(getOrderFailed());
    });
};

export default orderSlice.reducer;
