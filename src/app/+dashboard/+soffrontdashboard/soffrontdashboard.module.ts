import { SubmitformComponent } from './SubmitForm/Submitform.component';
import { QueryEngineComponent } from './QueryWidget/QueryEngine.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoffrontDashboardRoutingModule } from './soffrontdashboard-routing.module';
import { SoffrontDashboardComponent } from './soffrontdashboard.component';

import {SmartadminModule} from '../../shared/smartadmin.module';
import { SmartadminDatatableModule } from '../../shared/ui/datatable/smartadmin-datatable.module';
import { LatestnewsComponent } from './latestnews/latestnews.component';
import { LatestannouncementComponent } from './latestannouncement/latestannouncement.component';
import { StatuslistComponent } from './statuslist/statuslist.component';
import { SubmitTicketComponent } from './submit-ticket/submit-ticket.component';
import { LatestcommentsComponent } from './latestcomments/latestcomments.component';
import { KnowladgeSearchComponent } from './KnowladgeSearch/KnowladgeSearch.component';
import { alldocumentComponent } from './alldocument/alldocument.component';


@NgModule({
  imports: [
    CommonModule,
    SoffrontDashboardRoutingModule,
    SmartadminModule,
    SmartadminDatatableModule
  ],
  declarations: [SoffrontDashboardComponent, LatestnewsComponent, LatestannouncementComponent,
     LatestcommentsComponent,     StatuslistComponent, SubmitTicketComponent,
     QueryEngineComponent, SubmitformComponent, KnowladgeSearchComponent, alldocumentComponent],
     entryComponents: [QueryEngineComponent]
})
export class SoffrontDashboardModule { }
