import { Injectable } from '@angular/core';

import { NavigationActions } from './../store/action/core/navigation.action';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from './../store/app.state';

import { INITIAL_STATE, rootReducer } from './../store/root.reducer';

import lodash from 'lodash';
import { Service } from '../services/core/service';
import { IUser, Role } from '../data/core/user';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { UserActions } from '../store/action/core/user.action';

const _ = lodash || (<any>window)._;

@Injectable()
export class AppContext {
  private _isEnglish: boolean = false;
  public get isEnglish(): boolean {
    return this._isEnglish;
  }
  public set isEnglish(value: boolean) {
    this._isEnglish = value;

    try {
      localStorage.setItem('language', JSON.stringify(value));
    } catch (e) {

    }
  }

  public selectUser: string;

  constructor(public store: NgRedux<IAppState>, public navigation: NavigationActions, public user: UserActions, public service: Service, public snackBar: MatSnackBar, public dialog: MatDialog, public router: Router) {
    store.configureStore(rootReducer, _.cloneDeep(INITIAL_STATE));

    let session = this.getCookie('session');

    if (session) {
      this.service.relogin(session).toPromise().then(u => {
        this.user.set(u);
        navigation.go('connected');
      }).catch(() => {
        this.navigation.reload();
      });
    } else {
      navigation.go('connected');
    }

    try {
      this.isEnglish = JSON.parse(localStorage.getItem('language')) || false;
    } catch (e) {

    }

  }

  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  setCookie(cname, cvalue, exdays = 365) {
    if (cvalue === null) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    } else {
      document.cookie = cname + "=";      
    }
  }

  alert(message: string) {
    let snack = this.snackBar.open(message, 'Ok', {
      duration: 2000,
    });
    snack.onAction().subscribe(() => {
      snack.dismiss();
    });
  }

}