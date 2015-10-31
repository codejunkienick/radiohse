import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import vote from './vote';

export default combineReducers({
  router: routerStateReducer,
  vote
});
