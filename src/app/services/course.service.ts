import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { Course } from '../models/course.interface';

const API_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  http = inject(HttpClient);

  getCourses() {
    return this.http
      .get<Course[]>(`${API_URL}courses`)
      .pipe(catchError(this.handleError));
  }

  getCourse(id: string) {
    return this.http
      .get<Course>(`${API_URL}courses/${id}`)
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
