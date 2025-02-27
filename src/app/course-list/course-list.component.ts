import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-list',
  imports: [AsyncPipe],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent {
  courseService = inject(CourseService);

  courses$ = this.courseService.getCourses();
}
