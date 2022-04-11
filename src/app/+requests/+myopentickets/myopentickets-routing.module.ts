import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyOpenTicketsComponent} from './myopentickets.component';

const routes: Routes = [{
  path: '',
  component: MyOpenTicketsComponent,
  data: {pageTitle: 'My Open Tickets'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MyOpenTicketsRoutingModule { }
