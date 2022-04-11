import {ModuleWithProviders} from '@angular/core'
import {Routes, RouterModule} from '@angular/router';


export const routes: Routes = [
  {
    path: '', redirectTo: 'managecontacts', pathMatch: 'full'
  },
  {
    path: 'managecontacts',
    loadChildren: './+managecontacts/managecontacts.module#ManageContactsModule',
  }
];

export const routing = RouterModule.forChild(routes);
