import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ReplaySubject, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly baseUrl = 'http://localhost:5230/api/';
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  private readonly http = inject(HttpClient);

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model)
      .pipe(
        map((response) => {
          const user = response;
          if (user) {
            localStorage.setItem('user', JSON.stringify(user))
            this.currentUserSource.next(user);
          }
        })
      )
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model)
      .pipe(
        map((user: User) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
          }
        }),
      );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
