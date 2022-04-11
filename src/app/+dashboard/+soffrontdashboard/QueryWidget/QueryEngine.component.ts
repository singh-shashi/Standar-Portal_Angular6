import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { JsonApiService } from '../../../core/api/json-api.service';
import { PortalUser } from '../../../shared/models/portaluser';
import { Router } from '../../../../../node_modules/@angular/router';
import { trigger, style, transition, animate, state, keyframes } from '../../../../../node_modules/@angular/animations';
import { DataService } from '../../../shared/services/data.service';

declare var $: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-QueryEngine',
  templateUrl: './QueryEngine.component.html',
  styleUrls: ['./QueryEngine.component.css'],
  providers: [DashboardService],
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
export class QueryEngineComponent implements OnInit {
  public displayedColumns: any;
  public dataSource = [];
  public TicketDetrails = [];
  public AttachData = [];
  public tableFooterColumns = '';
  public downloadUrl;
  public wherecondition = '';
  public sortBy = 'FormId';
  public sortOrder = 'DESC';
  public paginationFlag = false;
  public NoRecords = false;
  @Input() ApiKey: string;
  @Input() JsonApiService: JsonApiService;
  @Input() LoggedInUser: PortalUser;
  @Input() QueryData: any;
  @Input() expanded = false;
  public pagenumber = 1;
  public searchtext = '';
  public maxPage = 1;
  private dashboardservice: DashboardService;

  public loading = false;
  selectedRowIndex: any;
  constructor(private router: Router, private jsonService: JsonApiService, private dataService: DataService) { }

  ngOnInit() {
    this.loading = true;
    this.selectedRowIndex = 0;
    this.TicketDetrails = [];
    this.displayedColumns = [];
    this.dataSource = [];
    this.paginationFlag = false;
    this.excuteQuery();
  }

  search() {
    this.pagenumber = 1;
    this.maxPage = 1;
    this.paginationFlag = false;
    this.excuteQuery();
  }

  excuteQuery() {
    this.loading = true;
    const QID = this.QueryData.QueryId;
    this.removeAllDetail();
    const TDetils = this.jsonService._runQuery(this.ApiKey, QID, this.pagenumber, 5, this.LoggedInUser.contact.FullName.toString(),
      this.searchtext, this.LoggedInUser.selectedAccount.AcctID.toString())
      .subscribe((QryResult) => {
        if (QryResult.ErrorCode === 0) {
          if (QryResult.Object.Results.RESULTS.length === 0) {
            this.NoRecords = true;
          } else {
            this.NoRecords = false;
          }
          if (!this.paginationFlag) {
            this.displayedColumns = [];
            for (let index = 0; index < QryResult.Object.QueryFields.length; index++) {
              this.displayedColumns.push(QryResult.Object.QueryFields[index]);
              if (index === QryResult.Object.QueryFields.length - 1) {
                this.tableFooterColumns = QryResult.Object.QueryFields[index].Name;
                break;
              }
            }
          }

          this.tableFooterColumns = QryResult.Object.QueryFields;

          if (QryResult.Object.Results) {
            this.dataSource = QryResult.Object.Results.RESULTS;
            this.maxPage = Math.ceil(QryResult.Object.Results.TOTALRECORDS / 5);
            this.loading = false;
            TDetils.unsubscribe();
          }
          this.loading = false;
        } else {
          this.NoRecords = true;
          this.dataSource = [];
          this.loading = false;
          TDetils.unsubscribe();
        }
      }, error => {
        // console.log(error);
      });

  }

  sortData(sData) {
    this.sortBy = sData.active;
    this.sortOrder = sData.direction;
    this.excuteQuery();
  }
  drillDown(formId) {
    this.dataService.changeData(JSON.stringify({ 'Condition': 'FormId = ' + formId, 'ShowDetail': false, 'SelectedNoteID': 0 }));
    this.router.navigate(['/requests/drilldownrequests'])
  }

  PageAdd() {
    this.pagenumber++;
    this.paginationFlag = true;
    this.excuteQuery();
  }

  PageMinus() {
    this.pagenumber--;
    this.excuteQuery();
  }

  toggleExpand(o) {
    const trelement = $(o.currentTarget).parent();
    const expand = !trelement.next().hasClass('detail-view');
    if (expand) {
      const c = trelement.find('span').html();
      trelement.after('<tr class=\'detail-view bg-white\'><td colspan=\'100%\' class=\'border-top-0\'>' + c + '</td></tr>');
    } else {
      trelement.next().remove();
    }
  }

  removeAllDetail() {
    $('.detail-view').remove();
  }

}






