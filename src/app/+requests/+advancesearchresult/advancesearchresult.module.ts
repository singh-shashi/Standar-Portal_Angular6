import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartadminModule } from '../../shared/smartadmin.module';
import { SmartadminDatatableModule } from '../../shared/ui/datatable/smartadmin-datatable.module';
import { TicketListModule } from '../ticket-list/ticket-list.module';
import { TicketDetailModule } from '../ticket-detail/ticket-detail.module';
import { AdvancesearchresultComponent } from './advancesearchresult.component';
import { AdvancesearchresultRoutingModule } from './advancesearchresult-routing.module';
import { SmartadminInputModule } from '../../shared/forms/input/smartadmin-input.module';

@NgModule({
  imports: [
    CommonModule,
    AdvancesearchresultRoutingModule,
    SmartadminModule,
    SmartadminInputModule,
    SmartadminDatatableModule,
    TicketListModule,
    TicketDetailModule
  ],
  declarations: [AdvancesearchresultComponent]
})
export class AdvancesearchresultModule { }
