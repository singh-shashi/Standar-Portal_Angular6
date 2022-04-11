import {NgModule} from "@angular/core";

import {routing} from "./app-views.routing";
import {SmartadminModule} from "../shared/smartadmin.module";
// import { ChangepasswordComponent } from './changepassword/changepassword.component';

@NgModule({
  declarations: [],//ChangepasswordComponent
  imports: [
    SmartadminModule,
    routing,

  ],
  entryComponents: []
})
export class AppViewsModule {
}
