import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/interface/users';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly uri = 'http://localhost:3004';

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser$: Observable<User>;

  constructor(private http: HttpClient) {
    let currentUser = null;
    console.log(JSON.parse(localStorage.getItem('currentUser')));
    if (localStorage.getItem('currentUser') != null) {
      currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    this.currentUserSubject = new BehaviorSubject<User>(currentUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject?.value;
  }

  doLogin(userName: string, password: string) {
    return this.http.get<User[]>(`${this.uri}/users`).pipe(
      map((users) => {
        let user = users.find(
          (x) => x.password == password && x.userName == userName
        );
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
