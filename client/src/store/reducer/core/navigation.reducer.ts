import { NavigationAction, NavigationActions } from './../../action/core/navigation.action';
import { NavigationState } from './../../state/core/navigation';

import lodash from 'lodash';

const _ = lodash || (<any>window)._;

export const INITIAL_STATE: NavigationState = new NavigationState('connect');

export function navigationReducer(state: NavigationState = INITIAL_STATE, action: NavigationAction = null) {
  if (!action) return state;

  switch (action.type) {
    case NavigationActions.NAVIGATION_GO:
      state = _.cloneDeep(state);
      state.address = action.address;
      break;
    case NavigationActions.NAVIGATION_SESSION:
      state = _.cloneDeep(state);
      state.session = action.address;
      break;
    case NavigationActions.NAVIGATION_BACK:
      state = _.cloneDeep(state);
      do {
        state.address = state.history.pop();
      }
      while (action.address && state.address !== action.address && state.history.length > 0)
      if (action.address && state.address != action.address) {
        state.address = action.address;
      }
      break;
    case NavigationActions.NAVIGATION_LOADING:
      state = _.cloneDeep(state);
      state.isLoading = action.loading;
      break;
  }
  return state;
}