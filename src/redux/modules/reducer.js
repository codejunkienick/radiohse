import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import vote from './vote';
import mail from './mail';

export default combineReducers({
  router: routerStateReducer,
  vote,
  mail
});
