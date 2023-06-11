import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';
import { UtilityService } from 'src/app/core/utility/utility.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  allUsers:any = [];
  pageContant:any;
  userCount!:number;
  pageIndex: number = 1;
  offset: number = 0;
  private searchTerms = new Subject<string>();
  searchList$!: Observable<any>;
  searchForm!: FormGroup;

  private _unsubscribe = new Subject<boolean>();
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _utilityService: UtilityService,
  ) { }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(queryParams => {
      this.pageContant = this._activatedRoute.snapshot.data['pageData']?.responseData;
      this.allUsers = this.pageContant?.users;
      this.userCount = this.pageContant?.userCount;
      this.searchUser();
    });
    let offset = this._activatedRoute.snapshot.queryParams['offset'] || 0;
    this.pageIndex = offset / 10 || 0;
    this.searchForm = new FormGroup({
      name: new FormControl('')
    })
  }

  getPage(event:any):void{
    let data = { offset: event?.pageIndex * 10 }
    this._utilityService.addQueryParamsToUrl(data);
  }

  search(e:any){
    this.offset = 0;
    let term = e.target.value;
    this.searchTerms.next(term.trim());
  }

  searchUser(){
    this.offset = 0;
    this.searchList$ =  this.searchTerms.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap((term:string) => {
        let obj;
        obj = Object.assign({},{offset: 0},this.searchForm.value);
        return  this._router.navigate([], {
          relativeTo: this._activatedRoute,
          queryParams: obj,
          queryParamsHandling: 'merge'
        });
      })
    );
    this.searchList$.subscribe(res => {
    })
  }
}
