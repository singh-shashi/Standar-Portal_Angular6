import {ModuleWithProviders} from '@angular/core'
import {Routes, RouterModule} from '@angular/router';


export const routes: Routes = [
  {
    path: '', redirectTo: 'opendefects', pathMatch: 'full'
  },
  {
    path: 'opendefects',
    loadChildren: './+opendefects/opendefects.module#OpenDefectsModule',
  }
];

export const routing = RouterModule.forChild(routes);
