import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-list',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent {
  courseService = inject(CourseService);

  courses$ = this.courseService.getCourses();
}
