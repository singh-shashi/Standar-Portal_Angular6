import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { JsonApiService } from '../../../core/api/json-api.service';
import { PortalUser } from '../../../shared/models/portaluser';

@Component({
  selector: 'app-latestannouncement',
  templateUrl: './latestannouncement.component.html',
  styleUrls: ['./latestannouncement.component.css'],
  providers: [DashboardService]
})
export class LatestannouncementComponent implements OnInit {

  public apiKey = '';
  public ancecols = [];
  public wherecondition = 'url=\'Announcements\'';
  @Input() ApiKey: string;
  @Input() JsonApiService: JsonApiService;
  @Input() LoggedInUser: PortalUser;

  public loading = false;

  private   dashboardservice: DashboardService;
  constructor() { }
  ngOnInit() {
  // debugger;
    this.loading = true;
    this.dashboardservice = new DashboardService(this.JsonApiService);
    const AlertRecordDataCall = this.dashboardservice.publicgetalerts(this.ApiKey, this.wherecondition).subscribe((AlertRecordData) => {
      // debugger;
      if (AlertRecordData.ErrorCode <= 0) {
        this.ancecols = AlertRecordData.Object.RESULTS.map((a) => {
          a.Details = a.Details.replace(/\r\n/gi, '<br/>').replace(/\n\r/gi, '<br/>').replace(/\n/gi, '<br/>');
          return a;
        });
      }
      this.loading = false;
      AlertRecordDataCall.unsubscribe();
    });
  }
}
