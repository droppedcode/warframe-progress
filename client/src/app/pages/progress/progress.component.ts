import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  AfterViewInit,
  ElementRef
} from "@angular/core";
import { AppContext } from "../../app.context";
import { IUserItem } from "../../../data/progress/userItem";
import { TextEditorComponent } from "../text-editor/text-editor.component";
import { select } from "@angular-redux/store";
import { LoginComponent } from "../core/login/login.component";
import { Observable } from "rxjs";
import { IItem } from "../../../data/progress/item";

const itemHeight = 40;

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

  @ViewChild("scroll")
  scrollElement: ElementRef;

  public virtualHeight: number;

  private items: IItem[];
  private filteredItems: IItem[];
  public visibleItems: IItem[];

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
    //if (value.length > 0 && value.length < 3) return;

    this._filterTimeout = setTimeout(() => {
      this._filterText = value;
      this._filterRegex = new RegExp(value, "i");
      this.filterItems();
    }, 50);
  }

  categoryAll = [];
  categoryDefault = ["Melee", "Primary", "Secondary", "Warframes"];

  private _filterCategory: string[] = this.categoryDefault;
  get filterCategory(): string[] {
    return this._filterCategory;
  }
  set filterCategory(value: string[]) {
    this._filterCategory = value;
    this.filterItems();
  }

  private _progress: string = "notfinished";
  get progress(): string {
    return this._progress;
  }
  set progress(value: string) {
    this._progress = value;
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
        this.context.service
          .getProgress()
          .toPromise()
          .then(progressItems => {
            this.items = items.data;

            for (let i = 0; i < this.items.length; i++) {
              let item = this.items[i];
              if (!item.name) {
                item.name = "";
              }
            }

            this.items = this.items.sort((item1, item2) =>
              item1.name.localeCompare(item2.name)
            );

            let relics = {};
            this.items.filter(f => f.category === 'Relics').forEach(r => relics[r.name] = r.drops && r.drops.length > 0);

            for (let i = 0; i < this.items.length; i++) {
              let item = items.data[i];
              item.sort = item.name;

              if (item.components) {
                let index = i + 1;

                let components = item.components.filter(c => {
                  if (
                    c.uniqueName.startsWith("/Lotus/Types/Items/MiscItems/") ||
                    c.uniqueName.startsWith("/Lotus/Types/Items/Research/")
                  ) {
                    return false;
                  }

                  return true;
                });

                if (
                  components.length === 1 &&
                  components[0].name === "Blueprint"
                ) {
                  //Don't add a blueprint only
                } else {
                  for (let j = 0; j < components.length; j++) {
                    let component = components[j];

                    this.items.splice(index, 0, component);

                    component.sort =
                      item.sort + "   $$$" + (component.name || "");

                    if (
                      component.uniqueName.startsWith("/Lotus/Types/Recipes/")
                    ) {
                      component.name = item.name + " " + component.name;
                    }

                    if (component.drops) {
                      let relicDrops = component.drops.filter(
                        f => f.type === "Relics"
                      );
                      let relicNames: string[] = [];
                      for (let k = 0; k < relicDrops.length; k++) {
                        let name = relicDrops[k].location;
                        let isVaulted = !relics[name];
                        name = name.substr(0, name.lastIndexOf(' ')) + ' ' + relicDrops[k].rarity;
                        if (isVaulted){
                          name += ' (V)';
                        }
                        if (relicNames.indexOf(name) === -1) {
                          relicNames.push(name);
                        }
                      }
                      if (relicNames.length > 0) {
                        component.location = relicNames.join(', ');
                      }
                    }

                    component.owner = item;
                    if (!item.children) {
                      item.children = [];
                    }
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
              let p = progress[item.uniqueName];
              if (p) {
                item.userItem = p;
              }
            }

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
    this.filterCount = 0;
    this.filteredItems = this.items.filter(item => this.filterItem(item));
    this.virtualScroll();
  }

  filterItem(item: IItem) {
    if (item.owner && !item.owner.isOpen) {
      return false;
    }

    if (this._progress !== "all") {
      let maxProgress = (<any>item).itemCount || 2;
      let progress = item.userItem ? item.userItem.progress || 0 : 0;

      if (this._progress == "noprogress" && progress > 0) {
        return false;
      } else if (
        this._progress == "inprogress" &&
        (progress >= maxProgress || progress === 0)
      ) {
        return false;
      } else if (this._progress == "notfinished" && progress >= maxProgress) {
        return false;
      } else if (this._progress == "finished" && progress < maxProgress) {
        return false;
      }
    }

    if (
      !item.owner &&
      this._filterCategory !== this.categoryAll &&
      this._filterCategory.indexOf(item.category) === -1
    ) {
      return false;
    }

    if (this._filterRegex) {
      if (item.name && this._filterRegex.test(item.name)) {
        return true;
      }
      // if (item.description && this._filterRegex.test(item.description)) {
      //   return true;
      // }
      if (
        item.userItem &&
        item.userItem.note &&
        this._filterRegex.test(item.userItem.note)
      ) {
        return true;
      }
    } else {
      return true;
    }

    return false;
  }

  setProgress(item: IItem, checked: boolean, value: number) {
    if (!item.userItem) {
      item.userItem = { itemId: item.uniqueName, progress: value };
    } else {
      item.userItem.progress = value;
    }
    this.context.service
      .setProgress(item.uniqueName, checked ? value : value - 1)
      .toPromise()
      .then(() => {
        if (checked && item.children) {
          for (let child of item.children) {
            let maxProgress = (<any>child).itemCount || 2;
            if (!child.userItem) {
              child.userItem = { itemId: item.uniqueName, progress: 0 };
            }

            if (child.userItem.progress != maxProgress) {
              child.userItem.progress = maxProgress;
              this.context.service
                .setProgress(child.uniqueName, maxProgress)
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

  editNote(item: IItem) {
    this.context.dialog
      .open(TextEditorComponent, {
        width: "50%",
        data: { title: "Note", text: item.userItem ? item.userItem.note : "" }
      })
      .afterClosed()
      .subscribe(res => {
        if (res !== false) {
          if (!item.userItem) {
            item.userItem = { itemId: item.uniqueName, progress: 0, note: res };
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

    this.virtualHeight = currentTop;
    this.change.markForCheck();
  }
}
