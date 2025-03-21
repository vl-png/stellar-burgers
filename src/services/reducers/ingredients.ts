import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { AppDispatch } from '../store';
import { getIngredientsApi } from '../../utils/burger-api';

type TIngredientsState = {
  ingredients: TIngredient[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  currentIngredient: TIngredient | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  currentIngredient: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getIngredientsRequest: (state) => {
      state.ingredientsRequest = true;
      state.ingredientsFailed = false;
    },
    getIngredientsSuccess: (state, action: PayloadAction<TIngredient[]>) => {
      state.ingredients = action.payload;
      state.ingredientsRequest = false;
    },
    getIngredientsFailed: (state) => {
      state.ingredientsRequest = false;
      state.ingredientsFailed = true;
    },
    setCurrentIngredient: (
      state,
      action: PayloadAction<TIngredient | null>
    ) => {
      state.currentIngredient = action.payload;
    }
  }
});

export const {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
  setCurrentIngredient
} = ingredientsSlice.actions;

export const getIngredientsThunk = () => (dispatch: AppDispatch) => {
  dispatch(getIngredientsRequest());
  getIngredientsApi()
    .then((ingredients) => {
      dispatch(getIngredientsSuccess(ingredients));
    })
    .catch(() => {
      dispatch(getIngredientsFailed());
    });
};

export default ingredientsSlice.reducer;
