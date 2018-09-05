export enum Role {
  User = 0,
  Elevated = 512,
  Administrator = 1024
}

export class User {
  public id: string;
  public userName: string;
  public name: string;
  public role: Role;

  constructor(base?: User) {
    if (base) {
      this.id = base.id;
      this.userName = base.userName;
      this.name = base.name;
      this.role = base.role;
    }
  }

}