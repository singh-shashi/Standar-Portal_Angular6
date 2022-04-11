import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageContactsComponent } from './managecontacts.component';

const routes: Routes = [{
  path: '',
  component: ManageContactsComponent,
  data: {pageTitle: 'Manage Contacts'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ManageContactsRoutingModule { }
