import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpondyloarthritisRoutingModule } from './spondyloarthritis-routing.module';
import { SpondyloarthritisDetectionComponent } from './spondyloarthritis-detection/spondyloarthritis-detection.component';


@NgModule({
  declarations: [SpondyloarthritisDetectionComponent],
  imports: [
    CommonModule,
    SpondyloarthritisRoutingModule
  ]
})
export class SpondyloarthritisModule { }
