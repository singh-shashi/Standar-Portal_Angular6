import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChangePasswordRoutingModule} from './changepassword-routing.module';
import {ChangepasswordComponent} from './changepassword.component';
import {SmartadminLayoutModule} from "../../shared/layout/layout.module";
import {StatsModule} from "../../shared/stats/stats.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SmartadminLayoutModule,
    StatsModule,
    ChangePasswordRoutingModule,
    FormsModule
  ],
  declarations: [ChangepasswordComponent]
})
export class ChangePasswordModule {
}
