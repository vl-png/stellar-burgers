import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';
import { v4 as uuidv4 } from 'uuid';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  totalPrice: number;
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
  totalPrice: 0
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      prepare: (ingredient: TIngredient) => {
        if (ingredient.type === 'bun') {
          return { payload: ingredient };
        }
        return {
          payload: {
            ...ingredient,
            id: uuidv4()
          }
        };
      },
      reducer: (
        state,
        action: PayloadAction<TIngredient | TConstructorIngredient>
      ) => {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.bun = ingredient as TIngredient;
        } else {
          state.ingredients.push(ingredient as TConstructorIngredient);
        }
        state.totalPrice = calculateTotalPrice(state.bun, state.ingredients);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
      state.totalPrice = calculateTotalPrice(state.bun, state.ingredients);
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const dragItem = state.ingredients[dragIndex];
      const newIngredients = [...state.ingredients];
      newIngredients.splice(dragIndex, 1);
      newIngredients.splice(hoverIndex, 0, dragItem);
      state.ingredients = newIngredients;
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
      state.totalPrice = 0;
    }
  }
});

const calculateTotalPrice = (
  bun: TIngredient | null,
  ingredients: TConstructorIngredient[]
): number => {
  const bunPrice = bun ? bun.price * 2 : 0;
  const ingredientsPrice = ingredients.reduce(
    (sum, ingredient) => sum + ingredient.price,
    0
  );
  return bunPrice + ingredientsPrice;
};

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
