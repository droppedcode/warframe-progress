import * as fs from 'fs';
import * as Database from 'better-sqlite3';
import { User, Role } from './user';
import * as uuid from 'uuid/v4';
import * as sha256 from 'sha256';

import * as path from 'path';
import { IUserItem } from '../data/userItem';

const sessionTimeout = 30 * 24 * 60 * 60 * 60 * 1000;

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

      db.prepare('CREATE TABLE IF NOT EXISTS Progress (userId TEXT, itemId TEXT, progress INTEGER, note TEXT, PRIMARY KEY (userId, itemId), FOREIGN KEY(userId) REFERENCES User(id));').run();

      this.statementAddUser.run(uuid(), 'B', 'Balázs', Role.Administrator, sha256(''), null);
      this.statementAddUser.run(uuid(), 'J', 'Judit', Role.User, sha256(''), null);
      this.statementAddUser.run(uuid(), 'T', 'Tim', Role.User, sha256(''), null);
      this.statementAddUser.run(uuid(), 'G', 'Gergő', Role.User, sha256(''), null);
    }
    else {
      this.statementAddVersion = db.prepare('INSERT INTO Version VALUES(?)')
      this.statementAddUser = db.prepare('INSERT INTO User VALUES(?, ?, ?, ?, ?, ?)');
    }

    this.statementGetVersion = db.prepare('SELECT max(id) as id FROM Version;');

    //Version update

    this.statementGetUser = db.prepare('SELECT * FROM User where id = ?;');
    this.statementGetUserByUserName = db.prepare('SELECT * FROM User where userName = ?;');
    this.statementGetUserByKey = db.prepare('SELECT * FROM User where key = ?;');
    this.statementUpdUserRole = db.prepare('UPDATE User SET role = ? WHERE id = ?');

    this.statementAddSession = db.prepare('INSERT INTO Session VALUES(?, ?, ?)');
    this.statementGetSession = db.prepare('SELECT * FROM Session WHERE id = ?');

    this.statementSetPassword = db.prepare('UPDATE User SET password = ? WHERE id = ?');
    this.statementSearch = db.prepare('SELECT * FROM User WHERE name LIKE ?');

    this.statementAddProgress = db.prepare('INSERT INTO Progress VALUES(?, ?, ?, ?)');
    this.statementSetProgress = db.prepare('UPDATE Progress SET progress = ? WHERE userId = ? AND itemId = ?');
    this.statementSetNote = db.prepare('UPDATE Progress SET note = ? WHERE userId = ? AND itemId = ?');

    this.statementGetUserItem = db.prepare('SELECT * FROM Progress WHERE userId = ? AND itemId = ?');
    this.statementGetUserItems = db.prepare('SELECT * FROM Progress WHERE userId = ?');
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
      this.statementAddSession.run(session, row.id, Date.now() + sessionTimeout);
      return session;
    }
    return null;
  }

  public loginWithKey(key: string): string {
    let row = this.statementGetUserByKey.get(key);
    if (row) {
      let session = uuid();
      this.statementAddSession.run(session, row.id, Date.now() + sessionTimeout);
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

  public addProgress(userId: string, itemId: string, progress: number, note: string) {
    this.statementAddProgress.run(userId, itemId, progress, note);
  }

  public setProgress(userId: string, itemId: string, progress: number) {
    if (this.getUser(userId) == null) throw 'User does not exist';

    if (this.getUserItem(userId, itemId)) {
      this.statementSetProgress.run(progress, userId, itemId);
    } else {
      this.addProgress(userId, itemId, progress, null);
    }
  }

  public setNote(userId: string, itemId: string, value: string) {
    if (this.getUser(userId) == null) throw 'User does not exist';

    if (this.getUserItem(userId, itemId)) {
      this.statementSetNote.run(value, userId, itemId);
    } else {
      this.addProgress(userId, itemId, null, value);
    }
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

}