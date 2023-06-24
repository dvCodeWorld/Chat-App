import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilityService } from 'src/app/core/utility/utility.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  loginForm!: FormGroup
  private _unsubscribe$ = new Subject<boolean>();
  userData!:any;
  private dummyUsers:any = [
    {
    name: "Divyanshu Shrivastava",
    email: "divyanshushrivastava123@gmail.com",
    password: "abcd1234"
   },
   {
    name: "Pankaj Kamliya",
    email: "pankaj@gmail.com",
    password: "123456"
   },
   {
    name: "Dummy User",
    email: "dummyuser@gmail.com",
    password: "123456"
   }
]
  constructor(
    private _utilityService: UtilityService,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    alert("If You want to login with dummy user then, You can login with\n\n Email: dummyuser@gmail.com\n Password: 123456")
    if (localStorage.getItem('user_token')) {
      this._router.navigateByUrl('/Users')
    }

    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required,this._utilityService.validateEmail]),
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
      let check = false;     
      this.dummyUsers.forEach((element: any) => {
        if(element.email === this.loginForm.value.email && element.password === this.loginForm.value.password){
          check = true
          this.userData = element
        }       
      });
      if(check){
        localStorage.setItem('user_token',this.userData.name+','+this.loginForm.value.email);
        this._utilityService.toastSuccess("Login Succes, "+this.userData.name);
        this._router.navigateByUrl('/Users');
      }else{
        this._utilityService.toastError("Invaild User !");
      }
    }
  }

  ngOnDestroy() {
    // this._utility.loaderStop();
  }

}
