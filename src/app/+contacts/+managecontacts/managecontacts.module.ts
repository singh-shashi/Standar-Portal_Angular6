import { ContactAddModule } from '../contact-add/contact-add.module';
import { ContactDetailModule } from '../contact-detail/contact-detail.module';
import { ContactListModule } from '../contact-list/contact-list.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SmartadminModule} from '../../shared/smartadmin.module';
import { SmartadminDatatableModule } from '../../shared/ui/datatable/smartadmin-datatable.module';
import { ManageContactsComponent } from './managecontacts.component';
import { ManageContactsRoutingModule } from './managecontacts-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ManageContactsRoutingModule,
    SmartadminModule,
    SmartadminDatatableModule,
    ContactListModule,
    ContactDetailModule,
    ContactAddModule
  ],
  declarations: [ManageContactsComponent]
})
export class ManageContactsModule { }
