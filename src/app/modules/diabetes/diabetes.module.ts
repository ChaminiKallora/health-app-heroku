import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiabetesRoutingModule } from './diabetes-routing.module';
import { DiabetesDetectionComponent } from './diabetes-detection/diabetes-detection.component';


@NgModule({
  declarations: [DiabetesDetectionComponent],
  imports: [
    CommonModule,
    DiabetesRoutingModule
  ]
})
export class DiabetesModule { }
