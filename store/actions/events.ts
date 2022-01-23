import axios from 'axios';

import { getErrors, clearErrors } from './errors';
import { types } from './types';

export const setIsLoading = () => {
  return {
    type: types.START_GET_ALL_EVENT_TYPES,
  };
};

export const getAllEventTypes = () => async (dispatch: any) => {
  dispatch(setIsLoading());
  dispatch(clearErrors());
  try {
    const { data } = await axios.get('/api/events/types', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: types.GET_ALL_EVENT_TYPES,
      payload: data,
    });
  } catch (error: any) {
    getErrors(`${error ? error.response.data.error : 'Something went wrong'}`);
  }
};

export const getAllEventType = (id: number) => async (dispatch: any) => {
  dispatch(setIsLoading());
  dispatch(clearErrors());
  try {
    const { data } = await axios.get(`/api/events/types/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: types.GET_SINGLE_EVENT_TYPE,
      payload: data,
    });
  } catch (error: any) {
    getErrors(`${error ? error.response.data.error : 'Something went wrong'}`);
  }
};
