import { CloseticketComponent } from './closeticket.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
      CommonModule, FormsModule
    ],
    declarations: [CloseticketComponent],
    exports: [CloseticketComponent]
  })

  export class CloseticketModule { }