import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiabetesDetectionComponent } from './diabetes-detection.component';

describe('DiabetesDetectionComponent', () => {
  let component: DiabetesDetectionComponent;
  let fixture: ComponentFixture<DiabetesDetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiabetesDetectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiabetesDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
