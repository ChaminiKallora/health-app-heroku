import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StressDetectionService {

  STRESSDETECTION_URL = environment.STRESS_DETECTION_URL;

  constructor(
    private http: HttpClient,
    private _router: Router,
  ) { }

  get_prediction(signal) {
    return this.http.post<any>(this.STRESSDETECTION_URL + "/stress-detection", { signal, fs: 100 })
  }
}
