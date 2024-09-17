// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CourseService } from '../../services/course.service';
// import { Course } from '../../models/course';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { LearningMode } from '../../models/course';


// @Component({
//   selector: 'app-edit-course',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './edit-course.component.html',
//   styleUrls: ['./edit-course.component.css']
// })
// export class EditCourseComponent implements OnInit {
//   course: Course | null = null;
//   availableImages: string[] = [];
//   selectedImage: string | null = null;

//   selectImage(image: string) {
//     this.selectedImage = image;
//     if(this.course)
//     this.course.imagePath = `assets/${image}`;
//   }
//   learningModes = Object.values(LearningMode);
//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private courseService: CourseService
//   ) {}

//   ngOnInit() {
//     const courseId = this.route.snapshot.paramMap.get('id');
//     if (courseId) {
//       this.courseService.getCourse(+courseId).subscribe(
//         course => this.course = course
//       );
//     }
//     this.loadAvailableImages();
//   }

//   loadAvailableImages() {
//     // כאן תצטרך לממש לוגיקה לטעינת שמות הקבצים מהתיקייה
//     // לדוגמה:
//     this.availableImages = ['image1.png', 'image2.png','image3.png'];
//   }

//   onSubmit() {
//     if (this.course) {
//       this.courseService.updateCourse(this.course).subscribe(
//         () => {
//           alert('הקורס עודכן בהצלחה');
//           this.router.navigate(['/courses']);
//         },
//         error => {
//           console.error('שגיאה בעדכון הקורס:', error);
//         }
//       );
//     }
//   }
//   addSyllabusItem() {
//     if (this.course && this.course.syllabus) {
//       this.course.syllabus.push('');
//     }
//   }
  
//   removeSyllabusItem(index: number) {
//     if (this.course && this.course.syllabus) {
//       this.course.syllabus.splice(index, 1);
//     }
//   }
//   onCancel() {
//     this.router.navigate(['/courses', this.course?.id]);
//   }
  
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import { LearningMode } from '../../models/course';
import { CourseFormComponent } from '../course-form/course-form.component';


@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [CourseFormComponent],
  template: '<app-course-form [course]="course" [isEditMode]="true" (formSubmit)="onFormSubmit($event)"></app-course-form>'
})
export class EditCourseComponent implements OnInit {
  course: Course = new Course(0, '', 0, 0, new Date(), [], LearningMode.Frontal, 0, '','');


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.courseService.getCourse(+courseId).subscribe(
        course => this.course = course
      );
    }
  }

  onFormSubmit(updatedCourse: Course) {
    this.courseService.updateCourse(updatedCourse).subscribe(
      () => {
        alert('הקורס עודכן בהצלחה');
        this.router.navigate(['/courses']);
      },
      error => console.error('Error updating course:', error)
    );
  }
}
