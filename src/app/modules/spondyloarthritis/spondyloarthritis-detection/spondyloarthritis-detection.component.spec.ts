import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpondyloarthritisDetectionComponent } from './spondyloarthritis-detection.component';

describe('SpondyloarthritisDetectionComponent', () => {
  let component: SpondyloarthritisDetectionComponent;
  let fixture: ComponentFixture<SpondyloarthritisDetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpondyloarthritisDetectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpondyloarthritisDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
