import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeartDiseaseRoutingModule } from './heart-disease-routing.module';
import { HeartDiseaseDetectionComponent } from './heart-disease-detection/heart-disease-detection.component';


@NgModule({
  declarations: [HeartDiseaseDetectionComponent],
  imports: [
    CommonModule,
    HeartDiseaseRoutingModule
  ]
})
export class HeartDiseaseModule { }
