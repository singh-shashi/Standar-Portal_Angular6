import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildAttachmentComponent } from './childattachment.component';

// require('smartadmin-plugins/bower_components/datatables.net-colreorder-bs/css/colReorder.bootstrap.min.css');

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChildAttachmentComponent],
  exports: [ChildAttachmentComponent],
})
export class ChildAttachmentModule { }
