import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotfoundComponent } from './core/components/page-notfound/page-notfound.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { ProjectLayoutComponent } from './core/layouts/project-layout/project-layout.component';
import { ALL_ROUTES } from './core/routes/all-routes'

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '', component: ProjectLayoutComponent, children: ALL_ROUTES },
  { path: 'auth', component: BlankLayoutComponent, loadChildren: ()=> import('./auth/auth.module').then(m=> m.AuthModule) },
  { path: '**', component: PageNotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
