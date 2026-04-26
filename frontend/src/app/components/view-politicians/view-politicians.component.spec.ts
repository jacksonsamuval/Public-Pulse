import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPoliticiansComponent } from './view-politicians.component';

describe('ViewPoliticiansComponent', () => {
  let component: ViewPoliticiansComponent;
  let fixture: ComponentFixture<ViewPoliticiansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPoliticiansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPoliticiansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
