import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketAddComponent } from './ticketAdd.component';
import { SmartadminModule } from '../../shared/smartadmin.module';
import { SmartadminDatatableModule } from '../../shared/ui/datatable/smartadmin-datatable.module';

@NgModule({
  imports: [
    CommonModule,
     SmartadminModule,
     SmartadminDatatableModule
  ],
  declarations: [TicketAddComponent],
  exports: [TicketAddComponent]
})


export class TicketAddModule { }
