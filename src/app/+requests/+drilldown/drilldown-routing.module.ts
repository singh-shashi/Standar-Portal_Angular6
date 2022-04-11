import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrillDownTicketComponent } from './drilldown.component';

const routes: Routes = [{
  path: '',
  component: DrillDownTicketComponent,
  data: {pageTitle: 'Requests'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrillDownTicketRoutingModule { }
