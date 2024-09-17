import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { UserService } from '../../services/user.service';
import { Course, LearningMode } from '../../models/course';
import { LearningModeIconPipe } from '../../pipes/learning-mode-icon.pipe';
import { Lecturer } from '../../models/lecturer';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CATEGORIES } from '../../models/category';
import { NgZone } from '@angular/core';
import { LearningModeTextPipe  } from '../../pipes/LearningModeTextPipe';


@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, RouterModule, LearningModeIconPipe, LearningModeTextPipe],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
lecturer:Lecturer| null=null;
  course: Course | null = null;
  isLecturerOfCourse: boolean = false;
  categoryIcon: string = '';
  categoryName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationRouter: Router,
    private courseService: CourseService,
    private userService: UserService,
    private zone: NgZone
    
  ) {}
  LearningMode = LearningMode;


  ngOnInit() {
    const courseId = this.activatedRoute.snapshot.paramMap.get('id');
    if (courseId) {
      this.courseService.getCourse(+courseId).subscribe(
        course => {
          console.log('Loaded course details:', course);
          this.course = course;
          this.checkIfLecturer();
          this.zone.run(() => {
            if(this.course)
            this.getCategoryIcon(this.course.categoryId);
          });
        }
      );
    } 
    if(this.course){
      this.getCategoryIcon(this.course.categoryId);
      console.log('categoryIcon after init:', this.categoryIcon);
    }
  
    
  }
  
     
  checkIfLecturer(): boolean {
    const currentUser = this.userService.getCurrentUser();
    console.log('Current user:', currentUser);
    console.log('Course lecturer ID:', this.course?.lecturerId);
    if (this.course && currentUser) {
      return this.course.lecturerId === currentUser.id;
    }
    return false;
  }
  

  isStartingSoon(): boolean {
    if (this.course) {
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      const currentDate = new Date();
      const courseStartDate = new Date(this.course.startDate);
      const timeDifference = courseStartDate.getTime() - currentDate.getTime();
      
      return timeDifference > 0 && timeDifference <= oneWeek;
    }
    return false;
  }

  getCategoryIcon(categoryId: number) {
    const category = CATEGORIES.find(cat => cat.id === Number(categoryId));
    if (category) {
      this.categoryIcon = category.iconPath;
      this.categoryName = category.name;
    }
  }
  
  getLecturerDetails(): Observable<string> {
    if (this.course && this.course.lecturerId) {
      return this.userService.getUserById(this.course.lecturerId).pipe(
        map((lecturer: Lecturer) => lecturer.name),
        catchError(() => of('לא נמצא מרצה'))
      );
    }
    return of('לא נמצא מרצה');
  }
  
 
  
  getCategoryName(categoryId: number): { name: string, icon: string } {
    console.log('Received category ID:', categoryId);
    const category = CATEGORIES.find(c => c.id === categoryId);
    return category ? { name: category.name, icon: category.iconPath } : { name: 'קטגוריה לא ידועה', icon: 'fa-question' };
  }
  

  learningModeIcon(mode: LearningMode): string {
    return new LearningModeIconPipe().transform(mode);
  }

  editCourse() {
    if (this.course) {
      this.navigationRouter.navigate(['/edit-course', this.course.id], { state: { course: this.course } });
    }
  }

}

