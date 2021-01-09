import { CoreModule } from './../core.module';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  BASEURL = environment.BASE_URL;
  REG_URL = environment.REG_URL;
  JWT_TOKEN_URL = environment.JWT_TOEKN_SERVICE_URL;
  PROFILE_SERVICE_URL = environment.PROFILE_SERVICE_URL;
  STRESS_DETECTION_URL = environment.STRESS_DETECTION_URL

  constructor(private http: HttpClient,
    private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this.REG_URL + "/register", user)
  }

  loginUser(user) {
    return this.http.post<any>(this.BASEURL + "/user-login", user)
  }

  googleLogin(token) {
    return this.http.post<any>(this.BASEURL + "/google-login", token);
  }

  facebookLogin(token) {
    return this.http.post<any>(this.BASEURL + "/facebook-login", token);
  }

  googleSignup(token) {
    return this.http.post<any>(this.REG_URL + "register/google", { token });
  }

  facebookSignup(token) {
    return this.http.post<any>(this.REG_URL + "register/fb", { token });
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    this._router.navigate(['./auth/signin'])
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getEmail() {
    return localStorage.getItem('email');
  }

  forgotPassword(user) {
    return this.http.post<any>(this.BASEURL + "/forgot-password", user)
  }

  resetPassword(user) {
    return this.http.post<any>(this.BASEURL + "/reset-password", user)
  }

  newPassword(user) {
    return this.http.post<any>(this.BASEURL + "/new-password", user)
  }

  validPasswordToken(token, email) {
    var user = { token, email }
    return this.http.post<any>(this.BASEURL + "/valid-password-token", user)
  }

  getProfile() {
    return this.http.get<any>(`${this.PROFILE_SERVICE_URL}/profile`)
  }

  updateUserProfile(user) {
    return this.http.put(this.PROFILE_SERVICE_URL + "/update-profile", user);
  }

  updatePassword(user) {
    return this.http.put(this.PROFILE_SERVICE_URL + "/update-profile-password", user);
  }

  public signup(data) {
    return this.http.post(this.REG_URL + "register", data);
  }

  stressDetection(signal, fs) {
    return this.http.post(this.STRESS_DETECTION_URL + "/real-prediction", { signal, fs });
  }

  stressDetectionSummary(email, date) {
    return this.http.post(this.STRESS_DETECTION_URL + "/prediction-percentage", { email, date });
  }

}
