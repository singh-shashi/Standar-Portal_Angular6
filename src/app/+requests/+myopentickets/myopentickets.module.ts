import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOpenTicketsRoutingModule } from './myopentickets-routing.module';
import { MyOpenTicketsComponent } from './myopentickets.component';
import {SmartadminModule} from '../../shared/smartadmin.module';
import { SmartadminDatatableModule } from '../../shared/ui/datatable/smartadmin-datatable.module';
import { TicketListModule } from '../ticket-list/ticket-list.module';
import { TicketDetailModule } from '../ticket-detail/ticket-detail.module';
import { TicketAddModule } from '../ticketAdd/ticketAdd.module';

@NgModule({
  imports: [
    CommonModule,
    MyOpenTicketsRoutingModule,
    SmartadminModule,
    SmartadminDatatableModule,
    TicketListModule,
    TicketDetailModule,
    TicketAddModule
  ],
  declarations: [MyOpenTicketsComponent]
})
export class MyOpenTicketsModule { }
