import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { UserData } from '../models/auth.models';
import { BehaviorSubject, catchError, Subject, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl!: string;
  public otpEmail = new BehaviorSubject<any>('');
  constructor(
    private _baseService: BaseService,
    private _http: HttpClient,
  ) {
    this.baseUrl = this._baseService.baseUrl;
  }

  // SignUp Api
  signup(data: UserData) {
    return this._http.post(this.baseUrl + 'userSignup', data, { observe: 'response' })
      .pipe(timeout(75000), catchError((error) => {
        throw error
      }));
  }

  // Login Api
  login(data: UserData) {
    return this._http.post(this.baseUrl + 'userLogin', data, { observe: 'response' })
      .pipe(timeout(7500), catchError((error) => {
        throw error
      }));
  }

  // Otp Verify 
  otpVerify(data: UserData) {
    return this._http.post(this.baseUrl + 'verify-otp', data, { observe: 'response' })
      .pipe(timeout(75000), catchError((error) => {
        throw error
      }))
  }

  // Update Profile
  updateProfile(data:any){
    return this._http.put(this.baseUrl + 'profile', data).pipe(timeout(75000), 
    catchError((error) => {
      throw error;
    }))
  }


  // Check User Authentication
  verifyUserLogin() {
    return localStorage.getItem("user_token") != undefined;
  }

  // Logout user
  logout() {
    localStorage.clear();
  }
}
