import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Course, LearningMode } from '../../models/course';
import { CATEGORIES, Category } from '../../models/category';
import { User } from '../../models/user';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LearningModeTextPipe } from '../../pipes/LearningModeTextPipe';
import { AbstractControl, ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LearningModeTextPipe],
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  @Input() course!: Course;
  @Input() isEditMode: boolean = false;
  @Output() formSubmit = new EventEmitter<Course>();


  learningModes: LearningMode[] = [LearningMode.Frontal, LearningMode.Zoom];
  user: User | null = null;
  courseForm!: FormGroup;
  categories: Category[] = CATEGORIES;
  availableImages: string[] = ['image1.png', 'image2.png', 'image3.png',
    'image4.png','image5.png','image6.png','image7.png'];
  selectedCategoryIcon: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.initForm();
    this.user = this.userService.getCurrentUser();
    if (this.user && this.user.id) {
      this.courseForm.patchValue({ lecturerId: this.user.id });
    }
    console.log('CATEGORIES:', CATEGORIES);
    this.loadAvailableImages();
    if (this.isEditMode) {
      this.loadCourseData();
    }
  }
  dateValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const inputDate = new Date(control.value);
      return inputDate < today ? { 'pastDate': true } : null;
    };
  }
  initForm() {
    this.courseForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      categoryId: ['', Validators.required],
      lessonsCount: [0, [Validators.required, Validators.min(1)]],
      startDate: ['', [Validators.required, this.dateValidator()]],
      syllabus: this.fb.array([this.fb.control('', Validators.required)]),
      learningMode: [LearningMode.Frontal, Validators.required],
      lecturerId: [{ value: this.user?.id || null, disabled: true }],
      imagePath: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  loadCourseData() {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.courseService.getCourse(+courseId).subscribe(
        course => {
          console.log('Loaded course:', course);  // Add this line
          this.courseForm.patchValue(course);
          this.courseForm.setControl('syllabus', this.fb.array(course.syllabus || []));
          this.onCategoryChange(course.categoryId);
        }
      );
    }
  }

  get syllabusControls() {
    return (this.courseForm.get('syllabus') as FormArray).controls;
  }

  addSyllabusItem() {
    const syllabus = this.courseForm.get('syllabus') as FormArray;
    syllabus.push(this.fb.control('', Validators.required));
  }

  removeSyllabusItem(index: number) {
    const syllabus = this.courseForm.get('syllabus') as FormArray;
    syllabus.removeAt(index);
  }

  loadAvailableImages() {
    // Logic to load available images
    this.availableImages = ['image1.png', 'image2.png', 'image3.png',
      'image4.png','image5.png','image6.png','image7.png'];
  }

  onImageSelect(image: string) {
    this.courseForm.patchValue({ imagePath: `assets/${image}` });
  }

  onCategoryChange(categoryId: number) {
    const selectedCategory = this.categories.find(cat => cat.id === categoryId);
    if (selectedCategory) {
      this.selectedCategoryIcon = selectedCategory.iconPath;
    }
  }



  onSubmit() {
    if (this.courseForm.valid) {
      const courseData = this.courseForm.getRawValue() as Course;
      console.log('Submitting course with lecturerId:', courseData.lecturerId);
      this.formSubmit.emit(courseData);
    }
    else {
      if (this.courseForm.get('startDate')?.errors?.['pastDate']) {
        alert('התאריך שנבחר כבר עבר. אנא בחר תאריך עתידי.');
      }
      else{
        alert('הטופס לא מלא');
        Object.values(this.courseForm.controls).forEach(control => {
          control.markAsTouched();
        });
      }
     
    }
  }



  onCancel() {
    this.router.navigate(['/courses', this.courseForm.get('id')?.value]);
  }
}
