import { combineReducers } from 'redux';

import auth from './auth';
import error from './errors';

export default combineReducers({
  error,
  auth,
});
