import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNoteComponent } from './add-note.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [AddNoteComponent],
  exports: [AddNoteComponent]
})
export class AddNoteModule { }
