import { combineReducers } from 'redux';

import auth from './auth';
import error from './errors';
import events from './events';

export default combineReducers({
  error,
  auth,
  events,
});
