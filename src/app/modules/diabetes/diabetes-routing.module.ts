import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiabetesDetectionComponent } from './diabetes-detection/diabetes-detection.component';


const routes: Routes = [
  {
    path: '',
    component: DiabetesDetectionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiabetesRoutingModule { }
