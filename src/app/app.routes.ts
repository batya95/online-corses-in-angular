import { Routes } from '@angular/router';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
export const routes: Routes = [
  { path: 'courses', component: AllCoursesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: 'courses/:id', component: CourseDetailsComponent },
  { path: 'edit-course/:id', component: EditCourseComponent },
  { path: 'users/:id', component: CourseDetailsComponent },
  { path: '', redirectTo: '/courses', pathMatch: 'full' }
];
