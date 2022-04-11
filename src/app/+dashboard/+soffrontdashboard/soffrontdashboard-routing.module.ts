import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SoffrontDashboardComponent} from './soffrontdashboard.component';

const routes: Routes = [{
  path: '',
  component: SoffrontDashboardComponent,
  data: {pageTitle: 'Soffront Dashboard'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SoffrontDashboardRoutingModule { }
