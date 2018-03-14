import { combineReducers } from 'redux';

import burgerBuild from './burgerBuild';
import order from './order';

const reducers = combineReducers({
  burgerBuild,
  order
});

export default reducers;
