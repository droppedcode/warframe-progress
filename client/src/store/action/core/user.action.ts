import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './../../app.state';

import { Action } from 'redux';
import { IUser } from '../../../data/core/user';

export interface UserAction extends Action {
  user: IUser;
}

@Injectable()
export class UserActions {
  static USER_SET = "USER_SET";

  constructor(public store: NgRedux<IAppState>) { }

  set(user: IUser) {
    this.store.dispatch({ type: UserActions.USER_SET, user: user });
  }

}