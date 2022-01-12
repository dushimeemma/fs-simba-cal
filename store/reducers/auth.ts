import { types } from '../actions/types';
import { AuthState } from '../types';

const initialState: AuthState = {
  isLoading: false,
  isAuth: false,
  token: '',
  user: {
    username: '',
    email: '',
  },
  message: '',
};

const Signup = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case types.AUTH_SUCCESS:
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        token: action.payload.token,
        user: action.payload.data,
        isAuth: true,
        isLoading: false,
      };
    case types.IS_LOADING_AUTH:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_ERRORS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default Signup;
