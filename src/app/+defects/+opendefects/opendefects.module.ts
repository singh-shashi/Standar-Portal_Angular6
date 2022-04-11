import { DefectAddModule } from '../defect-add/defect-add.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenDefectsRoutingModule } from './opendefects-routing.module';
import { OpenDefectsComponent } from './opendefects.component';

import {SmartadminModule} from '../../shared/smartadmin.module';
import { SmartadminDatatableModule } from '../../shared/ui/datatable/smartadmin-datatable.module';
import { DefectListModule } from '../defect-list/defect-list.module';
import { DefectDetailModule } from '../defect-detail/defect-detail.module';

@NgModule({
  imports: [
    CommonModule,
    OpenDefectsRoutingModule,
    SmartadminModule,
    SmartadminDatatableModule,
    DefectListModule,
    DefectDetailModule,
    DefectAddModule
  ],
  declarations: [OpenDefectsComponent]
})
export class OpenDefectsModule { }
