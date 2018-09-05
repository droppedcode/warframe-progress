import { Component, ChangeDetectorRef, ChangeDetectionStrategy, OnInit, ViewChild, ElementRef } from '@angular/core';

import { AppContext } from './app.context';

import { select } from '@angular-redux/store';
import { LoginComponent } from './pages/core/login/login.component';
import { RegisterComponent } from './pages/core/register/register.component';
import { IUser } from '../data/core/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'wfp-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fill',
    '[attr.screen]': 'screen',
    '[attr.page]': 'page',
    '[attr.information]': '!page'
  }
})
export class AppComponent implements OnInit {
  @select(['navigation', 'screen']) screen$: Observable<string>;
  screen: string;
  @select(['navigation', 'page']) page$: Observable<string>;
  page: string;
  @select(['navigation', 'isLoading']) isLoading$: Observable<boolean>;
  isLoading: boolean;

  @select(['user', 'user']) user$: Observable<IUser>;
  user: IUser;
  @select(['user', 'isAdministrator']) isAdministrator$: Observable<boolean>;
  isAdministrator: boolean;
  @select(['user', 'isElevated']) isElevated$: Observable<boolean>;
  isElevated: boolean;
  @select(['user', 'isLoggedIn']) isLoggedIn$: Observable<boolean>;
  isLoggedIn: boolean;

  constructor(public context: AppContext, private change: ChangeDetectorRef) {
    this.screen$.subscribe(s => {
      this.screen = s;
      this.change.markForCheck();
    });
    this.page$.subscribe(s => {
      this.page = s;
      this.change.markForCheck();
    });    
    this.isLoading$.subscribe(s => {
      this.isLoading = s;
      this.change.markForCheck();
    });
    this.user$.subscribe(s => {
      this.user = s;
      this.change.markForCheck();
    });    
    this.isAdministrator$.subscribe(s => {
      this.isAdministrator = s;
      this.change.markForCheck();
    });    
    this.isElevated$.subscribe(s => {
      this.isElevated = s;
      this.change.markForCheck();
    });    
    this.isLoggedIn$.subscribe(s => {
      this.isLoggedIn = s;
      this.change.markForCheck();
    });    
  }

  ngOnInit() {
  }

  login() {
    this.context.dialog.open(LoginComponent);
  }

  logout() {
    this.context.user.set(null);
    this.context.setCookie('session', null);
    this.context.navigation.reload();
  }

  register() {
    this.context.dialog.open(RegisterComponent);
  }
  
}