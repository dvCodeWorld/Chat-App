import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersResolverService } from '../core/resolvers/all-users.service';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import { HomeScreenComponent } from './pages/home-screen/home-screen.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';

const routes: Routes = [
  { path: '', component: HomeScreenComponent },
  {
    path: 'all-users',
    component: AllUsersComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      pageData: AllUsersResolverService
    }
  },
  {
    path: 'user-detail/:id',
    component: UserDetailComponent,
    resolve:{
      pageData: AllUsersResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserListRoutingModule { }
