import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonApiService } from '../../core/api/json-api.service';
import { PortalUser } from '../../shared/models/portaluser';
import { AuthService } from '../../+auth/auth.service';
import { Ticket } from '../../shared/models/ticket';
import { FadeInTop } from '../../shared/animations/fade-in-top.decorator';
import { DataService } from '../../shared/services/data.service';
import { trigger, state, transition, animate, keyframes, style } from '../../../../node_modules/@angular/animations';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@FadeInTop()
@Component({
  selector: 'sa-soffrontdashboard',
  templateUrl: './drilldown.component.html',
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
export class DrillDownTicketComponent implements OnInit {
  public apiKey: string;
  public parentObjName = 'Account';
  public parentObjID: number;
  public searchCondition = '';
  public widgetcolumns = [];
  @ViewChild('ticketlist') ticketlist: any;
  public showDetail = false;
  public showRef = false;
  public flagDet = false;
  public selectedNoteID = null;
  public ticketSelected: any;
  public ShowDetailValMsg: any;

  onShowDetail(val: boolean) {
    this.showDetail = val;
    this.flagDet = true;
    this.showRef = false;
    if (!val) {
      this.reloadDataTable();
      this.flagDet = false;
      this.ShowDetailValMsg = 'Open Tickets';
    }
  }
  onSelecteddrillTicket(val: Ticket) {
    this.ticketSelected = val;
    if (this.flagDet) {
      this.ShowDetailValMsg = 'Ticket #' + val.TicketID.toString();
      this.showRef = true;
    } else {
      this.showRef = false;
      this.route.queryParams.subscribe(params => {
        this.ShowDetailValMsg = params['SowdetailMsg'];
    });
    }
  }
  constructor(public jsonApiService: JsonApiService, private authService: AuthService,
    private dataService: DataService, private route: ActivatedRoute) {
    // const loggedInUser = (new PortalUser()).deserialize(JSON.parse(sessionStorage.getItem('loggedInUser')));
    // this.parentObjID = loggedInUser.selectedAccount.AcctID;
    this.parentObjID = this.authService.LoggedInUser.selectedAccount.AcctID

    this.route.queryParams.subscribe(params => {
      this.ShowDetailValMsg = params['SowdetailMsg'];
  });
  }
  ngOnInit() {
    $('body').removeClass('nooverflow');
    this.apiKey = this.authService.ApiKey;
    this.dataService.currentData.subscribe(d => {
      this.searchCondition = d.search;
      this.showDetail = d.detail;
      this.selectedNoteID = d.note
    })
  }
  reloadDataTable() {
    this.ticketlist.Reloaddatatable();
  }
}
