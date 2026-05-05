import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewPoliticiansComponent } from './admin-view-politicians.component';

describe('AdminViewPoliticiansComponent', () => {
  let component: AdminViewPoliticiansComponent;
  let fixture: ComponentFixture<AdminViewPoliticiansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewPoliticiansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewPoliticiansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
