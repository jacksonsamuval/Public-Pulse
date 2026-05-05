import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewAllProblemsComponent } from './admin-view-all-problems.component';

describe('AdminViewAllProblemsComponent', () => {
  let component: AdminViewAllProblemsComponent;
  let fixture: ComponentFixture<AdminViewAllProblemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewAllProblemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewAllProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
