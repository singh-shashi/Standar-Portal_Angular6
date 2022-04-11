import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SmartadminModule} from '../../shared/smartadmin.module';
import { SmartadminDatatableModule } from '../../shared/ui/datatable/smartadmin-datatable.module';
import { DefectListComponent } from './defect-list.component';

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    SmartadminDatatableModule
  ],
  declarations: [DefectListComponent],
  exports: [DefectListComponent]
})
export class DefectListModule { }
