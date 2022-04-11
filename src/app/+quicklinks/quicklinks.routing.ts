import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import { QuicklinkListComponent } from './quicklinks.component';


export const routes: Routes = [
  {
    path: '', component: QuicklinkListComponent
  }
];

export const routing = RouterModule.forChild(routes);
