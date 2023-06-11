import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';
import { UtilityService } from 'src/app/core/utility/utility.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  pageContant:any
  singleUser:any;
  private _unsubscribe$ = new Subject<boolean>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _userService: UsersService,
    private __utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.pageContant = this._activatedRoute.snapshot.data['pageData'].responseData;
    this.singleUser = this.pageContant?.users;
  }

  // Send And Cancel Request
  sendAndCancelRequest(requestId?:any){
    let user_Id = {user_id: requestId}
    this._userService.sendRequest(user_Id).pipe(takeUntil(this._unsubscribe$)).subscribe({
      next:(response:any) => {
        this.__utilityService.toastSuccess(response?.message);
      }
    });
  }

}
