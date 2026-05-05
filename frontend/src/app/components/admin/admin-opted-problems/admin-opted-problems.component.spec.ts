import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOptedProblemsComponent } from './admin-opted-problems.component';

describe('AdminOptedProblemsComponent', () => {
  let component: AdminOptedProblemsComponent;
  let fixture: ComponentFixture<AdminOptedProblemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOptedProblemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOptedProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
