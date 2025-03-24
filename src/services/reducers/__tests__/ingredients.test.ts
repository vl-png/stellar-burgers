import ingredientsReducer, {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
  setCurrentIngredient,
  ingredientsSlice
} from '../ingredients';
import { mockIngredients } from './mockData';

describe('ingredients reducer', () => {
  const initialState = ingredientsSlice.getInitialState();

  it('должен возвращать начальное состояние', () => {
    expect(ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('должен обрабатывать экшен getIngredientsRequest', () => {
    const state = ingredientsReducer(initialState, getIngredientsRequest());

    expect(state.ingredientsRequest).toBe(true);
    expect(state.ingredientsFailed).toBe(false);
    expect(state.ingredients).toEqual([]);
  });

  it('должен обрабатывать экшен getIngredientsSuccess', () => {
    let state = ingredientsReducer(initialState, getIngredientsRequest());
    expect(state.ingredientsRequest).toBe(true);

    state = ingredientsReducer(state, getIngredientsSuccess(mockIngredients));

    expect(state.ingredientsRequest).toBe(false);
    expect(state.ingredientsFailed).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  it('должен обрабатывать экшен getIngredientsFailed', () => {
    let state = ingredientsReducer(initialState, getIngredientsRequest());
    expect(state.ingredientsRequest).toBe(true);

    state = ingredientsReducer(state, getIngredientsFailed());

    expect(state.ingredientsRequest).toBe(false);
    expect(state.ingredientsFailed).toBe(true);
    expect(state.ingredients).toEqual([]);
  });

  it('должен обрабатывать экшен setCurrentIngredient', () => {
    let state = ingredientsReducer(
      initialState,
      setCurrentIngredient(mockIngredients[0])
    );

    expect(state.currentIngredient).toEqual(mockIngredients[0]);

    state = ingredientsReducer(state, setCurrentIngredient(null));

    expect(state.currentIngredient).toBeNull();
  });
});
