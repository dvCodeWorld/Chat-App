import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from './material/material.module';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    InfiniteScrollModule
  ],
  exports: [
    MaterialModule,
    InfiniteScrollModule
  ]
})
export class SharedModule { }
