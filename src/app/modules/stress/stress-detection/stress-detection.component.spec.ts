import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StressDetectionComponent } from './stress-detection.component';

describe('StressDetectionComponent', () => {
  let component: StressDetectionComponent;
  let fixture: ComponentFixture<StressDetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StressDetectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StressDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
