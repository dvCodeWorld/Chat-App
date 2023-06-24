import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, from, interval, map, of, Subject, Subscription, take, takeLast, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilityService } from 'src/app/core/utility/utility.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  // @ViewChild('myInput') myInputL!: ElementRef
  private _unsubscribe$ = new Subject<boolean>();
  obSubscription!: Subscription;
  hide = true;
  signUpForm!: FormGroup
  constructor(
    private _utilityService: UtilityService,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('user_token')) {
      this._router.navigateByUrl('/Users')
    }

    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)])
    });
  }

  signup() {
    if (this.signUpForm.valid) {
      this._authService.signup(this.signUpForm.value).pipe(takeUntil(this._unsubscribe$)).subscribe({
        next: (response: any) => {
          console.log('response', response);
          localStorage.setItem('user_token', response.headers.get('Authorization'));
          let userSignupDetails = response.body.responseData.save_user;
          this._authService.otpEmail.next(userSignupDetails);
          this._utilityService.toastSuccess(response.body.message);
          this._router.navigate(['auth/otp-verify'])
        }
      })
    }
    else {
      this._utilityService.toastError('Error', 'Work in progress');
    }
  }

}
