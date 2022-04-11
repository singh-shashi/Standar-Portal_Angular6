import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { JsonApiService } from '../../../core/api/json-api.service';
import { PortalUser } from '../../../shared/models/portaluser';
import { DataService } from '../../../shared/services/data.service';
import { Router } from '../../../../../node_modules/@angular/router';
import { strictEqual } from 'assert';
@Component({
  selector: 'app-latestcomments',
  templateUrl: './latestcomments.component.html',
  styleUrls: ['./latestcomments.component.css'],
  providers: [DashboardService]
})
export class LatestcommentsComponent implements OnInit {

  public apiKey = '';
  public commcols = [];
  public tickids = '';
  public parentObjID: number;
    public viewlist = '';


  @Input() ApiKey: string;
  @Input() JsonApiService: JsonApiService;
  @Input() LoggedInUser: PortalUser;

  private dashboardservice: DashboardService;

  public loading = false;

  constructor(private router: Router, private dataService: DataService) {

   }

  ngOnInit() {
    this.loading = true;
    this.parentObjID = this.LoggedInUser.selectedAccount.AcctID;
    this.dashboardservice = new DashboardService(this.JsonApiService);
    this.viewlist = 'FormID,Subject,Author,NoteDate,NoteText';
    const AlertRecordDataCall = this.dashboardservice.getlinkednotesrec(this.ApiKey, this.parentObjID
        , 5, this.viewlist).subscribe((AlertRecordData) => {
      // debugger;alert()
      this.commcols = AlertRecordData.Object.RESULTS;
      if (this.commcols !== undefined && this.commcols !== null && AlertRecordData.Object.RESULTS.length > 0) {
          this.commcols.forEach(noteRec => {
            noteRec.Subject = noteRec.Subject.replace(/(?:\r\n|\r|\n)/g, '<br>');
            noteRec.NoteText = noteRec.NoteText.replace(/(?:\r\n|\r|\n)/g, '<br>');
          });
    }
      this.loading = false;
      AlertRecordDataCall.unsubscribe();
    });
  }

  drillDown(parentid, id) {
    const labelText = 'Ticket #' + parentid;
    this.dataService.changeData(JSON.stringify({ 'Condition': 'TicketID = ' + parentid, 'ShowDetail': true, 'SelectedNoteID': id }));
    this.router.navigate(['/requests/drilldownrequests'], { queryParams: { SowdetailMsg: labelText } })
  }
}
