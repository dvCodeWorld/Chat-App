import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ErrorHandlerService } from '../services/error-handler.service';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private loader: NgxUiLoaderService,
    private _errorHandler: ErrorHandlerService,
    private toast: ToastrService,
    private _router: Router,

  ) { }

  validateEmail(controls: FormControl) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { validateEmail: true };
    }
  }

  resetPage() {
    this.loader.stop();
    this.scrollToTop();
  }

  loaderStart() {
    this.loader.start();
  }

  loaderStop() {
    this.loader.stop();
  }

  // Encode id
  base64Encode(stringText: any) {
    return window.btoa(stringText);
  }

  // Decode id
  base64Decode(stringText: any) {
    return window.atob(stringText);
  }

  routingAccordingToErrror(error: any) {
    this._errorHandler.routeAccordingToError(error);
    this.resetPage();
  }

  // tost Success
  toastSuccess(title?: string, details?: string) {
    this.toast.success(details, title, {
      closeButton: true,
      positionClass: 'toast-top-right',
      timeOut: 4000
    });
  }

  // tost Info
  toastInfo(title?: string, details?: string) {
    this.toast.info(details, title, {
      closeButton: true,
      positionClass: 'toast-top-right',
      timeOut: 4000
    });
    this.resetPage();
  }

  // tost Warning
  toastWarning(title?: string, details?: string) {
    this.toast.warning(details, title, {
      closeButton: true,
      positionClass: 'toast-top-right',
      timeOut: 4000
    })
  }

  // tost Error
  toastError(title?: string, details?: string) {
    this.toast.error(details, title, {
      closeButton: true,
      positionClass: 'toast-top-right',
      timeOut: 4000
    })
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Decode Token
  decodeUser(token: any) {
    const decode = jwt_decode(token);
    return decode;
  }

  //Remove Null keys in Object
  deleteNullKeysInObject(data:any) {

    Object.keys(data).map(function (key) {
      if (data[key] === '' || data[key] === null || data[key]?.length == 0) {
        delete data[key];
      }
    });
    return data;
  }

  /**
   * Function to set queryParams in URL with merge as queryParams handling
   * @param data Data with key value pairs to be set as queryParams in URL
   */
  addQueryParamsToUrl(data: any): void {
    this._router.navigate([], {
      queryParams: data,
      queryParamsHandling: 'merge'
    });
  }
}
