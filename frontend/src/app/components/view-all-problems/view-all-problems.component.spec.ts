import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllProblemsComponent } from './view-all-problems.component';

describe('ViewAllProblemsComponent', () => {
  let component: ViewAllProblemsComponent;
  let fixture: ComponentFixture<ViewAllProblemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllProblemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
