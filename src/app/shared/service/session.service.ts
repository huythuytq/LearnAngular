import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/';

@Injectable()
export class SessionService {

  constructor() { }

  // private userSubject = new Subject<UserModel>();
  private avatarSubject = new Subject<string>();
  private countCartSubject = new Subject<any>();
  getToken(): String {
    return this.currentSession && `${this.currentSession.tokenType} ${this.currentSession.accessToken}`;
  }

  watchCart(): Observable<any> {
    return this.countCartSubject.asObservable();
  }

  getCountCart(): any {
    return window.localStorage['countCart'];
  }

  setCountCart(quantity) {
    window.localStorage['countCart'] = quantity;
    this.countCartSubject.next(quantity);
  }

  get currentUser() {

    if (!this.currentSession) { return null; }

    return {
      userId: this.currentSession.userId,
      employeeId: this.currentSession.objectId,
      userName: this.currentSession.userName,
    };
  }

  get currentSession() {
    if (!window.localStorage['session']) { return null; }

    return JSON.parse(window.localStorage['session']);
  }

  saveSession(session: String) {
    window.localStorage['session'] = JSON.stringify(session);
  }

  // saveUserInfo(userInfo: UserModel) {
  //   this.userSubject.next(userInfo);
  //   window.localStorage['userInfo'] = JSON.stringify(userInfo);
  // }

  saveAvatarContact(avatarString: string) {
    this.avatarSubject.next(avatarString);
    window.localStorage['avatarContact'] = avatarString;
  }

  saveNotificationList(notification: any) {
    window.localStorage['listsNotification'] = JSON.stringify(notification);
  }

  getAvatarContact(): Observable<string> {
    return this.avatarSubject.asObservable();
  }

  // getUserInfo(): Observable<UserModel> {
  //   return this.userSubject.asObservable();
  // }

  // get userInfo(): UserModel {
  //   if (!window.localStorage['userInfo']) { return new UserModel(); }

  //   return JSON.parse(window.localStorage['userInfo']);
  // }

  destroySession() {
    window.localStorage.clear();
  }

  set branchId(id: number) {
    window.localStorage['branchId'] = id;
  }

  get branchId(): number {
    return window.localStorage['branchId'];
  }
}
