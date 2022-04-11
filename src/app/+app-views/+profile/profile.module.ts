import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {SmartadminLayoutModule} from "../../shared/layout/layout.module";
import {StatsModule} from "../../shared/stats/stats.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SmartadminLayoutModule,
    StatsModule,
    ProfileRoutingModule,
    FormsModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule {
}
