import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AppContext } from '../../app.context';

@Component({
  selector: 'wfp-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fill scrollable'
  }
})
export class InformationComponent implements OnInit {

  constructor(private context: AppContext, private change: ChangeDetectorRef) { }

  ngOnInit() {
  }

}
