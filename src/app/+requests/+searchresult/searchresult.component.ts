import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonApiService } from '../../core/api/json-api.service';
import { AuthService } from '../../+auth/auth.service';
import { Ticket } from '../../shared/models/ticket';
import { FadeInTop } from '../../shared/animations/fade-in-top.decorator';
import { DataService } from '../../shared/services/data.service';
import { trigger, state, transition, animate, keyframes, style } from '../../../../node_modules/@angular/animations';

declare var $: any;

@FadeInTop()
@Component({
  selector: 'sa-soffrontdashboard',
  templateUrl: './searchresult.component.html',
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
export class SearchresultComponent implements OnInit {
  public apiKey: string;
  public parentObjName = 'Account';
  public parentObjID: number;
  public searchtext: string;
  public searchCondition = '';
  public widgetcolumns = [];
  public TicketInfoDet = '';
  public showAttachments = false;
  @ViewChild('ticketlist') ticketlist: any;
  public showDetail = false;
  public ticketSelected: any;

  onShowDetail(val: boolean) {
    this.showDetail = val;
    if (!val) {
      this.TicketInfoDet = 'Search Results';
      this.reloadDataTable();
    }
  }
  onSelectedTicket(val: Ticket) {
    this.ticketSelected = val;
    this.TicketInfoDet = 'Ticket #' + val.TicketID.toString();
  }
  constructor(private route: ActivatedRoute, public jsonApiService: JsonApiService,
     private authService: AuthService, private dataService: DataService) {
    const loggedInUser = this.authService.LoggedInUser;
    this.parentObjID = loggedInUser.selectedAccount.AcctID;
  }
  ngOnInit() {
    this.apiKey = this.authService.ApiKey;
    this.dataService.currentData.subscribe(d => {
      this.searchtext = d.search;
    })
    this.searchCondition = 'Ticket.FormId in (' + this.searchtext + ')';
    this.TicketInfoDet = 'Search Results';
  }
  reloadDataTable() {
    this.ticketlist.Reloaddatatable();
  }
}
