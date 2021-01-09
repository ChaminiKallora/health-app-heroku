import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeartDiseaseDetectionComponent } from './heart-disease-detection/heart-disease-detection.component';


const routes: Routes = [
  {
    path: '',
    component: HeartDiseaseDetectionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeartDiseaseRoutingModule { }
