import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Course, LearningMode } from '../../models/course';
import { CATEGORIES, Category } from '../../models/category';

@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule,FormsModule],
  templateUrl: './all-courses.component.html',
  styleUrl:'./all-courses.component.css'
})
export class AllCoursesComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  nameFilter: string = '';
  categoryFilter: string = '';
  learningModeFilter: string = '';
  categories: Category[] = CATEGORIES;

  showCourses: boolean = false;

  constructor(private courseService: CourseService, private router: Router,private userService: UserService) {}
  
  ngOnInit() {
    this.courseService.getAllCourses().subscribe(
      courses => {
        this.courses = courses;
        this.filteredCourses = courses;
      },
      error => console.error('Error fetching courses:', error)
    );
  }
  toggleCourses() {
    this.showCourses = !this.showCourses;
    if (this.showCourses) {
      this.ngOnInit();
    }
  }
  resetFilters() {
    this.nameFilter = '';
    this.categoryFilter = '';
    this.learningModeFilter = '';
    this.filteredCourses = this.courses;
  }
  
  navigateToCourse(courseId: number) {
    if(this.userService.isLoggedIn()){
      this.router.navigate(['/courses',`${courseId}` ]);
    }
   else{
    alert("יש להזדהות על מנת לצפות בפרטים!");
   }
  }

  filterCourses() {
    this.filteredCourses = this.courses.filter(course =>
      course.name.toLowerCase().includes(this.nameFilter.toLowerCase()) &&
      (this.categoryFilter === '' || course.categoryId.toString() === this.categoryFilter) &&
      (this.learningModeFilter === '' || LearningMode[course.learningMode] === this.learningModeFilter)

    );
  }
  isStartingSoon(course: Course): boolean {
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const courseStartDate = new Date(course.startDate);
    const timeDifference = courseStartDate.getTime() - currentDate.getTime();
    return timeDifference > 0 && timeDifference <= oneWeek;
  }

}