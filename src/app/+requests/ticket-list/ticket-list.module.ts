import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartadminModule } from '../../shared/smartadmin.module';
import { SmartadminDatatableModule } from '../../shared/ui/datatable/smartadmin-datatable.module';
import { TicketListComponent } from './ticket-list.component';

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    SmartadminDatatableModule
  ],
  declarations: [TicketListComponent],
  exports: [
    TicketListComponent
  ]
})
export class TicketListModule { }
