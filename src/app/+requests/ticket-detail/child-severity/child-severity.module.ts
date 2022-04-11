import { ChildSeverityComponent } from './child-severity.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
      CommonModule, FormsModule
    ],
    declarations: [ChildSeverityComponent],
    exports: [ChildSeverityComponent]
  })

  export class ChildSeverityModule { }