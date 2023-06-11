import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { BaseService } from 'src/app/core/services/base.service';
import { UtilityService } from 'src/app/core/utility/utility.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateProfileComponent implements OnInit {
  updateProfileForm!: FormGroup
  constructor(
    private _baseService: BaseService,
    private _authService: AuthService,
    private _utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.updateProfileForm = new FormGroup({
      name: new FormControl(''),
      about: new FormControl(''),
      mobile_no: new FormControl(''),
      dob: new FormControl(''),
      gender: new FormControl('')
    });
  }

  updateProfile(){
    this._authService.updateProfile(this.updateProfileForm.value).subscribe({
      next: (response:any) => {
        console.log(response);
        this._utilityService.toastSuccess(response?.message);
      }
    })
  }

}
