import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import {
  signupRequest,
  signupSuccess,
  signupError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
  noToken,
  // updateAvatarRequest,
  updateAvatarSuccess,
  // updateAvatarError,
} from './auth-actions';

const initialUserState = { name: null, email: null, age: null };

const user = createReducer(initialUserState, {
  [signupSuccess]: (_, { payload }) => payload.user,
  [loginSuccess]: (_, { payload }) => payload.user,
  [logoutSuccess]: () => initialUserState,
  [logoutError]: () => initialUserState,
  [getCurrentUserSuccess]: (_, { payload }) => payload.user,
});

const avatar = createReducer(null, {
  [signupSuccess]: (_, { payload }) => payload.user.avatar,
  [loginSuccess]: (_, { payload }) => payload.user.avatar,
  [getCurrentUserSuccess]: (_, { payload }) => payload.user.avatar,
  [updateAvatarSuccess]: (_, { payload }) => payload.avatarUrl,
});

const token = createReducer(null, {
  [loginSuccess]: (_, { payload }) => payload.token,
  [logoutSuccess]: () => null,
});

const isAuthorized = createReducer(false, {
  [loginSuccess]: () => true,
  [getCurrentUserSuccess]: () => true,

  [signupError]: () => false,
  [loginError]: () => false,
  [logoutRequest]: () => false,
  [getCurrentUserError]: () => false,
});

const isLoadingUser = createReducer(true, {
  [noToken]: () => false,

  [getCurrentUserSuccess]: () => false,
  [getCurrentUserError]: () => false,
  [getCurrentUserRequest]: () => true,
});

const isLoading = createReducer(false, {
  [signupRequest]: () => true,
  [signupSuccess]: () => false,
  [signupError]: () => false,

  [loginRequest]: () => true,
  [loginSuccess]: () => false,
  [loginError]: () => false,

  [logoutRequest]: () => true,
  [logoutSuccess]: () => false,
  [logoutError]: () => false,

  [getCurrentUserRequest]: () => true,
  [getCurrentUserSuccess]: () => false,
  [getCurrentUserError]: () => false,
});

const setError = (_, { payload }) => payload;

const error = createReducer(null, {
  [logoutError]: setError,
  [logoutRequest]: () => null,
  [getCurrentUserError]: setError,
  [getCurrentUserRequest]: () => null,
});

export default combineReducers({
  user,
  avatar,
  token,
  isAuthorized,
  isLoadingUser,
  isLoading,
  error,
});
