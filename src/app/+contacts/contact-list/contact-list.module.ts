import { ContactListComponent } from './contact-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartadminModule } from '../../shared/smartadmin.module';
import { SmartadminDatatableModule } from '../../shared/ui/datatable/smartadmin-datatable.module';

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    SmartadminDatatableModule
  ],
  declarations: [ContactListComponent],
  exports: [ContactListComponent]
})
export class ContactListModule { }
