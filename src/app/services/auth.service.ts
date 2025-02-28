import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Subject, throwError } from 'rxjs';

import { User } from '../models/user.interface';

const API_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  isUserLoggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

  login(email: string, password: string) {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.get<User[]>(`${API_URL}users`, { params: params }).pipe(
      map((users) => {
        if (users.length > 0) {
          this.loggedInUser(users[0]);
          return users[0];
        }
        return null;
      }),
      catchError(this.handleError),
    );
  }

  loggedInUser(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.isUserLoggedIn.next(true);
  }

  isLoggedIn() {
    return sessionStorage.getItem('user') !== null;
  }

  logout() {
    sessionStorage.removeItem('user');
    this.isUserLoggedIn.next(false);
  }

  create(user: User) {
    return this.http
      .post<User>(`${API_URL}users`, user)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error,
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.'),
    );
  }
}
