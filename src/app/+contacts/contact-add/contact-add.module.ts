import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactAddComponent } from './contact-add.component';
import { SmartadminModule } from '../../shared/smartadmin.module';
import { SmartadminDatatableModule } from '../../shared/ui/datatable/smartadmin-datatable.module';

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    SmartadminDatatableModule
  ],
  declarations: [ContactAddComponent],
  exports: [ContactAddComponent]
})
export class ContactAddModule { }
