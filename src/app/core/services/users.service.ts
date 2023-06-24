import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { catchError, timeout } from 'rxjs';
import { UtilityService } from '../utility/utility.service';
import { BaseService } from './base.service';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl!: string;
  constructor(
    private _http: HttpClient,
    private _errorHandler: ErrorHandlerService,
    private _baseService: BaseService,
    private _utilityService: UtilityService
  ) {
    this.baseUrl = this._baseService.baseUrl;
  }

  // getPage(callingroute?: string | undefined, params?: any, query?: any) {  
    
  //   if (callingroute == 'all-users') {
  //     return this.getAllUserList(query);
  //   }
  //   else if(callingroute == 'user-detail/:id'){
  //     return this.getSingleUser(params.id)
  //   }
  // }

  // Get All User List API
  getAllUserList(searchQuery?: any) {
    let query = '';
    if (searchQuery) {
      var esc = encodeURIComponent;
      query += Object.keys(searchQuery).map(k => esc(k) + '=' + esc(searchQuery[k])).join('&');
    }
    query = query != "" ? "/?" + query : "";
    return this._http.get(this.baseUrl + 'users' + query).pipe(
      timeout(75000),
      catchError((error) => {
        this._errorHandler.routeAccordingToError(error);
        throw error;
      })
    );
  }

  //Get  Single User API
  getSingleUser(userId:any){
    return this._http.get(`${this.baseUrl}users/${userId}`).pipe(timeout(75000),
    catchError((error) => {
      this._errorHandler.routeAccordingToError(error);
      throw error;
    }))
  }

  // Send Request API
  sendRequest(requestId:any){
    return this._http.post(this.baseUrl + 'send-request',requestId).pipe(timeout(75000),
    catchError((error) => {
      this._errorHandler.routeAccordingToError(error);
      throw error;
    }))
  }
}
