import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilityService } from 'src/app/core/utility/utility.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  loginForm!: FormGroup
  private _unsubscribe$ = new Subject<boolean>();
  constructor(
    private _utilityService: UtilityService,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user_token')) {
      this._router.navigateByUrl('/Users')
    }

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, this._utilityService.validateEmail]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)])
    });
  }

  login() {
    if (this.loginForm.valid) {
      // this._authService.login(this.loginForm.value).pipe(takeUntil(this._unsubscribe$)).subscribe({
      //   next: (response: any) => {
      //     console.log('response: ', response);
      //     localStorage.setItem('user_token', response.headers.get('Authorization'));
      //     this._utilityService.toastSuccess(response.body.message)
      //     this._router.navigateByUrl('/Users');
      //   }, error: (error) => {
      //     this._utilityService.routingAccordingToErrror(error);
      //   }
      // })

        this._utilityService.toastSuccess("Login Successfully");
        this._router.navigateByUrl('/Users');
    }
  }

  ngOnDestroy() {
    // this._utility.loaderStop();
  }

}
