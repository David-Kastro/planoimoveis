import { combineReducers } from 'redux';

import authReducers from './Authentication'

const reducers = combineReducers({
  authReducers,
});

export default reducers;
