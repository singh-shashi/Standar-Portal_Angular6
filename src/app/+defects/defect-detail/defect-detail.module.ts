import { ChildContactModule } from './child-contact/child-contact.module';
import { DefectDetailComponent } from './defect-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartadminModule } from '../../shared/smartadmin.module';
import { SmartadminDatatableModule } from '../../shared/ui/datatable/smartadmin-datatable.module';

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    SmartadminDatatableModule,
    ChildContactModule
  ],
  declarations: [DefectDetailComponent],
  exports: [DefectDetailComponent]
})
export class DefectDetailModule { }
