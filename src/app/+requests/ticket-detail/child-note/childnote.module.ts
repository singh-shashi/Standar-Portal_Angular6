import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildNoteComponent } from './childnote.component';
import { ReadMoreComponent } from '../../../shared/ReadMoreComponent.component';

// require('smartadmin-plugins/bower_components/datatables.net-colreorder-bs/css/colReorder.bootstrap.min.css');

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChildNoteComponent, ReadMoreComponent],
  exports: [ChildNoteComponent],
})
export class ChildNoteModule { }
