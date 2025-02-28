import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { map, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CourseService } from '../services/course.service';
import { Course } from '../models/course.interface';

@Component({
  selector: 'app-course-detail',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css',
})
export class CourseDetailComponent {
  route = inject(ActivatedRoute);
  courseService = inject(CourseService);
  destroyRef = inject(DestroyRef);

  id!: string;

  course$!: Observable<Course>;
  recentCourses$!: Observable<Course[]>;

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.id = params.get('id')!;

        this.course$ = this.courseService.getCourse(this.id);
      });

    this.recentCourses$ = this.courseService.getCourses().pipe(
      map((courses) => {
        let sortedCourses = courses.reverse();

        return sortedCourses.filter((courses, index) => index < 3);
      }),
    );
  }
}
