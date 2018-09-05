import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AppContext } from '../../../app.context';

@Component({
  selector: 'wfp-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fill'
  }
})
export class SearchComponent implements OnInit {
  public name: string;
  public list

  constructor(private context: AppContext, private change: ChangeDetectorRef) { }

  ngOnInit() {
  }

  search(value: string) {
    if (value && value.length > 2) {
      this.context.service.search(value).toPromise().then(l => {
        this.list = l;
        this.change.markForCheck();
      });
    } else {
      this.list = [];
      this.change.markForCheck();
    }
  }

  select(id: string) {
    this.context.selectUser = id;
    this.context.navigation.go('connected:user');
  }
}
