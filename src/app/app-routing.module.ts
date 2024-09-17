import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'all-courses', component: AllCoursesComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: 'courses/:id', component: CourseDetailsComponent },
  { path: 'edit-course/:id', component: EditCourseComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
