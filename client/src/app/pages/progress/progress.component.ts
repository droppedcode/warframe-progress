import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { AppContext } from "../../app.context";
import { IUserItem } from "../../../data/progress/userItem";
import { TextEditorComponent } from "../text-editor/text-editor.component";
import { select } from "@angular-redux/store";
import { LoginComponent } from "../core/login/login.component";
import { MatTableDataSource, MatSort } from "@angular/material";
import { Observable } from "rxjs";

@Component({
  selector: "wfp-progress",
  templateUrl: "./progress.component.html",
  styleUrls: ["./progress.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "fill scrollable"
  }
})
export class ProgressComponent implements OnInit, AfterViewInit {
  @select(["user", "isElevated"])
  isElevated$: Observable<boolean>;
  isElevated: boolean;

  private items: IUserItem[];
  dataSource: MatTableDataSource<IUserItem> = new MatTableDataSource([]);

  private _filterTimeout;
  private _filterText: string;
  private _filterRegex: RegExp;
  get filterText(): string {
    return this._filterText;
  }
  set filterText(value: string) {
    if (this._filterTimeout) {
      clearTimeout(this._filterTimeout);
    }
    if (value.length > 0 && value.length < 4) return;

    this._filterTimeout = setTimeout(() => {
      this._filterText = value;
      this._filterRegex = new RegExp(value, "i");
      this.filterItems();
    }, 250);
  }

  private _filterType: number = 4;
  get filterType(): number {
    return this._filterType;
  }
  set filterType(value: number) {
    this._filterType = value;
    this.filterItems();
  }

  private _progress: number = -1;
  get progress(): number {
    return this._progress;
  }
  set progress(value: number) {
    this._progress = value;
    this.filterItems();
  }

  displayedColumns = [
    "tree",
    "name",
    "type",
    "progress",
    "description",
    "note"
  ];

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private context: AppContext, private change: ChangeDetectorRef) {
    this.isElevated$.subscribe(s => {
      this.isElevated = s;
      this.change.markForCheck();
    });
  }

  ngOnInit() {
    if (!this.context.store.getState().user.isLoggedIn) {
      this.context.router.navigateByUrl("/");
      this.context.alert("Please log in.");
      let dialog = this.context.dialog.open(LoginComponent);
      dialog.afterClosed().subscribe(value => {
        if (value) {
          this.context.router.navigateByUrl("/progress");
          this.init();
        }
      });
    } else {
      this.init();
    }
  }

  private filterCount = 0;

  private init() {
    this.context.navigation.loading(true);
    this.context.service
      .getItems()
      .toPromise()
      .then(items => {
        let itemIds = items
          .filter(f => !!f.ownerItemId)
          .map(m => m.ownerItemId)
          .sort();
        itemIds = itemIds.filter((v, i, a) => i === 0 || v !== a[i - 1]);

        for (let item of items) {
          item.isOpen = false;
          item.hasChildren = this.binaryIndexOf(itemIds, item.id) > -1;
          if (item.ownerItemId) {
            item.owner = items.find(f => f.id == item.ownerItemId);
            if (!item.owner.children) {
              item.owner.children = [item];
            } else {
              item.owner.children.push(item);
            }
          }
        }

        items = items.sort((item1, item2) =>
          (item1.owner
            ? item1.owner.name + "   $$$" + item1.name
            : item1.name + "   $$$"
          ).localeCompare(
            item2.owner ? item2.owner.name + "   $$$" + item2.name : item2.name + "   $$$"
          )
        );

        this.items = items;

        this.dataSource = new MatTableDataSource(this.items);

        let defaultAccessor = this.dataSource.sortingDataAccessor;
        this.dataSource.sortingDataAccessor = (
          item: IUserItem,
          sort: string
        ) => {
          if (sort === "name") {
            return item.owner ? item.owner.name + "   $$$" + item.name : item.name + "   $$$";
          } else {
            return defaultAccessor(item, sort);
          }
        };
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate = (i, t) => this.filterByCount(i, t);

        this.filterItems();

        this.context.navigation.loading(false);
        this.change.markForCheck();
      })
      .catch(err => {
        this.context.alert(err.message || err);
        this.context.navigation.loading(false);
      });
  }

  ngAfterViewInit() {}

  binaryIndexOf(array: Array<any>, searchElement: any): number {
    let minIndex = 0;
    let maxIndex = array.length - 1;
    let currentIndex;
    let currentElement;

    while (minIndex <= maxIndex) {
      currentIndex = ((minIndex + maxIndex) / 2) | 0;
      currentElement = array[currentIndex];

      if (currentElement < searchElement) {
        minIndex = currentIndex + 1;
      } else if (currentElement > searchElement) {
        maxIndex = currentIndex - 1;
      } else {
        return currentIndex;
      }
    }

    return -1;
  }

  filterItems() {
    this.filterCount = 0;
    this.dataSource.filter = this.dataSource.filter === "1" ? "2" : "1";
  }

  filterByCount(item: IUserItem, text: string) {
    // if (this.filterCount > 100) {
    //   return false;
    // }

    var filter = this.filterItem(item, text);

    if (filter) {
      this.filterCount++;
    }

    return filter;
  }

  filterItem(item: IUserItem, text: string) {
    if (item.owner && !item.owner.isOpen) {
      return false;
    }

    if (this._progress !== -1 && (item.progress || 0) !== this._progress) {
      return false;
    }

    if (this._filterType !== -1 && item.type !== this._filterType) {
      return false;
    }

    if (this._filterRegex) {
      if (item.name && this._filterRegex.test(item.name)) {
        return true;
      }
      if (item.description && this._filterRegex.test(item.description)) {
        return true;
      }
      if (item.note && this._filterRegex.test(item.note)) {
        return true;
      }
    } else {
      return true;
    }

    return false;
  }

  setProgress(item: IUserItem, checked: boolean, value: number) {
    item.progress = value;
    this.context.service
      .setProgress(item.id, checked ? value : value - 1)
      .toPromise()
      .then(() => {
        if (checked && item.children) {
          for (let child of item.children) {
            if (child.progress != child.maxProgress) {
              child.progress = child.maxProgress;
              this.context.service
                .setProgress(child.id, value)
                .toPromise()
                .catch(err => {
                  this.context.alert(err.message || err);
                  this.init();
                });
            }
          }
        }
      })
      .catch(err => {
        this.context.alert(err.message || err);
        this.init();
      });
  }

  editNote(item: IUserItem) {
    this.context.dialog
      .open(TextEditorComponent, {
        width: "50%",
        data: { title: "Note", text: item.note }
      })
      .afterClosed()
      .subscribe(res => {
        if (res !== false) {
          item.note = res;
          this.context.service
            .setNote(item.id, res)
            .toPromise()
            .catch(err => {
              this.context.alert(err.message || err);
            });
          this.change.markForCheck();
        }
      });
  }

  editDescription(item: IUserItem) {
    this.context.dialog
      .open(TextEditorComponent, {
        width: "50%",
        data: { title: "Description", text: item.description }
      })
      .afterClosed()
      .subscribe(res => {
        if (res !== false) {
          item.description = res;
          this.context.service
            .setDescription(item.id, res)
            .toPromise()
            .catch(err => {
              this.context.alert(err.message || err);
            });
          this.change.markForCheck();
        }
      });
  }
}
