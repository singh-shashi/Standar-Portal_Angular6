import {NgModule} from '@angular/core';

import {SmartadminModule} from '../shared/smartadmin.module'

import {routing} from './defects.routing';


@NgModule({
  imports: [
    SmartadminModule,
    routing,
  ],
  declarations: [],
  providers: [],
})
export class DefectsModule {

}
