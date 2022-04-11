import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartadminModule } from '../../shared/smartadmin.module';
import { SmartadminDatatableModule } from '../../shared/ui/datatable/smartadmin-datatable.module';
import { ContactDetailComponent } from './contact-detail.component';
import { ChildShipitemModule } from './child-shipitem/child-shipitem.module';

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    SmartadminDatatableModule,
    ChildShipitemModule
  ],
  declarations: [ContactDetailComponent],
  exports: [ContactDetailComponent]
})
export class ContactDetailModule { }
