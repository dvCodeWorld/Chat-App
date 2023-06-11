import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListRoutingModule } from './user-list-routing.module';
import { HomeScreenComponent } from './pages/home-screen/home-screen.component';
import { SharedModule } from '../shared/shared.module';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    HomeScreenComponent,
    AllUsersComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UserListRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule
  ]
  
})
export class UserListModule { }
