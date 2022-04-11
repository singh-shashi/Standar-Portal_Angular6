import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDefectComponent } from './add-defect.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [AddDefectComponent],
  exports: [AddDefectComponent]
})
export class AddDefectModule { }
