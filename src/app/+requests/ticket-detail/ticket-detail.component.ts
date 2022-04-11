import { Component, OnInit, Input, Output, EventEmitter, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { JsonApiService } from '../../core/api/json-api.service';
import { Ticket } from '../../shared/models/ticket';
import { TicketService } from '../../shared/services/tickets.service';
import { trigger, style, transition, animate, keyframes } from '../../../../node_modules/@angular/animations';
import { AuthService } from 'app/+auth/auth.service';
import { NotificationService } from 'app/shared/utils/notification.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  providers: [TicketService],
  styleUrls: [
    './ticket-detail.component.css'
  ],
  animations: [
    trigger('flyInOut', [
      transition('true => false', animate(50, keyframes([
        style({ opacity: 0, transform: 'translateX(100%)', offset: 0 }),
        style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
      ]))),
      transition('false <=> true', animate(400, keyframes([
        style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
        style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
      ])))
    ])
  ]
})
export class TicketDetailComponent implements OnInit, AfterViewChecked {
  @Input() ApiKey: string;
  @Input() JsonApiService: JsonApiService;
  @Input() TicketData: any;
  @Output() onSetHide = new EventEmitter<boolean>();
  @Input() ShowFirstRecordView = false;
  @Input() SelectedNoteID = null;
  dataLoaded = false;
  ShowChildAdd = false;
  ShowChildrenAside = false;
  ShowChildForm = false;
  public showAttach = false;
  public showNotes = false;
  public showDef = false;
  public showSeveritys = false;
  public OpenSurvey = false;
  ShowChildren = '';
  ShowChildrenTitle = '';
  ChildRecords = [];
  loadingChildren = false;
  loading = false;
  state: string;
  private ticketService: TicketService;
  get ticket_data(): Ticket {
    if (this.TicketData == null) {
      return new Ticket();
    } else {
      return (new Ticket()).deserialize(this.TicketData);
     
    }
  }
  constructor(private cdRef: ChangeDetectorRef, private authService: AuthService,
    private notificationService : NotificationService) {
    this.state = 'inactive'
  }

  public ngAfterViewChecked(): void {
    if (this.TicketData && this.SelectedNoteID && !this.dataLoaded) {     

      // this.loading = false;
      this.dataLoaded = true;
      window.scrollTo(0, 0);
      this.OpenChildren('NOTE', 'NOTES');
      this.cdRef.detectChanges();
    }
    if (this.TicketData){
    // if (this.JsonApiService.SFConfig.showSeverity && this.TicketData.Status.toUpperCase() === 'RESOLVED') {
    //   this.showSeveritys = true;
    // }
  }
  }

  ngOnInit() {
    this.ticketService = new TicketService(this.JsonApiService);
    this.state = 'active';

    if (this.JsonApiService.SFConfig.showAttachment) {
      this.showAttach = true;
    }
    if (this.JsonApiService.SFConfig.showNote) {
      this.showNotes = true;
    }
    if (this.JsonApiService.SFConfig.showDefect) {
      this.showDef = true;
    }
    if (this.ShowFirstRecordView) {
      this.loading = true;
    }
    // if (this.JsonApiService.SFConfig.showSeverity) {
    //   this.showSeveritys = true;
    // }
  }

  BacktoList() {
    this.ResetDetailView();
    this.ShowFirstRecordView = false;
    this.SelectedNoteID = null;
    this.onSetHide.emit(false);
  }

  testfun() {
    this.onSetHide.emit(false);
  }

  ResetDetailView() {
    this.ShowChildrenAside = false;
    this.ShowChildAdd = false;
    this.ShowChildForm = false;
    this.ShowChildren = '';
    this.ShowChildrenTitle = '';
  }

  OpenForm(formIdentifier: string, formTitle?: string) {
    this.ShowChildForm = true;

    if (formIdentifier === 'ADD') {
      this.ShowChildren = 'ADD' + this.ShowChildren;
      this.ShowChildrenTitle = 'Add ' + this.ShowChildrenTitle;
    }
    // else if(formIdentifier === 'TICKETREMARK'){
    //   if(this.ticket_data.Remark !== null && this.ticket_data.Remark !== undefined)
    //   {
    //         this.notificationService.soffrontalert('Feedback already done.');
    //         return false;
    //   }
    //   this.ShowChildren = formIdentifier;
    //   this.ShowChildrenTitle = formTitle;
    // }
     else {
      this.ShowChildren = formIdentifier;
      this.ShowChildrenTitle = formTitle;
    }
    this.ChildRecords = [];
    this.ShowChildAdd = false;
    this.ShowChildrenAside = true;
  }

  OpenChildren(childName: string, childTitle?: string) {// debugger;
    this.loadingChildren = true;
    this.ShowChildForm = false;
    this.ShowChildren = childName;
    this.ShowChildrenTitle = childTitle;
    this.ChildRecords = [];

    if (childName === 'NOTE' || childName === 'TRDOCMNT' || childName === 'DEFECT') {
      this.ShowChildAdd = true;
    } else {
      this.ShowChildAdd = false;
    }
    this.ShowChildrenAside = true;
    const ticketChildRecordDataCall = this.ticketService.getTicketChildren(this.ApiKey, this.ticket_data.TicketID, childName, ''
      , '', 1, 20, '', '')
      .subscribe((ticketChildRecordData) => {
        if (ticketChildRecordData.Object.RESULTS) {
          this.ChildRecords = ticketChildRecordData.Object.RESULTS;
          if (!this.SelectedNoteID || this.ShowChildren !== 'NOTE') {
            this.ChildRecords.map((r) => r._SelectedRecord = false)
          } else {
            this.ChildRecords.map((r) => r._SelectedRecord = r['FormId'] === this.SelectedNoteID)
          }
          this.loadingChildren = false;
          if (childName === 'TRDOCMNT') {
          sessionStorage.setItem('sAttachFiles', JSON.stringify(this.ChildRecords));
          }
          ticketChildRecordDataCall.unsubscribe();
        }
        this.loading = false;
      });
    // this.loadingChildren = false;
  }

  public searchKB() {
    if (this.JsonApiService.getSoffrontKBUrl() !== '') {
      if (this.ticket_data.Synopsis !== '') {
        const Recordata = {
          'e': btoa(this.authService.LoggedInUser.contact.email.toString()),
          'p': btoa(this.authService.LoggedInUser.contact.Pswd.toString()),
          't': this.ticket_data.Synopsis,
          'isSarch': true
        };
        this.JsonApiService.KbSearchpost(Recordata, '');
      }
    } else {
      this.notificationService.soffronterroralert('KMS not configured.');
      return false;
    }
  }
  getSurveyStaus(){
   
  }
}
