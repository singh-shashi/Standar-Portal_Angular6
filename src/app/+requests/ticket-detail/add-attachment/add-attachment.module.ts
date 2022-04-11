import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAttachmentComponent } from './add-attachment.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [AddAttachmentComponent],
  exports: [AddAttachmentComponent]
})
export class AddAttachmentModule { }
