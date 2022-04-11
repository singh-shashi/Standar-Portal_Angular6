import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestsWaitingVerificationComponent } from './requestswaitingverification.component';

const routes: Routes = [{
  path: '',
  component: RequestsWaitingVerificationComponent,
  data: {pageTitle: 'Requests Waiting Verification'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RequestsWaitingVerificationRoutingModule { }
