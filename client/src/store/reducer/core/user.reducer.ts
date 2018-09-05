import lodash from 'lodash';
import { IUser } from '../../../data/core/user';
import { UserAction, UserActions } from '../../action/core/user.action';
import { UserState } from '../../state/core/user';

const _ = lodash || (<any>window)._;

export const INITIAL_STATE: UserState = new UserState();

export function userReducer(state: UserState = INITIAL_STATE, action: UserAction = null) {
  if (!action) return state;

  switch (action.type) {
    case UserActions.USER_SET:
      state = _.cloneDeep(state);
      state.user = action.user;
      break;
  }
  return state;
}