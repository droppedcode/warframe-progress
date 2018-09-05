import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { AppContext } from '../../../app.context';
import { IUser, Role } from '../../../../data/core/user';
import { MatSnackBar } from '@angular/material';
import { UserAction } from '../../../../services/core/service';

@Component({
  selector: 'wfp-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fill scrollable'
  }
})
export class UserComponent {

}
