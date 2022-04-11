import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SmartadminModule} from '../../shared/smartadmin.module';
import { SmartadminDatatableModule } from '../../shared/ui/datatable/smartadmin-datatable.module';
import { RequestsWaitingVerificationComponent } from './requestswaitingverification.component';
import { RequestsWaitingVerificationRoutingModule } from './requestswaitingverification-routing.module';
import { TicketListModule } from '../ticket-list/ticket-list.module';
import { TicketDetailModule } from '../ticket-detail/ticket-detail.module';


@NgModule({
  imports: [
    CommonModule,
    RequestsWaitingVerificationRoutingModule,
    SmartadminModule,
    SmartadminDatatableModule,
    TicketListModule,
    TicketDetailModule
  ],
  declarations: [RequestsWaitingVerificationComponent]
})
export class RequestsWaitingVerificationModule { }
