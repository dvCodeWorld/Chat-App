import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { mergeAlias } from '@angular/flex-layout';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgOtpInputComponent } from 'ng-otp-input';
import { map, Observable, timer, take, mergeMap, observable, mergeAll, takeUntil, Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilityService } from 'src/app/core/utility/utility.service';

@Component({
  selector: 'app-otp-verified',
  templateUrl: './otp-verified.component.html',
  styleUrls: ['./otp-verified.component.scss']
})
export class OtpVerifiedComponent implements OnInit {
  private _unsubscribe$ = new Subject<boolean>();
  // @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput!: NgOtpInputComponent;
  constructor(
    private _authService: AuthService,
    private _utilityService: UtilityService,
    private _router: Router
  ) { }

  counter$!: Observable<number>;
  count = 5;
  userEmail: any;
  currentOtp: any;
  disableBtn: boolean = true;
  otpTimeLimit!: number;
  otpWillSent: boolean =false;
  ngOnInit(): void {
    let UserDetils: any = this._utilityService.decodeUser(localStorage.getItem('user_token'));
    this.userEmail = UserDetils.email;

    this.counter$ = timer(0, 1000).pipe(
      take(this.count),
      map(() => --this.count)
    );
    this.counter$.subscribe((data: any) => {
      this.otpTimeLimit = data;
    })
  }

  onOtpChange(otp: any) {
    this.currentOtp = otp;
    if (this.currentOtp.length < 4) {
      this.disableBtn = true;
    } else {
      this.disableBtn = false;
    }
  }

  otpVerify() {
    let obj;
    obj = Object.assign({ otp: this.currentOtp, email: this.userEmail });
    console.log(obj);
    this._authService.otpVerify(obj).pipe(takeUntil(this._unsubscribe$)).subscribe({
      next: (response: any) => {
        console.log('response: ', response);
        this._utilityService.toastSuccess('Success', response.body.message);
        this._router.navigateByUrl('/Users')

      }, error: (error) => {
        this._utilityService.routingAccordingToErrror(error);
      }
    })

  }




}
