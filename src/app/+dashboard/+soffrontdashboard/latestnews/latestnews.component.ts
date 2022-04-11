import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { JsonApiService } from '../../../core/api/json-api.service';
import { PortalUser } from '../../../shared/models/portaluser';
import { trigger, style, transition, animate, state, keyframes } from '../../../../../node_modules/@angular/animations';


@Component({
  selector: 'app-latestnews',
  templateUrl: './latestnews.component.html',
  styleUrls: ['./latestnews.component.css'],
  providers: [DashboardService],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(200, keyframes([
          style({opacity: 0, transform: 'translateY(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(200, keyframes([
          style({opacity: 1, transform: 'translateY(0)',     offset: 0}),
          style({opacity: 0, transform: 'translateY(100%)',  offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class LatestnewsComponent implements OnInit {

  public newscols = [];
  public wherecondition = 'url=\'News\'';
  @Input() ApiKey: string;
  @Input() JsonApiService: JsonApiService;
  @Input() LoggedInUser: PortalUser;

  private   dashboardservice: DashboardService;

  public loading = false;
  constructor() { }

  ngOnInit() {
    this.loading = true;
    this.dashboardservice = new DashboardService(this.JsonApiService);
    const AlertRecordDataCall = this.dashboardservice.publicgetalerts(this.ApiKey, this.wherecondition).subscribe((AlertRecordData) => {
      // debugger;
      this.newscols = AlertRecordData.Object.RESULTS;
      this.loading = false;
      AlertRecordDataCall.unsubscribe();
    });
  }
}






