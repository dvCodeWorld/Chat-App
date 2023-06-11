import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, TimeoutError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _toastr: ToastrService,
  ) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage: any;
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      console.log(
        `Backend returned code ${error.status}, ` + `body was: ${error.error.message}`
      );
      errorMessage = error.error.message || error.message;
    }
    throw error;
  }

  routeAccordingToError(error: HttpErrorResponse) {
    if (error instanceof TimeoutError) {
      this.errorToast('Oops!', error.message);
    } else if (error.status === 0) {
      this.errorToast(
        'Oops!',
        'Please check your internet connection or try again later'
      );
    } else if (error.status === 403) {
      console.log(error.message);
      this._router.navigateByUrl('/access-denied');
    } else {
      this.errorToast('Oops!', error.error.message || error.error);

      if (error.error === 'Unauthorized' || error.status === 401) {
        setTimeout(() => {
          this.redirectToLogin();
        }, 1000)
      } else if (error.error.message === 'page under construction') {
        console.log(error.error.message)
        this._router.navigate(['/page-under-construction']);
      }
    }
  }

  redirectToLogin() {
    this._authService.logout();
  }

  errorToast(title: string, detail: string) {
    this._toastr.error(detail, title, {
      closeButton: true,
      positionClass: 'toast-top-right',
      timeOut: 2500
    });
  }
}
