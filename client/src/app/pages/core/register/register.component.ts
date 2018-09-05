import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AppContext } from '../../../app.context';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'wfp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  public id: string;
  public name: string;
  public pass: string;

  constructor(private context: AppContext, private change: ChangeDetectorRef, private dialog: MatDialogRef<RegisterComponent>) { }

  ngOnInit() {
  }

  register() {
    this.context.navigation.loading(true);
    this.context.service.addUser({
        id: this.id,
        name: this.name
      },
      this.pass
    ).toPromise().then(() => {
      this.context.navigation.loading(false);
      this.context.alert('User added');
      this.dialog.close(true);
    }).catch(err => {
      this.context.navigation.loading(false);
      this.context.alert(err.message || err);
    });
    this.id = '';
    this.name = '';
    this.pass = '';
    this.change.markForCheck();
  }

}
