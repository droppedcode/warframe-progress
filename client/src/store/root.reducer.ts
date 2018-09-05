import { combineReducers } from 'redux';
import { IAppState } from './app.state';

import { NavigationActions } from './action/core/navigation.action';
import { navigationReducer } from './reducer/core/navigation.reducer';
import { userReducer } from './reducer/core/user.reducer';

import lodash from 'lodash';

const _ = lodash || (<any>window)._;

console.log(lodash);

export const INITIAL_STATE: IAppState = {
  navigation: _.cloneDeep(navigationReducer()),
  user: _.cloneDeep(userReducer())
}

const combined = combineReducers<IAppState>({
  navigation: navigationReducer,
  user: userReducer  
});

export const rootReducer = (state: IAppState, action) => {
  return combined(state, action);
}