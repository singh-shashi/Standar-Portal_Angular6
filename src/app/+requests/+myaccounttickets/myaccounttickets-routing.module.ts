import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyAccountTicketsComponent} from './myaccounttickets.component';

const routes: Routes = [{
  path: '',
  component: MyAccountTicketsComponent,
  data: {pageTitle: 'My Account Tickets'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MyAccountTicketsRoutingModule { }
