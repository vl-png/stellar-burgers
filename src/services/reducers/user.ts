import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';
import { AppDispatch } from '../store';
import {
  registerUserApi,
  loginUserApi,
  logoutApi,
  getUserApi,
  updateUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  TRegisterData,
  TLoginData
} from '../../utils/burger-api';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';

type TUserState = {
  user: TUser | null;
  isLoggedIn: boolean;

  registerRequest: boolean;
  registerFailed: boolean;

  loginRequest: boolean;
  loginFailed: boolean;

  logoutRequest: boolean;
  logoutFailed: boolean;

  getUserRequest: boolean;
  getUserFailed: boolean;

  updateUserRequest: boolean;
  updateUserFailed: boolean;

  forgotPasswordRequest: boolean;
  forgotPasswordFailed: boolean;
  forgotPasswordSuccess: boolean;

  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
  resetPasswordSuccess: boolean;
};

const initialState: TUserState = {
  user: null,
  isLoggedIn: !!getCookie('accessToken'),

  registerRequest: false,
  registerFailed: false,

  loginRequest: false,
  loginFailed: false,

  logoutRequest: false,
  logoutFailed: false,

  getUserRequest: false,
  getUserFailed: false,

  updateUserRequest: false,
  updateUserFailed: false,

  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  forgotPasswordSuccess: false,

  resetPasswordRequest: false,
  resetPasswordFailed: false,
  resetPasswordSuccess: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerRequest: (state) => {
      state.registerRequest = true;
      state.registerFailed = false;
    },
    registerSuccess: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.registerRequest = false;
    },
    registerFailed: (state) => {
      state.registerRequest = false;
      state.registerFailed = true;
    },

    loginRequest: (state) => {
      state.loginRequest = true;
      state.loginFailed = false;
    },
    loginSuccess: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.loginRequest = false;
    },
    loginFailed: (state) => {
      state.loginRequest = false;
      state.loginFailed = true;
    },

    logoutRequest: (state) => {
      state.logoutRequest = true;
      state.logoutFailed = false;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.logoutRequest = false;
    },
    logoutFailed: (state) => {
      state.logoutRequest = false;
      state.logoutFailed = true;
    },

    getUserRequest: (state) => {
      state.getUserRequest = true;
      state.getUserFailed = false;
    },
    getUserSuccess: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.getUserRequest = false;
    },
    getUserFailed: (state) => {
      state.getUserRequest = false;
      state.getUserFailed = true;
    },

    updateUserRequest: (state) => {
      state.updateUserRequest = true;
      state.updateUserFailed = false;
    },
    updateUserSuccess: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.updateUserRequest = false;
    },
    updateUserFailed: (state) => {
      state.updateUserRequest = false;
      state.updateUserFailed = true;
    },

    forgotPasswordRequest: (state) => {
      state.forgotPasswordRequest = true;
      state.forgotPasswordFailed = false;
      state.forgotPasswordSuccess = false;
    },
    forgotPasswordSuccess: (state) => {
      state.forgotPasswordRequest = false;
      state.forgotPasswordSuccess = true;
    },
    forgotPasswordFailed: (state) => {
      state.forgotPasswordRequest = false;
      state.forgotPasswordFailed = true;
    },

    resetPasswordRequest: (state) => {
      state.resetPasswordRequest = true;
      state.resetPasswordFailed = false;
      state.resetPasswordSuccess = false;
    },
    resetPasswordSuccess: (state) => {
      state.resetPasswordRequest = false;
      state.resetPasswordSuccess = true;
    },
    resetPasswordFailed: (state) => {
      state.resetPasswordRequest = false;
      state.resetPasswordFailed = true;
    }
  }
});

export const {
  registerRequest,
  registerSuccess,
  registerFailed,

  loginRequest,
  loginSuccess,
  loginFailed,

  logoutRequest,
  logoutSuccess,
  logoutFailed,

  getUserRequest,
  getUserSuccess,
  getUserFailed,

  updateUserRequest,
  updateUserSuccess,
  updateUserFailed,

  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailed,

  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailed
} = userSlice.actions;

export const registerUserThunk =
  (data: TRegisterData) => (dispatch: AppDispatch) => {
    dispatch(registerRequest());
    registerUserApi(data)
      .then((res) => {
        localStorage.setItem('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken);
        dispatch(registerSuccess(res.user));
      })
      .catch(() => {
        dispatch(registerFailed());
      });
  };

export const loginUserThunk = (data: TLoginData) => (dispatch: AppDispatch) => {
  dispatch(loginRequest());
  loginUserApi(data)
    .then((res) => {
      localStorage.setItem('refreshToken', res.refreshToken);
      setCookie('accessToken', res.accessToken);
      dispatch(loginSuccess(res.user));
    })
    .catch(() => {
      dispatch(loginFailed());
    });
};

export const logoutUserThunk = () => (dispatch: AppDispatch) => {
  dispatch(logoutRequest());
  logoutApi()
    .then(() => {
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      dispatch(logoutSuccess());
    })
    .catch(() => {
      dispatch(logoutFailed());
    });
};

export const getUserThunk = () => (dispatch: AppDispatch) => {
  if (!getCookie('accessToken')) {
    return Promise.resolve();
  }

  dispatch(getUserRequest());
  return getUserApi()
    .then((res) => {
      dispatch(getUserSuccess(res.user));
    })
    .catch(() => {
      dispatch(getUserFailed());
    });
};

export const updateUserThunk =
  (data: Partial<TRegisterData>) => (dispatch: AppDispatch) => {
    dispatch(updateUserRequest());
    updateUserApi(data)
      .then((res) => {
        dispatch(updateUserSuccess(res.user));
      })
      .catch(() => {
        dispatch(updateUserFailed());
      });
  };

export const forgotPasswordThunk =
  (email: string) => (dispatch: AppDispatch) => {
    dispatch(forgotPasswordRequest());
    forgotPasswordApi({ email })
      .then(() => {
        dispatch(forgotPasswordSuccess());
      })
      .catch(() => {
        dispatch(forgotPasswordFailed());
      });
  };

export const resetPasswordThunk =
  (password: string, token: string) => (dispatch: AppDispatch) => {
    dispatch(resetPasswordRequest());
    resetPasswordApi({ password, token })
      .then(() => {
        dispatch(resetPasswordSuccess());
      })
      .catch(() => {
        dispatch(resetPasswordFailed());
      });
  };

export default userSlice.reducer;
