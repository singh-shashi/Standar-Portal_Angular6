import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SmartadminModule} from '../../shared/smartadmin.module';
import { SmartadminDatatableModule } from '../../shared/ui/datatable/smartadmin-datatable.module';
import { RequestsAwaitingReplyRoutingModule } from './requestsawaitingreply-routing.module';
import { RequestsaWaitingReplyComponent } from './requestsawaitingreply.component';
import { TicketListModule } from '../ticket-list/ticket-list.module';
import { TicketDetailModule } from '../ticket-detail/ticket-detail.module';


@NgModule({
  imports: [
    CommonModule,
    RequestsAwaitingReplyRoutingModule,
    SmartadminModule,
    SmartadminDatatableModule,
    TicketListModule,
    TicketDetailModule
  ],
  declarations: [RequestsaWaitingReplyComponent]
})
export class RequestsAwaitingReplyModule { }
