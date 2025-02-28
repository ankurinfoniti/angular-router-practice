import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { courseGuard } from './guards/course.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authGuard],
  },
  {
    path: 'courses',
    component: CourseListComponent,
  },
  {
    path: 'courses/:id',
    component: CourseDetailComponent,
    canActivate: [courseGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
