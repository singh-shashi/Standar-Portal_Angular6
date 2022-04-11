import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildDefectComponent } from './childdefect.component';

// require('smartadmin-plugins/bower_components/datatables.net-colreorder-bs/css/colReorder.bootstrap.min.css');

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChildDefectComponent],
  exports: [ChildDefectComponent],
})
export class ChildDefectModule { }
