import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients';
import constructorReducer from './constructor';
import orderReducer from './order';
import userReducer from './user';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;
