import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import { AppContext } from '../../app.context';
import { IUserItem } from '../../../data/progress/userItem';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { select } from '@angular-redux/store';
import { LoginComponent } from '../core/login/login.component';
import { Observable } from 'rxjs';
import { IItem } from '../../../data/progress/item';
import { forEach } from '@angular/router/src/utils/collection';

const itemHeight = 40;

@Component({
  selector: 'wfp-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fill scrollable'
  }
})
export class ProgressComponent implements OnInit, AfterViewInit {
  @select(['user', 'isElevated'])
  isElevated$: Observable<boolean>;
  isElevated: boolean;

  @ViewChild('scroll')
  scrollElement: ElementRef;

  public JSON = JSON;

  public virtualHeight: number;

  private items: IItem[];
  private filteredItems: IItem[];
  public visibleItems: IItem[];

  private _filterTimeout;
  private _filterText: string;
  private _filterMethod: (string) => boolean;
  get filterText(): string {
    return this._filterText;
  }
  set filterText(value: string) {
    this._filterText = value;
    this.updateFilter();
  }

  private updateFilter() {
    if (this._filterTimeout) {
      clearTimeout(this._filterTimeout);
    }

    this._filterTimeout = setTimeout(() => {
      if (this._filterText) {
        switch (this._filterTextType) {
          case 'text':
          case 'regex':
            let regexp = new RegExp(this._filterText, 'i');
            this._filterMethod = (s: string) => regexp.test(s);
            break;
          case 'logic':
            let parts = this._filterText.split(' ');
            let regexps = parts
              .filter(f => !!f)
              .map(
                m =>
                  new RegExp(
                    m[0] === '!' ? '^(?!.*' + m.substr(1) + ')' : m,
                    'i'
                  )
              );
            this._filterMethod = (s: string) => !regexps.find(f => !f.test(s));
            break;
        }
      } else {
        this._filterMethod = null;
      }

      this.filterItems();
    }, 50);
  }

  private _filterTextType: string = 'logic';
  get filterTextType(): string {
    return this._filterTextType;
  }
  set filterTextType(value: string) {
    this._filterTextType = value;
    this.updateFilter();
  }

  categoryDefault = ['Melee', 'Primary', 'Secondary', 'Warframes'];
  categories: string[] = [];

  private _filterCategory: string[] = [];
  get filterCategory(): string {
    return JSON.stringify(this._filterCategory);
  }
  set filterCategory(value: string) {
    this._filterCategory = JSON.parse(value);
    this.filterItems();
  }

  types: string[] = [];

  private _filterType: string[] = [];
  get filterType(): string {
    return JSON.stringify(this._filterType);
  }
  set filterType(value: string) {
    this._filterType = JSON.parse(value);
    this.filterItems();
  }

  private _filterProgress: string = 'notfinished';
  get filterProgress(): string {
    return this._filterProgress;
  }
  set filterProgress(value: string) {
    this._filterProgress = value;
    this.filterItems();
  }

  constructor(private context: AppContext, private change: ChangeDetectorRef) {
    this.isElevated$.subscribe(s => {
      this.isElevated = s;
      this.change.markForCheck();
    });
  }

