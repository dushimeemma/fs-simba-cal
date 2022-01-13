import axios from 'axios';

import { types } from './types';
import { getErrors, clearErrors } from './errors';

export const setIsLoading = () => {
  return {
    type: types.IS_LOADING_AUTH,
  };
};

export const signup =
  ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) =>
  async (dispatch: any) => {
    dispatch(clearErrors());
    dispatch(setIsLoading());
    try {
      const { data } = await axios.post(
        '/api/auth/signup',
        { username, email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      localStorage.setItem('token', data.token);
      dispatch({
        type: types.AUTH_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch(clearErrors());
      dispatch(
        getErrors(
          `${error ? error.response.data.error : 'Something went wrong'}`
        )
      );
    }
  };

export const login =
  ({ email, password }: { email: string; password: string }) =>
  async (dispatch: any) => {
    dispatch(clearErrors());
    dispatch(setIsLoading());
    try {
      const { data } = await axios.post(
        '/api/auth/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      localStorage.setItem('token', data.token);
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch(clearErrors());
      dispatch(
        getErrors(
          `${error ? error.response.data.error : 'Something went wrong'}`
        )
      );
    }
  };
