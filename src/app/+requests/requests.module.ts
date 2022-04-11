import {NgModule} from '@angular/core';

import {SmartadminModule} from '../shared/smartadmin.module'

import {routing} from './requests.routing';


@NgModule({
  imports: [
    SmartadminModule,
    routing,
  ],
  declarations: [],
  providers: [],
})
export class RequestsModule {

}
