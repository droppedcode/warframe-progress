import * as fs from 'fs';
import * as Database from 'better-sqlite3';
import { User, Role } from './user';
import * as uuid from 'uuid/v4';
import * as sha256 from 'sha256';

import * as path from 'path';
import { ItemType } from '../data/ItemType';
import { IUserItem } from '../data/userItem';

export class ServerContext {
  private statementAddVersion;
  private statementGetVersion;

  private statementAddUser;
  private statementUpdUserRole;
  private statementGetUser;
  private statementGetUserByUserName;
  private statementGetUserByKey;
  private statementSetPassword;
  private statementSearch;

  private statementAddSession;
  private statementGetSession;

  private statementAddItem;
  private statementAddProgress;
  private statementSetProgress;
  private statementSetNote;
  private statementGetItem;
  private statementGetItemByName;
  private statementGetItemById;
  private statementGetUserItem;
  private statementGetUserItems;
  private statementSetDescription;
  private statementSetLocation;
  private statementSetMaxProgress;
  private statementSetItemVersion;
  private statementGetItems;

  constructor() {
    let create = !fs.existsSync(path.resolve(__dirname, 'data', 'data.db'));
    let db = new Database(path.resolve(__dirname, 'data', 'data.db'));

    if (create) {
      console.log('Create database.')

      db.prepare('CREATE TABLE IF NOT EXISTS Version (id INTEGER PRIMARY KEY);').run();
      this.statementAddVersion = db.prepare('INSERT INTO Version VALUES(?)')
      this.statementAddVersion.run(0);
      db.prepare('CREATE TABLE IF NOT EXISTS User (id TEXT PRIMARY KEY, userName TEXT UNIQUE NOT NULL collate nocase, name TEXT, role INTEGER, password TEXT, key TEXT UNIQUE);').run();
      this.statementAddUser = db.prepare('INSERT INTO User VALUES(?, ?, ?, ?, ?, ?)')
      db.prepare('CREATE TABLE IF NOT EXISTS Session (id TEXT PRIMARY KEY, userId TEXT, validity INTEGER, FOREIGN KEY(userId) REFERENCES User(id));').run();

      db.prepare('CREATE TABLE IF NOT EXISTS Item (id TEXT PRIMARY KEY, name TEXT, type INTEGER, ownerItemId TEXT, description TEXT, FOREIGN KEY(ownerItemId) REFERENCES Item(id));').run();
      db.prepare('CREATE TABLE IF NOT EXISTS Progress (userId TEXT, itemId TEXT, progress INTEGER, note TEXT, PRIMARY KEY (userId, itemId), FOREIGN KEY(userId) REFERENCES User(id), FOREIGN KEY(itemId) REFERENCES Item(id));').run();

      this.statementAddUser.run(uuid(), 'B', 'Balázs', Role.Administrator, sha256(''), null);
      this.statementAddUser.run(uuid(), 'J', 'Judit', Role.User, sha256(''), null);
    }
    else {
      this.statementAddVersion = db.prepare('INSERT INTO Version VALUES(?)')
      this.statementAddUser = db.prepare('INSERT INTO User VALUES(?, ?, ?, ?, ?, ?)');
    }

    this.statementGetVersion = db.prepare('SELECT max(id) as id FROM Version;');

    if (this.version < 1) {
      db.prepare('ALTER TABLE Item ADD COLUMN location TEXT;').run();

      this.statementAddVersion.run(1);
    }  

    if (this.version < 2) {
      db.prepare('ALTER TABLE Item ADD COLUMN maxProgress INTEGER;').run();
      db.prepare('ALTER TABLE Item ADD COLUMN version INTEGER;').run();

      db.prepare('UPDATE Item SET maxProgress = 2 WHERE ownerItemId is NULL').run();
      db.prepare('UPDATE Item SET maxProgress = 1 WHERE ownerItemId is NOT NULL').run();
      db.prepare('UPDATE Item SET version = 0').run();

      this.statementAddVersion.run(2);
    }  

    this.statementGetUser = db.prepare('SELECT * FROM User where id = ?;');
    this.statementGetUserByUserName = db.prepare('SELECT * FROM User where userName = ?;');
    this.statementGetUserByKey = db.prepare('SELECT * FROM User where key = ?;');
    this.statementUpdUserRole = db.prepare('UPDATE User SET role = ? WHERE id = ?');

    this.statementAddSession = db.prepare('INSERT INTO Session VALUES(?, ?, ?)');
    this.statementGetSession = db.prepare('SELECT * FROM Session WHERE id = ?');

    this.statementSetPassword = db.prepare('UPDATE User SET password = ? WHERE id = ?');
    this.statementSearch = db.prepare('SELECT * FROM User WHERE name LIKE ?');

    this.statementAddItem = db.prepare('INSERT INTO Item VALUES(?, ?, ?, ?, ?, ?, ?, ?)');
    this.statementAddProgress = db.prepare('INSERT INTO Progress VALUES(?, ?, ?, ?)');
    this.statementSetProgress = db.prepare('UPDATE Progress SET progress = ? WHERE userId = ? AND itemId = ?');
    this.statementSetNote = db.prepare('UPDATE Progress SET note = ? WHERE userId = ? AND itemId = ?');
    this.statementSetDescription = db.prepare('UPDATE Item SET description = ? WHERE id = ?');
    this.statementSetLocation = db.prepare('UPDATE Item SET location = ? WHERE id = ?');
    this.statementSetMaxProgress = db.prepare('UPDATE Item SET maxProgress = ? WHERE id = ?');
    this.statementSetItemVersion = db.prepare('UPDATE Item SET version = ? WHERE id = ?');

    this.statementGetItem = db.prepare('SELECT * FROM Item WHERE name = ? collate nocase AND Type = ?');
    this.statementGetItemByName = db.prepare('SELECT * FROM Item WHERE name = ? collate nocase');
    this.statementGetItemById = db.prepare('SELECT * FROM Item WHERE id = ?');
    this.statementGetUserItem = db.prepare('SELECT i.id, i.name, i.type, i.ownerItemId, i.description, i.location, i.maxProgress, i.version, p.progress, p.note FROM Item i INNER JOIN Progress p ON i.id = p.itemId AND p.userId = ? where i.id = ?');
    this.statementGetUserItems = db.prepare('SELECT i.id, i.name, i.type, i.ownerItemId, i.description, i.location, i.maxProgress, i.version, p.progress, p.note FROM Item i LEFT JOIN Progress p ON i.id = p.itemId AND p.userId = ?');
    this.statementGetItems = db.prepare('SELECT * FROM Item');
  }

