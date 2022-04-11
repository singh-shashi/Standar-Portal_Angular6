import {NgModule} from '@angular/core';
import {SmartadminModule} from '../shared/smartadmin.module'
import { CommonModule } from '@angular/common';
import { SmartadminDatatableModule } from '../shared/ui/datatable/smartadmin-datatable.module';
import { QuicklinkListComponent } from './quicklinks.component';
import { routing } from './quicklinks.routing';


@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    SmartadminDatatableModule,
    routing
  ],
  declarations: [QuicklinkListComponent],
  exports: [QuicklinkListComponent]
})
export class QuicklinksModule {

}
