import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonApiService } from '../../core/api/json-api.service';
import { AuthService } from '../../+auth/auth.service';
import { FadeInTop } from '../../shared/animations/fade-in-top.decorator';
import { Ticket } from '../../shared/models/ticket';
import { Router } from '@angular/router';
import { trigger, state, transition, animate, keyframes, style } from '../../../../node_modules/@angular/animations';

declare var $: any;

@FadeInTop()
@Component({
  selector: 'sa-soffrontdashboard',
  templateUrl: './myaccounttickets.component.html',
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
export class MyAccountTicketsComponent implements OnInit {
  public apiKey = '';
  public parentObjName = 'Account';
  public parentObjID: number;
  public objectStatus = '';
  public showDetail = false;
  public ticketSelected: any;
  public selectedFilter = 'All';
  public TicketInfoDet = '';
  @ViewChild('ticketlist') ticketlist: any;

  onShowDetail(val: boolean) {
    this.showDetail = val;
    if (!val) {
      this.TicketInfoDet = 'My Account Tickets';
      this.reloadDataTable();
    }
  }
  onSelectedTicket(val: Ticket) {
    this.ticketSelected = val;
    this.TicketInfoDet = 'Ticket #' + val.TicketID.toString();
  }
  constructor(public jsonApiService: JsonApiService, private authService: AuthService, private router: Router) {
    const loggedInUser = this.authService.LoggedInUser;
    this.parentObjID = loggedInUser.selectedAccount.AcctID;
  }
  ngOnInit() {
    this.apiKey = this.authService.ApiKey;
    this.TicketInfoDet = 'My Account Tickets';
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
}

