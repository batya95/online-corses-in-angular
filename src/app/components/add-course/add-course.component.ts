// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { CourseService } from '../../services/course.service';
// import { Course, LearningMode } from '../../models/course';
// import { Category } from '../../models/category';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ChangeDetectorRef } from '@angular/core';
// import { User } from '../../models/user'; 
// import { UserService } from '../../services/user.service';

// @Component({
//   selector: 'app-add-course',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './add-course.component.html',
//   styleUrls: ['./add-course.component.css']
// })

// export class AddCourseComponent implements OnInit {
//   course: Course = new Course(0, '', 0, 0, new Date(), [""], LearningMode.Frontal, 0, "","");
//   categories: Category[] = [];
//   syllabusItems: string[] = [""];
//   LearningMode = LearningMode;
//   currentUser!: User;
//   // constructor(private courseService: CourseService, private router: Router,private changeDetectorRef: ChangeDetectorRef) {}
//   constructor(
//     private courseService: CourseService,
//     private userService: UserService,private router: Router,private changeDetectorRef: ChangeDetectorRef
//   ){}
//   showAddCourseForm: boolean = false;
//   toggleAddCourseForm() {
//     this.showAddCourseForm = !this.showAddCourseForm;
//   }
  
//   ngOnInit() {
//   const user = this.userService.getCurrentUser();
// if (user) {
//   this.currentUser = user;
//   if (this.currentUser && this.currentUser.id) {
//     this.course.lecturerId = this.currentUser.id;
//   }
// }
//     if(this.categories.length!=0){
//       this.courseService.getCategories().subscribe(
//       categories => this.categories = categories
//     )};
//     if (this.syllabusItems.length === 0) {
//       this.syllabusItems = [""];
//     }
//   }
//   // updateSyllabusItem(index: number, event: Event) {
//   //   const input = event.target as HTMLInputElement;
//   //   this.syllabusItems[index] = input.value;
//   //   this.changeDetectorRef.detectChanges();
//   // }
  
//   updateSyllabusItem(index: number) {
//     this.syllabusItems = [...this.syllabusItems];
//     this.changeDetectorRef.detectChanges();
//   }
  
  
//   // onSyllabusItemChange(index: number) {
//   //   // זה יגרום ל-Angular לזהות את השינוי במערך
//   //   this.syllabusItems = [...this.syllabusItems];
//   // }
  
//   addSyllabusItem() {
//     this.syllabusItems.push('');
//   }

//   removeSyllabusItem(index: number) {
//     this.syllabusItems.splice(index, 1);
//   }

//   // onInputChange(event: Event, index: number) {
//   //   const target = event.target as HTMLInputElement;
//   //   if (target) {
//   //     this.syllabusItems[index] = target.value;
//   //   }
//   // }
  

//   onSubmit() {
 
    
//     this.course.syllabus = [...this.syllabusItems];
//     this.courseService.addCourse(this.course).subscribe(
//       newCourse => {
//         alert('הקורס נוסף בהצלחה');
//         this.router.navigate(['/courses']);
//       },
//       error => console.error('Error adding course:', error)
//     );
//   }
// }



import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course, LearningMode } from '../../models/course';
import { CourseFormComponent } from '../course-form/course-form.component';


@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CourseFormComponent],
  template: '<app-course-form [course]="newCourse" [isEditMode]="false" (formSubmit)="onFormSubmit($event)"></app-course-form>'
})
export class AddCourseComponent {
  newCourse: Course = new Course(0, '', 0, 0, new Date(), [], LearningMode.Frontal, 0, '','');

  constructor(
    private courseService: CourseService,
    private router: Router
  ) {}

  onFormSubmit(newCourse: Course) {
    this.courseService.addCourse(newCourse).subscribe(
      () => {
        alert('הקורס נוסף בהצלחה');
        this.router.navigate(['/courses']);
      },
      error => console.error('Error adding course:', error)
    );
  }
}
