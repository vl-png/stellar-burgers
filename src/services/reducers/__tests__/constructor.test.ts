import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor,
  constructorSlice
} from '../constructor';
import { mockIngredients } from './mockData';

describe('constructor reducer', () => {
  const initialState = constructorSlice.getInitialState();

  const testBun = mockIngredients[0];
  const testIngredient = mockIngredients[1];

  it('должен возвращать начальное состояние', () => {
    expect(constructorReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('должен обрабатывать экшен addIngredient для булки', () => {
    const action = addIngredient(testBun);
    const state = constructorReducer(initialState, action);

    expect(state.bun).toEqual(testBun);
    expect(state.totalPrice).toBe(testBun.price * 2);
    expect(state.ingredients).toEqual([]);
  });

  it('должен обрабатывать экшен addIngredient для обычного ингредиента', () => {
    const action = addIngredient(testIngredient);
    const state = constructorReducer(initialState, action);

    expect(state.bun).toBeNull();
    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0].name).toBe(testIngredient.name);
    expect(state.ingredients[0].price).toBe(testIngredient.price);
    expect(state.ingredients[0]).toHaveProperty('id');
    expect(state.totalPrice).toBe(testIngredient.price);
  });

  it('должен обрабатывать экшен removeIngredient', () => {
    let state = constructorReducer(initialState, addIngredient(testIngredient));
    const ingredientId = state.ingredients[0].id;

    state = constructorReducer(state, removeIngredient(ingredientId));

    expect(state.ingredients).toEqual([]);
    expect(state.totalPrice).toBe(0);
  });

  it('должен обрабатывать экшен moveIngredient', () => {
    let state = constructorReducer(
      initialState,
      addIngredient(mockIngredients[1])
    );
    state = constructorReducer(state, addIngredient(mockIngredients[2]));

    const ingredient1 = state.ingredients[0];
    const ingredient2 = state.ingredients[1];

    state = constructorReducer(
      state,
      moveIngredient({ dragIndex: 0, hoverIndex: 1 })
    );

    expect(state.ingredients[0]).toEqual(ingredient2);
    expect(state.ingredients[1]).toEqual(ingredient1);

    expect(state.totalPrice).toBe(
      mockIngredients[1].price + mockIngredients[2].price
    );
  });

  it('должен обрабатывать экшен resetConstructor', () => {
    let state = constructorReducer(initialState, addIngredient(testBun));
    state = constructorReducer(state, addIngredient(testIngredient));

    expect(state.bun).not.toBeNull();
    expect(state.ingredients.length).toBe(1);
    expect(state.totalPrice).toBeGreaterThan(0);

    state = constructorReducer(state, resetConstructor());

    expect(state).toEqual(initialState);
  });
});
