import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestsaWaitingReplyComponent } from './requestsawaitingreply.component';

const routes: Routes = [{
  path: '',
  component: RequestsaWaitingReplyComponent,
  data: {pageTitle: 'Requests Awaiting Reply'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RequestsAwaitingReplyRoutingModule { }
