import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefectAddComponent } from './defect-add.component';
import { SmartadminModule } from '../../shared/smartadmin.module';
import { SmartadminDatatableModule } from '../../shared/ui/datatable/smartadmin-datatable.module';

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    SmartadminDatatableModule
  ],
  declarations: [DefectAddComponent],
  exports: [DefectAddComponent]
})
export class DefectAddModule { }
