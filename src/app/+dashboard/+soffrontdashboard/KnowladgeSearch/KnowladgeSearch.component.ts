import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { JsonApiService } from '../../../core/api/json-api.service';
import { PortalUser } from '../../../shared/models/portaluser';
import { trigger, style, transition, animate, state, keyframes } from '@angular/animations';
import { AuthService } from '../../../+auth/auth.service';
import { NotificationService } from 'app/shared/utils/notification.service';

export interface PeriodicElement {
  FormId: number;
  Status: String;
  Synopsis: string;
  GroupName: string;
  CallTime: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { FormId: 1, Status: 'OPEN', Synopsis: 'TEST...', GroupName: 'HRSS', CallTime: '13-12-1990' },
  { FormId: 2, Status: 'CLOSE', Synopsis: 'TEST...', GroupName: 'HRSS', CallTime: '13-12-1992' },
  { FormId: 3, Status: 'Hydrogen', Synopsis: 'TEST...', GroupName: 'HRSS', CallTime: '13-12-1995' },
];
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-KnowladgeSearch',
  templateUrl: './KnowladgeSearch.component.html',
  styleUrls: ['./KnowladgeSearch.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        animate(200, keyframes([
          style({ opacity: 0, transform: 'translateY(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
        ]))
      ]),
      transition('* => void', [
        animate(200, keyframes([
          style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
          style({ opacity: 0, transform: 'translateY(100%)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class KnowladgeSearchComponent implements OnInit {
  // Formid,GroupName,Status,Synopsis,CallTime
  displayedColumns: string[] = ['Title'];
  dataSource = ELEMENT_DATA;
  public TicketDetrails = [];
  public AttachData = [];
  public downloadUrl;
  public wherecondition = '';
  public sortBy = 'FormId';
  public sortOrder = 'DESC';
  @Input() ApiKey: string;
  @Input() JsonApiService: JsonApiService;
  @Input() LoggedInUser: PortalUser;
  public searchstring: any;
  private dashboardservice: DashboardService;

  public loading = false;
  selectedRowIndex: any;
  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService, private notificationService: NotificationService) { }

  ngOnInit() {
    if (!this.auth.IsLoggedIn) {
      this.auth.logout();
      this.router.navigate(['/auth/login']);
    }

    sessionStorage.setItem('sTicketDetData', null);
    this.dashboardservice = new DashboardService(this.JsonApiService);
    this.selectedRowIndex = 0;
    this.TicketDetrails = [];
  }

  public searchKB(searchtext: string) {
    if (this.JsonApiService.getSoffrontKBUrl() !== '') {
      if (searchtext !== '') {
        this.searchstring = searchtext.toString().trim();
        const Recordata = {
          'e': btoa(this.LoggedInUser.contact.email.toString()),
          'p': btoa(this.LoggedInUser.contact.Pswd.toString()),
          't': this.searchstring,
          'isSarch': true
        };
        this.JsonApiService.KbSearchpost(Recordata, '');
      } else {
        this.notificationService.soffronterroralert('Please enter kb search title !');
        return false;
      }
    } else {
      this.notificationService.soffronterroralert('KMS not configured !');
      return false;
    }
  }

}






