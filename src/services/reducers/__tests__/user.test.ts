import userReducer, {
  registerRequest,
  registerSuccess,
  registerFailed,
  loginRequest,
  loginSuccess,
  loginFailed,
  logoutRequest,
  logoutSuccess,
  logoutFailed,
  userSlice
} from '../user';
import { mockUser } from './mockData';

describe('user reducer', () => {
  const initialState = userSlice.getInitialState();

  it('должен возвращать начальное состояние', () => {
    expect(userReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('должен обрабатывать экшен registerRequest', () => {
    const state = userReducer(initialState, registerRequest());

    expect(state.registerRequest).toBe(true);
    expect(state.registerFailed).toBe(false);
    expect(state.user).toBeNull();
    expect(state.isLoggedIn).toBe(false);
  });

  it('должен обрабатывать экшен registerSuccess', () => {
    let state = userReducer(initialState, registerRequest());
    expect(state.registerRequest).toBe(true);

    state = userReducer(state, registerSuccess(mockUser));

    expect(state.registerRequest).toBe(false);
    expect(state.registerFailed).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isLoggedIn).toBe(true);
  });

  it('должен обрабатывать экшен registerFailed', () => {
    let state = userReducer(initialState, registerRequest());
    expect(state.registerRequest).toBe(true);

    state = userReducer(state, registerFailed());

    expect(state.registerRequest).toBe(false);
    expect(state.registerFailed).toBe(true);
    expect(state.user).toBeNull();
    expect(state.isLoggedIn).toBe(false);
  });

  it('должен обрабатывать экшен loginRequest', () => {
    const state = userReducer(initialState, loginRequest());

    expect(state.loginRequest).toBe(true);
    expect(state.loginFailed).toBe(false);
    expect(state.user).toBeNull();
    expect(state.isLoggedIn).toBe(false);
  });

  it('должен обрабатывать экшен loginSuccess', () => {
    let state = userReducer(initialState, loginRequest());
    expect(state.loginRequest).toBe(true);

    state = userReducer(state, loginSuccess(mockUser));

    expect(state.loginRequest).toBe(false);
    expect(state.loginFailed).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isLoggedIn).toBe(true);
  });

  it('должен обрабатывать экшен loginFailed', () => {
    let state = userReducer(initialState, loginRequest());
    expect(state.loginRequest).toBe(true);

    state = userReducer(state, loginFailed());

    expect(state.loginRequest).toBe(false);
    expect(state.loginFailed).toBe(true);
    expect(state.user).toBeNull();
    expect(state.isLoggedIn).toBe(false);
  });

  it('должен обрабатывать экшен logoutRequest', () => {
    let state = userReducer(initialState, loginSuccess(mockUser));
    expect(state.isLoggedIn).toBe(true);

    state = userReducer(state, logoutRequest());

    expect(state.logoutRequest).toBe(true);
    expect(state.logoutFailed).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isLoggedIn).toBe(true);
  });

  it('должен обрабатывать экшен logoutSuccess', () => {
    let state = userReducer(initialState, loginSuccess(mockUser));
    state = userReducer(state, logoutRequest());

    state = userReducer(state, logoutSuccess());

    expect(state.logoutRequest).toBe(false);
    expect(state.logoutFailed).toBe(false);
    expect(state.user).toBeNull();
    expect(state.isLoggedIn).toBe(false);
  });

  it('должен обрабатывать экшен logoutFailed', () => {
    let state = userReducer(initialState, loginSuccess(mockUser));
    state = userReducer(state, logoutRequest());

    state = userReducer(state, logoutFailed());

    expect(state.logoutRequest).toBe(false);
    expect(state.logoutFailed).toBe(true);
    expect(state.user).toEqual(mockUser);
    expect(state.isLoggedIn).toBe(true);
  });
});
