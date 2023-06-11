import { NgModule } from '@angular/core';

import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { ProjectLayoutComponent } from './layouts/project-layout/project-layout.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ConfirmationPopupComponent } from './components/confirmation-popup/confirmation-popup.component'
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageNotfoundComponent } from './components/page-notfound/page-notfound.component';
import { HttpClientModule } from '@angular/common/http'
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    BlankLayoutComponent,
    ProjectLayoutComponent,
    ConfirmationPopupComponent,
    PageNotfoundComponent,
    HeaderComponent,
  ],
  providers: [],

  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  exports: [
    RouterModule,
    SharedModule,
    FlexLayoutModule,
    HttpClientModule,
    HeaderComponent
  ]
})
export class CoreModule { }
