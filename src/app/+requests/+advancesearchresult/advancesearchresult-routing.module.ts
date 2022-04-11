import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvancesearchresultComponent } from './advancesearchresult.component';

const routes: Routes = [{
    path: '',
    component: AdvancesearchresultComponent,
    data: {pageTitle: 'Requests'}
  }];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdvancesearchresultRoutingModule { }