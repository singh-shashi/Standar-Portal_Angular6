import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NormalTablesRoutingModule } from './normal-tables-routing.module';
import { NormalTablesComponent } from "./normal-tables.component";
import {SmartadminModule} from "../../shared/smartadmin.module";

@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    NormalTablesRoutingModule
  ],
  declarations: [
    NormalTablesComponent
  ]
})
export class NormalTablesModule { }
