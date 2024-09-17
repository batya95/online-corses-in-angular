import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AllCoursesComponent } from './all-courses.component';
import { Router } from '@angular/router';

describe('AllCoursesComponent', () => {
  let component: AllCoursesComponent;
  let fixture: ComponentFixture<AllCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCoursesComponent, RouterModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
