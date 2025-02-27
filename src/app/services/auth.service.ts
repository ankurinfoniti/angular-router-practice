import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { User } from '../models/user.interface';

const API_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  create(user: User) {
    return this.http
      .post<User>(`${API_URL}users`, user)
      .pipe(catchError(this.handleError));
  }

  login(user: User) {
    return this.http
      .post<User>(`${API_URL}login`, user)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
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