  ngOnInit() {
    if (!this.context.store.getState().user.isLoggedIn) {
      this.context.router.navigateByUrl('/');
      this.context.alert('Please log in.');
      let dialog = this.context.dialog.open(LoginComponent);
      dialog.afterClosed().subscribe(value => {
        if (value) {
          this.context.router.navigateByUrl('/progress');
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

    if (typeof Storage !== 'undefined') {
      let stored = localStorage.getItem('progress-filter');
      if (stored) {
        let data = JSON.parse(stored);
        this._filterText = data.text;
        this._filterTextType = data.textType;
        this._filterCategory = data.category;
        this._filterType = data.type;
        this._filterProgress = data.progress;

        this.updateFilter();
      }
    }

    this.context.service
      .getItems()
      .toPromise()
      .then(items => {
        this.context.service
          .getProgress()
          .toPromise()
          .then(progressItems => {
            this.items = items.data;

            for (let i = 0; i < this.items.length; i++) {
              let item = this.items[i];
              if (!item.name) {
                item.name = '';
              }
              item.hierarchyName = item.uniqueName;
            }

            this.items = this.items.sort((item1, item2) =>
              item1.name.localeCompare(item2.name)
            );

            for (let i = 0; i < this.items.length; i++) {
              let item = items.data[i];
              item.sort = item.name;

              if (item.components) {
                let index = i + 1;

                let components = item.components.filter(c => {
                  if (
                    c.uniqueName.startsWith('/Lotus/Types/Items/MiscItems/') ||
                    c.uniqueName.startsWith('/Lotus/Types/Items/Research/')
                  ) {
                    return false;
                  }

                  return true;
                });

                if (
                  components.length === 1 &&
                  components[0].name === 'Blueprint'
                ) {
                  //Don't add a blueprint only
                } else {
                  for (let j = 0; j < components.length; j++) {
                    let component = components[j];

                    this.items.splice(index, 0, component);

                    component.sort =
                      item.sort + '   $$$' + (component.name || '');

                    if (
                      component.uniqueName.startsWith('/Lotus/Types/Recipes/')
                    ) {
                      component.name = item.name + ' ' + component.name;
                    }

                    component.owner = item;
                    if (!item.children) {
                      item.children = [];
                    }

                    component.hierarchyName =
                      item.hierarchyName + '.' + component.uniqueName;
                    item.children.push(component);

                    index++;
                  }
                }
              }
            }

            let progress = {};
            for (let i = 0; i < progressItems.length; i++) {
              let item = progressItems[i];
              progress[item.itemId] = item;
            }

            for (let i = 0; i < this.items.length; i++) {
              let item = this.items[i];
              let p = progress[item.hierarchyName];
              if (p) {
                item.userItem = p;
              }
            }

            for (const item of this.items) {
              if (
                item.category &&
                this.categories.indexOf(item.category) === -1
              ) {
                this.categories.push(item.category);
              }
              if (item.type && this.types.indexOf(item.type) === -1) {
                this.types.push(item.type);
              }
            }
            this.categories.sort();
            this.types.sort();

            this.filterItems();

            this.context.navigation.loading(false);
            this.change.markForCheck();
          })
          .catch(err => {
            this.context.alert(err.message || err);
            this.context.navigation.loading(false);
          });
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
    //Store filter arguments
    if (typeof Storage !== 'undefined') {
      localStorage.setItem(
        'progress-filter',
        JSON.stringify({
          text: this._filterText,
          textType: this._filterTextType,
          category: this._filterCategory,
          type: this._filterType,
          progress: this._filterProgress
        })
      );
    }

    this.filterCount = 0;
    if (this.items) {
      this.filteredItems = this.items.filter(
        item => (item.isVisible = this.filterItem(item))
      );
    }
    this.virtualScroll();
  }

  filterItem(item: IItem) {
    if (item.owner && (!item.owner.isOpen || !item.owner.isVisible)) {
      return false;
    }

    if (this._filterProgress !== 'all') {
      let maxProgress = (<any>item).itemCount || 2;
      let progress = item.userItem ? item.userItem.progress || 0 : 0;

      if (this._filterProgress == 'noprogress' && progress > 0) {
        return false;
      } else if (
        this._filterProgress == 'inprogress' &&
        (progress >= maxProgress || progress === 0)
      ) {
        return false;
      } else if (
        this._filterProgress == 'notfinished' &&
        progress >= maxProgress
      ) {
        return false;
      } else if (this._filterProgress == 'finished' && progress < maxProgress) {
        return false;
      }
    }

    if (
      !item.owner &&
      this._filterCategory.length !== 0 &&
      this._filterCategory.indexOf(item.category) === -1
    ) {
      return false;
    }

    if (
      !item.owner &&
      this._filterType.length !== 0 &&
      this._filterType.indexOf(item.type) === -1
    ) {
      return false;
    }

    if (item.owner && item.owner.isVisible) {
      return true;
    } else if (this._filterMethod) {
      if (item.name && this._filterMethod(item.name)) {
        return true;
      }
      // if (item.description && this._filterRegex.test(item.description)) {
      //   return true;
      // }
      if (
        item.userItem &&
        item.userItem.note &&
        this._filterMethod(item.userItem.note)
      ) {
        return true;
      }
    } else {
      return true;
    }

    return false;
  }

  setProgress(item: IItem, value: number) {
    if (item.userItem) {
      if (item.userItem.progress == value) {
        return;
      }

      item.userItem.progress = value;
    } else {
      item.userItem = { itemId: item.hierarchyName, progress: value };
    }

    this.context.service
      .setProgress(item.userItem.itemId, item.userItem.progress)
      .toPromise()
      .then(() => {
        if (
          item.userItem.progress == ((<any>item).itemCount || 2) &&
          item.children
        ) {
          for (let child of item.children) {
            this.setProgress(child, (<any>child).itemCount || 2);
          }
        }
      })
      .catch(err => {
        this.context.alert(err.message || err);
        this.init();
      });
  }

  editNote(item: IItem) {
    this.context.dialog
      .open(TextEditorComponent, {
        width: '50%',
        data: { title: 'Note', text: item.userItem ? item.userItem.note : '' }
      })
      .afterClosed()
      .subscribe(res => {
        if (res !== false) {
          if (!item.userItem) {
            item.userItem = {
              itemId: item.hierarchyName,
              progress: 0,
              note: res
            };
          } else {
            item.userItem.note = res;
          }

          this.context.service
            .setNote(item.userItem.itemId, res)
            .toPromise()
            .catch(err => {
              this.context.alert(err.message || err);
            });
          this.change.markForCheck();
        }
      });
  }

  // editDescription(item: IUserItem) {
  //   this.context.dialog
  //     .open(TextEditorComponent, {
  //       width: "50%",
  //       data: { title: "Description", text: item.description }
  //     })
  //     .afterClosed()
  //     .subscribe(res => {
  //       if (res !== false) {
  //         item.description = res;
  //         this.context.service
  //           .setDescription(item.id, res)
  //           .toPromise()
  //           .catch(err => {
  //             this.context.alert(err.message || err);
  //           });
  //         this.change.markForCheck();
  //       }
  //     });
  // }

  virtualScroll() {
    let top = (<HTMLElement>this.scrollElement.nativeElement).scrollTop;
    let bottom =
      top + (<HTMLElement>this.scrollElement.nativeElement).offsetHeight;

    this.visibleItems = [];

    let currentTop = 0;

    if (this.filteredItems) {
      for (let i = 0; i < this.filteredItems.length; i++) {
        if (bottom < currentTop || top > currentTop + itemHeight) {
          //Not visible
        } else {
          let item = this.filteredItems[i];
          item.top = currentTop;
          item.height = itemHeight;
          item.isEven = i % 2 === 0;
          this.visibleItems.push(item);
        }

        currentTop += itemHeight;
      }
    }

    this.virtualHeight = currentTop;
    this.change.markForCheck();
  }

  openAll() {
    for (let item of this.filteredItems) {
      item.isOpen = true;
    }
    this.filterItems();
  }

  closeAll() {
    for (let item of this.filteredItems) {
      item.isOpen = false;
    }
    this.filterItems();
  }

  // setChildItemProgress() {
  //   for (let item of this.items) {
  //     if (!item.owner && item.children && item.userItem && item.userItem.progress == 2) {
  //       for (let child of item.children) {
  //         this.setProgress(child, ((<any>item).itemCount || 2));
  //       }
  //     }
  //   }
  // }
}
