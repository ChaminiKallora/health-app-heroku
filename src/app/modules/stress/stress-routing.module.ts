import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StressDetectionComponent } from './stress-detection/stress-detection.component';


const routes: Routes = [
  {
    path: '',
    component: StressDetectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StressRoutingModule { }
