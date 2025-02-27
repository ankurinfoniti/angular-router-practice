import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { User } from '../models/user.interface';

const API_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  create(user: User) {
    return this.http.post<User>(`${API_URL}users`, user);
  }
}