  get version(): number {
    return this.statementGetVersion.get().id;
  }

  public getUser(id: string): User {
    let row = this.statementGetUser.get(id);
    return row ? new User(row) : null;
  }

  public getUserByUserName(id: string): User {
    let row = this.statementGetUserByUserName.get(id);
    return row ? new User(row) : null;
  }

  public getLogin(session: string): User {
    let sessionRow = this.statementGetSession.get(session);
    if (sessionRow && sessionRow.validity >= Date.now()) {
      return this.getUser(sessionRow.userId);
    }
    return null;
  }

  public login(userName: string, pass: string): string {
    let row = this.statementGetUserByUserName.get(userName);
    if (row && row.password === sha256(pass)) {
      let session = uuid();
      this.statementAddSession.run(session, row.id, Date.now() + 5 * 3600 * 1000);
      return session;
    }
    return null;
  }

  public loginWithKey(key: string): string {
    let row = this.statementGetUserByKey.get(key);
    if (row) {
      let session = uuid();
      this.statementAddSession.run(session, row.id, Date.now() + 5 * 3600 * 1000);
      return session;
    }
    return null;
  }

  public addUser(userName: string, name: string, pass: string, role: Role) {
    this.statementAddUser.run(uuid(), userName, name, role, sha256(pass));
  }

  public updateUserRole(id: string, role: Role) {
    this.statementUpdUserRole.run(role, id);
  }

  public setPassword(id: string, pass: string) {
    this.statementSetPassword.run(sha256(pass), id);
  }

  public search(name: string) {
    return this.statementSearch.all('%' + name + '%').map(m => {
      return {
        id: m.id,
        name: m.name
      };
    });
  }

  public addItem(name: string, type: ItemType, ownerItemId: string, description: string, location: string, maxProgress: number, version: number): string {
    console.log('Add item: ' + name + ' (' + ItemType[type] + ')');

    let id = uuid();
    this.statementAddItem.run(id, name, type, ownerItemId, description, location, maxProgress, version);
    return id;
  }

  public addProgress(userId: string, itemId: string, progress: number, note: string) {
    this.statementAddProgress.run(userId, itemId, progress, note);
  }

  public setProgress(userId: string, itemId: string, progress: number) {
    if (this.getUser(userId) == null) throw 'User does not exist';
    if (this.getItemById(itemId) == null) throw 'Item does not exist';

    if (this.getUserItem(userId, itemId)) {
      this.statementSetProgress.run(progress, userId, itemId);
    } else {
      this.addProgress(userId, itemId, progress, null);
    }
  }

  public setNote(userId: string, itemId: string, value: string) {
    if (this.getUser(userId) == null) throw 'User does not exist';
    if (this.getItemById(itemId) == null) throw 'Item does not exist';

    if (this.getUserItem(userId, itemId)) {
      this.statementSetNote.run(value, userId, itemId);
    } else {
      this.addProgress(userId, itemId, null, value);
    }
  }

  public getItem(name: string, type: ItemType): IUserItem {
    return this.statementGetItem.get(name, type);
  }

  public getItemByName(name: string): IUserItem {
    return this.statementGetItemByName.get(name);
  }

  public getItemById(id: string): IUserItem {
    return this.statementGetItemById.get(id);
  }

  public getUserItem(userId: string, itemId: string): IUserItem[] {
    return this.statementGetUserItem.get(userId, itemId);
  }

  public getUserItems(userId: string): IUserItem[] {
    return this.statementGetUserItems.all(userId);
  }

  public setDescription(itemId: string, value: string) {
    this.statementSetDescription.run(value, itemId);
  }

  public setLocation(itemId: string, value: string) {
    this.statementSetLocation.run(value, itemId);
  }

  public setMaxProgress(itemId: string, value: number) {
    this.statementSetMaxProgress.run(value, itemId);
  }

  public setItemVersion(itemId: string, value: number) {
    this.statementSetItemVersion.run(value, itemId);
  }

  public getItems(): IUserItem[] {
    return this.statementGetItems.all();
  }

}