import { ChildContactComponent } from './child-contact.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChildContactComponent],
  exports: [ChildContactComponent]
})
export class ChildContactModule { }
