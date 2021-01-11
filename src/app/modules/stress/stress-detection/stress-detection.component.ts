import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import Pusher from 'pusher-js';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { MAT_DATE_LOCALE } from '@angular/material/core';


export interface TimeDomainElement {
  feature: string;
  value: number;
}

export interface FrequencyDomainElement {
  feature: string;
  value: number;
}

@Component({
  selector: 'app-stress-detection',
  templateUrl: './stress-detection.component.html',
  styleUrls: ['./stress-detection.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    DatePipe
  ]
})

export class StressDetectionComponent implements OnInit {

  pusher: any = 0;
  socket: any = 0;
  pieChart = [];
  summaryForm: FormGroup;
  realtime: FormGroup;
  stressed: any;
  not_stressed: any;
  clicked = false;

  totalTime: any;
  stressedTime: any;

  highcharts = Highcharts;
  chartOptions;

  messageText: string;
  messages: Array<any>;
  ss: any;

  timeDomainDisplayedColumns: string[] = ['feature', 'value'];
  timeDomainDataSource = [];
  timeDomainDataSource_simulator = [];

  frequencyDomainDisplayedColumns: string[] = ['feature', 'value'];
  frequencyDomainDataSource = [];
  frequencyDomainDataSource_simulator = [];

  prediction = { value: "N/A" };
  prediction_simulator: string = "N/A";
  signal: Variable;

  constructor(
    private ngxCsvParser: NgxCsvParser,
    private _auth: AuthenticationService,
    private _router: Router,
    private formBuilder: FormBuilder,
  ) 

  ngOnInit() {
    this.summaryForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      date: ['', [Validators.required]]
    });

    this.realtime = this.formBuilder.group({
      email_realtime: ['', [Validators.required]]
    });

    this.summaryForm.get('email').setValue(this._auth.getEmail());
    this.realtime.get('email_realtime').setValue(this._auth.getEmail());
  }

  csvRecords: any[] = [];
  header: boolean = false;

  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
        // console.log('Result', result);
        this.csvRecords = result;

        this.signal = [].concat.apply([], result);

      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
  }

  realTimePrediction() {
    this.updatePrediction();
  }

  predict() {
    this._auth.stressDetection(this.signal, 100).subscribe(
      res => {
        this.prediction_simulator = res["Status "];

        const ELEMENT_TIMEDOMAIN_DATA: TimeDomainElement[] = [];
        const ELEMENT_FREQUENCYDOMAIN_DATA: FrequencyDomainElement[] = [];

        for (let i = 0; i < res["feature_name"].length; i++) {
          if (i < 6)
            ELEMENT_TIMEDOMAIN_DATA.push({ feature: res["feature_name"][i], value: res["features"][i] });
          else
            ELEMENT_FREQUENCYDOMAIN_DATA.push({ feature: res["feature_name"][i], value: res["features"][i] });
        }

        this.timeDomainDataSource_simulator = ELEMENT_TIMEDOMAIN_DATA;
        this.frequencyDomainDataSource_simulator = ELEMENT_FREQUENCYDOMAIN_DATA;
      },
      (err: HttpErrorResponse) => {
        console.log('Err', err);
      }
    )
  }

  updatePrediction() {
    this.clicked = true;
    var channel = this.pusher.subscribe('my-channel');
    channel.bind('my-event', (data) => {
      // console.log('Received my-event with message: ' + JSON.stringify(data));
      // console.log(data.email);
      // console.log(this.realtime.value.email_realtime);
      // console.log(data.email === this.realtime.value.email_realtime);
      if (data.email === this.realtime.value.email_realtime) {
        // console.log(data.Status);
        this.prediction = { value: data.Status };

        const ELEMENT_TIMEDOMAIN_DATA: TimeDomainElement[] = [];
        const ELEMENT_FREQUENCYDOMAIN_DATA: FrequencyDomainElement[] = [];

        for (let i = 0; i < data.feature_name.length; i++) {
          if (i < 6)
            ELEMENT_TIMEDOMAIN_DATA.push({ feature: data.feature_name[i], value: data.features[i] });
          else
            ELEMENT_FREQUENCYDOMAIN_DATA.push({ feature: data.feature_name[i], value: data.features[i] });
        }

        this.timeDomainDataSource = ELEMENT_TIMEDOMAIN_DATA;
        this.frequencyDomainDataSource = ELEMENT_FREQUENCYDOMAIN_DATA;
      }
    });
  }

  get Prediction() {
    return this.prediction.value;
  }

  getSummary() {
    var datePipe = new DatePipe("en-US");
    var value = datePipe.transform(this.summaryForm.value.date, 'dd/MM/yyyy');

    const dateString = value.toString();

    this._auth.stressDetectionSummary(this.summaryForm.value.email, dateString).subscribe(
      res => {
        this.stressed = Math.floor((res['stressed'] * 5 * 100) / res['time']);
        this.not_stressed = Math.ceil((res['not_stressed'] * 5 * 100) / res['time']);
        this.totalTime = res['st_time'];
        this.stressedTime = res['stressed'] * 5 + "min";

        this.chartOptions = {
          chart: {
            plotBorderWidth: null,
            plotShadow: false
          },
          title: {
            text: 'Summary of the day'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              shadow: true,
              center: ['50%', '50%'],
              size: '70%',
              innerSize: '30%'
            }
          },
          series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
              { name: 'Not stressed', y: this.not_stressed },
              {
                name: 'Stressed',
                y: this.stressed,
                sliced: true,
                selected: true
              },

            ]
          }]
        };
      },
      (err: HttpErrorResponse) => {
        console.log('Err', err);
      }
    )
  }

}
