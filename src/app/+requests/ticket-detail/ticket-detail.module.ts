import { CloseticketModule } from './closeticket/closeticket.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartadminModule } from '../../shared/smartadmin.module';
import { SmartadminDatatableModule } from '../../shared/ui/datatable/smartadmin-datatable.module';
import { TicketDetailComponent } from './ticket-detail.component';
import { ChildNoteModule } from './child-note/childnote.module';
import { ChildAttachmentModule } from './child-attachment/childattachment.module';
import { ChildDefectModule } from './child-defect/childdefect.module';
import { ChildWatchbyModule } from './child-watchby/child-watchby.module';
import { AddNoteModule } from './add-note/add-note.module';
import { ChildAudittrailModule } from './child-audittrail/child-audittrail.module';
import { AddAttachmentModule } from './add-attachment/add-attachment.module';
import { AddDefectModule } from './add-defect/add-defect.module';
import { ChildSeverityModule } from './child-severity/child-severity.module';



@NgModule({
  imports: [
    CommonModule,
    SmartadminModule,
    SmartadminDatatableModule,
    ChildNoteModule,
    ChildAttachmentModule,
    ChildDefectModule,
    ChildWatchbyModule,
    AddNoteModule,
    ChildAudittrailModule,
    CloseticketModule,
    AddAttachmentModule,
    AddDefectModule,
    ChildSeverityModule
  ],
  declarations: [TicketDetailComponent],
  exports: [
    TicketDetailComponent
  ]
})
export class TicketDetailModule { }
