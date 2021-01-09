import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpondyloarthritisDetectionComponent } from './spondyloarthritis-detection/spondyloarthritis-detection.component';

const routes: Routes = [
  {
    path: '',
    component: SpondyloarthritisDetectionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpondyloarthritisRoutingModule { }
