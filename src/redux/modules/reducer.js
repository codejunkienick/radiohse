import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import vote from './vote';
import mail from './mail';
import player from './player';

export default combineReducers({
  router: routerStateReducer,
  vote,
  mail
});
