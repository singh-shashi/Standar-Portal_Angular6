import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartadminModule } from '../../shared/smartadmin.module';
import { SmartadminDatatableModule } from '../../shared/ui/datatable/smartadmin-datatable.module';
import { TicketListModule } from '../ticket-list/ticket-list.module';
import { TicketDetailModule } from '../ticket-detail/ticket-detail.module';
import { DrillDownTicketComponent } from './drilldown.component';
import { DrillDownTicketRoutingModule } from './drilldown-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DrillDownTicketRoutingModule,
    SmartadminModule,
    SmartadminDatatableModule,
    TicketListModule,
    TicketDetailModule
  ],
  declarations: [DrillDownTicketComponent]
})
export class DrillDownTicketModule { }
