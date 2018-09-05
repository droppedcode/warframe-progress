export class NavigationState {
  constructor(address: string = null) {
    this.address = address;
  }

  private _address: string;
  get address(): string { return this._address; }
  set address(value: string) {
    if (this._address === value) return;

    let screen = this._screen;
    let page = this._page;

    this._address = value;

    if (value) {
      let index = value.indexOf(':')
      if (index > -1) {
        this._screen = value.substr(0, index);
        this._page = value.substr(index + 1);
      } else {
        this._screen = value;
      }
    }
  }

  private _screen: string;
  get screen(): string { return this._screen; }
  private _page: string;
  get page(): string { return this._page; }

  session: string;

  history: string[] = [];

  private _loading: number = 0;
  get isLoading(): boolean { return this._loading > 0; }
  set isLoading(value: boolean) { value ? this._loading++ : this._loading--; }

}