import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonApiService } from '../../core/api/json-api.service';
import { AuthService } from '../../+auth/auth.service';
import { FadeInTop } from '../../shared/animations/fade-in-top.decorator';

import { Ticket } from '../../shared/models/ticket';
import { Router } from '@angular/router';
import { trigger, state, transition, animate, keyframes, style } from '../../../../node_modules/@angular/animations';
import { TicketService } from '../../shared/services/tickets.service';

declare var $: any;

@FadeInTop()
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sa-soffrontdashboard',
  templateUrl: './myopentickets.component.html',
  styleUrls: ['./myopentickets.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        animate(100, keyframes([
          style({ opacity: 0, transform: 'translateY(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
        ]))
      ]),
      transition('* => void', [
        animate(100, keyframes([
          style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
          style({ opacity: 0, transform: 'translateY(100%)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class MyOpenTicketsComponent implements OnInit {
  public apiKey = '';
  public parentObjName = 'Account';
  public parentObjID: number;
  public objectStatus = 'not in (\'Closed\')';
  public showDetail = false;
  public ticketSelected: any;
  public selectedFilter = 'All';
  public isSubObjectOpen = false;
  private ticketService: TicketService;
  public linkedattachments: any;
  public showAttachments = false;
  public searchCondition = '';
  public TicketInfoDet = '';
  public addTicketForm = false;
  public ShowAddTicket = false;
  @ViewChild('ticketlist') ticketlist: any;

  onShowDetail(val: boolean) {
    this.showAttachments = false;   
    this.showDetail = val;
    if (!val) {
      this.ShowAddTicket = true;
      this.TicketInfoDet = 'My Open Tickets';
      this.reloadDataTable();
    }
  }

  onSelectedTicket(val: Ticket) {
    if (!this.showDetail) {
      this.LoadChildAttachments(val.TicketID)
    }
    this.TicketInfoDet = 'Ticket #' + val.TicketID.toString();
    this.ticketSelected = val;
    this.ShowAddTicket = false;
  }
  constructor(public jsonApiService: JsonApiService, private authService: AuthService, private router: Router) {
    const loggedInUser = this.authService.LoggedInUser;
    this.parentObjID = loggedInUser.selectedAccount.AcctID;
    this.searchCondition = 'Ticket.EndUser = \'' + this.authService.LoggedInUser.contact.FullName + '\'';
  }

  ngOnInit() {
    this.apiKey = this.authService.ApiKey;
    this.ShowAddTicket = true;
    this.TicketInfoDet = 'My Open Tickets';
    this.ticketService = new TicketService(this.jsonApiService);
  }
  runLast() {
    // import jarvisWidgetsDefaults from  '../widget.defaults';
  }
  reloadDataTable() {
    this.ticketlist.Reloaddatatable();
  }
  public onSearchViewListChange(view: string) {
    this.selectedFilter = view;
  }
  OpenSearchForm() {
    this.router.navigate(['/requests/advancesearchrequest', this.selectedFilter]);
  }

  LoadChildAttachments(ticketId) {
    const ticketChildRecordDataCall = this.ticketService.getTicketChildren(this.apiKey, ticketId, 'TRDOCMNT', ''
    , '', 1, 20, '', '')
    .subscribe((ticketChildRecordData) => {
      if (ticketChildRecordData.Object.RESULTS) {
        this.linkedattachments = ticketChildRecordData.Object.RESULTS;
        this.showAttachments = true;
      }
    });
  }
   OpenTicketForm() {
      this.addTicketForm = !this.addTicketForm;
      this.TicketInfoDet = 'Add Tickets';
      this.ShowAddTicket = false;
  }
  onHideTicketAddForm(val: boolean)
  {
    this.addTicketForm = val;
    if (!val) {
      this.ShowAddTicket = true;
       this.TicketInfoDet = 'My Open Tickets';
      this.reloadDataTable();
    }
  }
}


