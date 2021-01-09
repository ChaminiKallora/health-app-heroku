import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule, MatTabsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, } from '@angular/material';
import { HighchartsChartComponent } from 'highcharts-angular';
import { StressRoutingModule } from './stress-routing.module';
import { StressDetectionComponent } from './stress-detection/stress-detection.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [StressDetectionComponent, HighchartsChartComponent],
  imports: [
    CommonModule,
    StressRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ]
})
export class StressModule { }
