import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountTicketsRoutingModule } from './myaccounttickets-routing.module';
import { MyAccountTicketsComponent } from './myaccounttickets.component';

import {SmartadminModule} from '../../shared/smartadmin.module';
import { SmartadminDatatableModule } from '../../shared/ui/datatable/smartadmin-datatable.module';
import { TicketListModule } from '../ticket-list/ticket-list.module';
import { TicketDetailModule } from '../ticket-detail/ticket-detail.module';


@NgModule({
  imports: [
    CommonModule,
    MyAccountTicketsRoutingModule,
    SmartadminModule,
    SmartadminDatatableModule,
    TicketListModule,
    TicketDetailModule
  ],
  declarations: [MyAccountTicketsComponent]
})
export class MyAccountTicketsModule { }
