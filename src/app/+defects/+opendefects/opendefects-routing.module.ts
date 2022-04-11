import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenDefectsComponent } from './opendefects.component';

const routes: Routes = [{
  path: '',
  component: OpenDefectsComponent,
  data: {pageTitle: 'Open Defects'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OpenDefectsRoutingModule { }
