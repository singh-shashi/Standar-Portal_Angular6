import { ChildWatchbyComponent } from './child-watchby.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChildWatchbyComponent],
  exports: [ChildWatchbyComponent]
})
export class ChildWatchbyModule { }
