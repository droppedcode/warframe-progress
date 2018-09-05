import { Injectable } from '@angular/core';
import { IUser } from '../../data/core/user';
import { IUserItem } from '../../data/progress/userItem';
import { HttpClient } from '@angular/common/http';

export enum UserAction {
  role,
  pass
}

@Injectable()
export class Service {

  constructor(private http: HttpClient) { }

  login(id: string, pass: string) {
    return this.http.put<IUser>('api/login', { id: id, pass: pass });
  }

  relogin(id: string) {
    return this.http.put<IUser>('api/relogin', { id: id });
  }

  getUser(id: string) {
    return this.http.get<IUser>('api/users/' + id);
  }

  addUser(user: IUser, pass: string) {
    return this.http.post<string>('api/users', { user: user, pass: pass });
  }

  updateUser(id: string, action: UserAction, value: number | string) {
    return this.http.put<IUser>('api/users', {
      userId: id,
      action: UserAction[action],
      value: value
    });
  }

  search(value: string) {
    return this.http.get('api/users?search=' + encodeURIComponent(value));
  }

  getItems() {
    return this.http.get<IUserItem[]>('api/item');
  }

  setProgress(itemId: string, value: number) {
    return this.http.put('api/item/progress', { id: itemId, value: value });
  }

  setNote(itemId: string, value: string) {
    return this.http.put('api/item/note', { id: itemId, value: value });
  }

  setDescription(itemId: string, value: string) {
    return this.http.put('api/item/description', { id: itemId, value: value });
  }

}
