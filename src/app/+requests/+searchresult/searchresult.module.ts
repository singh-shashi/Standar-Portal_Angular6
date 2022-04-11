import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchresultRoutingModule } from './searchresult-routing.module';
import { SearchresultComponent } from './searchresult.component';
import { SmartadminModule } from '../../shared/smartadmin.module';
import { SmartadminDatatableModule } from '../../shared/ui/datatable/smartadmin-datatable.module';
import { TicketListModule } from '../ticket-list/ticket-list.module';
import { TicketDetailModule } from '../ticket-detail/ticket-detail.module';

@NgModule({
  imports: [
    CommonModule,
    SearchresultRoutingModule,
    SmartadminModule,
    SmartadminDatatableModule,
    TicketListModule,
    TicketDetailModule
  ],
  declarations: [SearchresultComponent]
})
export class SearchresultModule { }
