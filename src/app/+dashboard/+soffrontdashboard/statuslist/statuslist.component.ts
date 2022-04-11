import { Component, OnInit, Input } from '@angular/core';
import { JsonApiService } from '../../../core/api/json-api.service';
import { PortalUser } from '../../../shared/models/portaluser';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { AuthService } from '../../../+auth/auth.service';
import { Router } from '../../../../../node_modules/@angular/router';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-statuslist',
  templateUrl: './statuslist.component.html',
  styleUrls: ['./statuslist.component.css'],
  providers: [DashboardService]
})
export class StatuslistComponent implements OnInit {
  private dashboardservice: DashboardService;
  public loading = false;
  public show = false;
  public statuswisecount = [];
  public statcount = [];
  @Input() ApiKey: string;
  @Input() JsonApiService: JsonApiService;
  @Input() LoggedInUser: PortalUser;

  constructor(private authService: AuthService, private router: Router, private dataService: DataService) { }

  ngOnInit() {// debugger;
    // this.loading = true;
    this.loading = true;
    this.dashboardservice = new DashboardService(this.JsonApiService);

    const ticketStatusQueryConfig = this.JsonApiService.getTicketStatusQueryConfig();

    const findTopLinkRec1 = {
      OBJECTNAME: 'Account',
      RECORDID: this.authService.LoggedInUser.selectedAccount.AcctID,
      CHILDOBJECTNAME: 'Ticket',
      WHERECONDITION: 'enduser=\'' + this.authService.LoggedInUser.contact.FullName +
        '\' and STATUS IN ' + '(\'' + ticketStatusQueryConfig.closedStatus.replace(/,/gi, '\',\'') + '\')'
    }

    const findTopLinkRec2 = {
      OBJECTNAME: 'Account',
      RECORDID: this.authService.LoggedInUser.selectedAccount.AcctID,
      CHILDOBJECTNAME: 'Ticket',
      WHERECONDITION: 'enduser=\'' + this.authService.LoggedInUser.contact.FullName +
        '\' and STATUS IN ' + '(\'' + ticketStatusQueryConfig.openStatus.replace(/,/gi, '\',\'') + '\')'
    }
    const findTopLinkRec3 = {
      OBJECTNAME: 'Account',
      RECORDID: this.authService.LoggedInUser.selectedAccount.AcctID,
      CHILDOBJECTNAME: 'Ticket',
      WHERECONDITION: 'enduser=\'' + this.authService.LoggedInUser.contact.FullName +
        '\' and STATUS IN ' + '(\'' + ticketStatusQueryConfig.waitingCustomerReplyStatus.replace(/,/gi, '\',\'') + '\')'
    }
    const findTopLinkRec4 = {
      OBJECTNAME: 'Account',
      RECORDID: this.authService.LoggedInUser.selectedAccount.AcctID,
      CHILDOBJECTNAME: 'Ticket',
      WHERECONDITION: 'enduser=\'' + this.authService.LoggedInUser.contact.FullName + '\' and STATUS IN ' +
      '(\'' + ticketStatusQueryConfig.resolvedStatus.replace(/,/gi, '\',\'') + '\')'
    }

    const findTopLinkRec5 = {
      OBJECTNAME: 'Account',
      RECORDID: this.authService.LoggedInUser.selectedAccount.AcctID,
      CHILDOBJECTNAME: 'Ticket',
      WHERECONDITION: 'enduser=\'' + this.authService.LoggedInUser.contact.FullName + '\' and STATUS IN ' +
        '(\'' + ticketStatusQueryConfig.defectStatus.replace(/,/gi, '\',\'') + '\')'
    }

    this.statuswisecount = [findTopLinkRec1, findTopLinkRec2, findTopLinkRec3, findTopLinkRec4, findTopLinkRec5];

    const getstatuslistcountdata = this.dashboardservice.getstatuslistcount(this.ApiKey,
      this.statuswisecount).subscribe((countstatusData) => {
        // debugger;
        this.statcount = countstatusData.Object;
        this.loading = false;
        getstatuslistcountdata.unsubscribe();
      });
  }
  drillDownRequests(index: number, labelText: string) {
    const whrCond = this.statuswisecount[index].WHERECONDITION;
    this.dataService.changeData(JSON.stringify({ 'Condition': whrCond, 'ShowDetail': false, 'SelectedNoteID': null }));
    this.router.navigate(['/requests/drilldownrequests'], { queryParams: { SowdetailMsg: labelText } })
  }
}
