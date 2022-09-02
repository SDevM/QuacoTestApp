import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericSubscribe } from '../interfaces/default';
import { JSONResponse } from '../interfaces/json.interface';
import { Title } from '../interfaces/titles.interface';
import { User } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _user: User;

  public get user(): User {
    return this._user;
  }

  constructor(private http: HttpClient) {}

  /**
   * Http request for creating a new user login
   * @param user New user information
   * @returns Observable
   */
  signUp(user: User) {
    let obs = new Observable<User>((observer) => {
      this.http
        .post<JSONResponse<User>>(environment.apiUrl + '/users', user, {
          observe: 'response',
        })
        .subscribe(GenericSubscribe(observer));
    });
    return obs;
  }

  /**
   * Http request for updating a user
   * @param user Updated user information
   * @returns Observable
   */
  updateUser(user: Partial<User>) {
    let obs = new Observable<User>((observer) => {
      this.http
        .patch<JSONResponse<User>>(environment.apiUrl + '/users', user, {
          observe: 'response',
        })
        .subscribe(GenericSubscribe(observer));
    });
    return obs;
  }

  /**
   * Http request to delete the current account
   * @returns Observable
   */
  deleteUser() {
    let obs = new Observable<User>((observer) => {
      this.http
        .delete<JSONResponse<User>>(environment.apiUrl + '/users', {
          observe: 'response',
        })
        .subscribe(GenericSubscribe(observer));
    });
    return obs;
  }

  /**
   * Http request to sign into a user account
   * @param user Email and Password
   * @returns Observable
   */
  signIn(user: Partial<User>) {
    let obs = new Observable<User>((observer) => {
      this.http
        .post<JSONResponse<User>>(environment.apiUrl + '/users/login', user, {
          observe: 'response',
        })
        .subscribe(
          GenericSubscribe(observer, (data: User) => {
            this._user = data;
            console.log(this._user, data);
          })
        );
    });

    return obs;
  }

  /**
   * Http request to end the current login session
   * @returns Observable
   */
  signOut() {
    let obs = new Observable((observer) => {
      this.http
        .get<JSONResponse<undefined>>(environment.apiUrl + '/users/logout', {
          observe: 'response',
        })
        .subscribe(GenericSubscribe(observer));
    });

    return obs;
  }

  getTitles() {
    let obs = new Observable<Title[]>((observer) => {
      this.http
        .get<JSONResponse<Title[]>>(environment.apiUrl + '/titles', {
          observe: 'response',
        })
        .subscribe(GenericSubscribe(observer));
    });

    return obs;
  }
}
