import { combineReducers } from 'redux';

import authReducers from './Authentication'
import propertiesReducers from './Properties'

const reducers = combineReducers({
  authReducers,
  propertiesReducers
});

export default reducers;
