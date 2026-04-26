import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompletedProblemComponent } from './view-completed-problem.component';

describe('ViewCompletedProblemComponent', () => {
  let component: ViewCompletedProblemComponent;
  let fixture: ComponentFixture<ViewCompletedProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCompletedProblemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCompletedProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
