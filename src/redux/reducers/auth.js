import { createReducer } from '@reduxjs/toolkit';
import { LOGIN_SUCCESS, LOGOUT } from '../types';
import secureLocalStorage from 'react-secure-storage';

const isLoggedIn = secureLocalStorage.getItem('isLoggedIn') ? true : false;

const initialState = {
  isLoggedIn,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(LOGIN_SUCCESS, (state) => {
      state.isLoggedIn = true;
    })
    .addCase(LOGOUT, (state) => {
      state.isLoggedIn = false;
    });
});

export default authReducer;
