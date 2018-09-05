import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { AppContext } from '../../../app.context';
import { IUser } from '../../../../data/core/user';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'wfp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  public id: string;
  public pass: string;

  public user: IUser;

  constructor(private context: AppContext, private change: ChangeDetectorRef, private dialog: MatDialogRef<LoginComponent>) {

  }

  login() {
    this.context.navigation.loading(true);
    this.context.service.login(this.id, this.pass || '').toPromise().then(user => {
      this.context.navigation.loading(false);
      this.context.alert('Login successful');
      this.context.user.set(user);
      this.dialog.close(true);
    }).catch(err => {
      this.context.navigation.loading(false);
      this.context.alert('Login failed');
      this.context.user.set(null);
    });
  }

}
