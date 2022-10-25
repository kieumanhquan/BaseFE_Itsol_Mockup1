import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSalaryComponent } from './review-salary.component';

describe('ReviewSalaryComponent', () => {
  let component: ReviewSalaryComponent;
  let fixture: ComponentFixture<ReviewSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewSalaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
