import { IUser, Role } from "../../../data/core/user";

export class UserState {
  user: IUser;

  get isAdministrator(): boolean {
    return this.user && this.user.role === Role.Administrator;
  }

  get isElevated(): boolean {
    return this.user && (this.user.role === Role.Administrator || this.user.role === Role.Elevated);
  }

  get isLoggedIn(): boolean {
    return !!this.user;
  }
}