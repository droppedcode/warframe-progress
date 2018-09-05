import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './../../app.state';

import { Action } from 'redux';

export interface NavigationAction extends Action {
  address: string;
  loading: boolean;
}

@Injectable()
export class NavigationActions {
  static NAVIGATION_SESSION = "NAVIGATION_SESSION";
  static NAVIGATION_GO = "NAVIGATION_GO";
  static NAVIGATION_BACK = "NAVIGATION_BACK";
  static NAVIGATION_LOADING = "NAVIGATION_LOADING";

  constructor(public store: NgRedux<IAppState>) { }

  session(session: string) {
    this.store.dispatch({ type: NavigationActions.NAVIGATION_SESSION, address: session });
  }

  /** Change address */
  go(address: string) {
    this.store.dispatch({ type: NavigationActions.NAVIGATION_GO, address: address });
  }

  /** Go back to the previous screen+page or until the address reached */
  back(address: string = null) {
    this.store.dispatch({ type: NavigationActions.NAVIGATION_BACK, address: address });
  }

  reload() {
    location.reload();
  }

  loading(value: boolean) {
    this.store.dispatch({ type: NavigationActions.NAVIGATION_LOADING, loading: value });
  }
}