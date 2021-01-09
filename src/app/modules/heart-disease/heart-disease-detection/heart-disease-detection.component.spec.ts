import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartDiseaseDetectionComponent } from './heart-disease-detection.component';

describe('HeartDiseaseDetectionComponent', () => {
  let component: HeartDiseaseDetectionComponent;
  let fixture: ComponentFixture<HeartDiseaseDetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeartDiseaseDetectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartDiseaseDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
