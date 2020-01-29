import { combineReducers } from 'redux';
import * as identityReducers from './identity';
import * as applicationReducers from './application';

export default combineReducers(Object.assign(
  identityReducers,
  applicationReducers
))
