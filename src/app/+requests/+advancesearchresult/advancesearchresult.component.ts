import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FadeInTop } from '../../shared/animations/fade-in-top.decorator';
import { Ticket } from '../../shared/models/ticket';
import { JsonApiService } from '../../core/api/json-api.service';
import { AuthService } from '../../+auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { trigger, state, transition, animate, keyframes, style } from '../../../../node_modules/@angular/animations';

@FadeInTop()
@Component({
  selector: 'sa-soffrontdashboard',
  templateUrl: './advancesearchresult.component.html',
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
export class AdvancesearchresultComponent implements OnInit {
  public apiKey: string;
  public parentObjName = 'Account';
  public parentObjID: number;
  public viewFilter: string;
  public searchCondition = '';
  public widgetcolumns = [];
  @ViewChild('ticketlist') ticketlist: any;
  @ViewChild('fromDateObj') fromDateObj: ElementRef;
  @ViewChild('toDateObj') toDateObj: ElementRef;

  public showDetail = false;
  public ticketSelected: any;

  public fromDate: string;
  public toDate: string;

  onShowDetail(val: boolean) {
    this.showDetail = val;
    if (!val) {
      this.reloadDataTable();
    }
  }
  onSelectedTicket(val: Ticket) {
    this.ticketSelected = val;
  }
  constructor(private route: ActivatedRoute, public jsonApiService: JsonApiService, private authService: AuthService) {
    const loggedInUser = this.authService.LoggedInUser;
    this.parentObjID = loggedInUser.selectedAccount.AcctID;
  }

  ngOnInit() {
    this.apiKey = this.authService.ApiKey;
    this.route.params.subscribe(params => {
      this.viewFilter = params['statusfilter'];
    });
    this.ticketlist.showSearchresult = true;
  }
  reloadDataTable() {
    this.ticketlist.Reloaddatatable();
  }

  public SearchTicketonDateFilter() {
    this.fromDate = this.fromDateObj.nativeElement.value;
    this.toDate = this.toDateObj.nativeElement.value;

    if (!this.fromDate || !this.toDate) {
      alert('Please enter both \'From\' and \'To\' date.');
      return false;
    } else if ((this.fromDate !== '' && this.toDate === '') || (this.fromDate === '' && this.toDate !== '')) {
      alert('Please enter both \'From\' and \'To\' date.');
      return false;
    } else if ((new Date(this.toDate)) < (new Date(this.fromDate))) {
      alert('Please enter valid date range.');
      return false;
    } else {
      const status = this.getStatus();
      this.searchCondition = ((status === '') ? '' : (status + ' AND')) +
        '(Ticket.CallTime between \'' + this.fromDate + ' 00:00:01\' and \'' + this.toDate + ' 23:59:59\')';
      this.ticketlist.ReloadSearchCondition(this.searchCondition);
      this.reloadDataTable();
    }
  }
  public SearchByKeyEnter(event, searchVal) {
    if (event.keyCode == 13) {
      this.SearchTicket(searchVal);
    }
  }
  public SearchTicket(searchtext: string) {
    if (searchtext !== '' && this.doNumericSearch(searchtext)) {
      this.searchCondition = this.getSearchConditionById(searchtext);
    } else {
      const status = this.getStatus();
      const fields = ['Status', 'Environ', 'Cat1', 'AssignTo', 'Cat2', 'EndUser', 'Company', 'ContctName', 'Synopsis'];
      const searchFields = fields.join(' like \'%' + searchtext + '%\' OR ');
      this.searchCondition = ((status === '') ? '' : (status + ' AND')) +
        '(' + searchFields + ' like \'%' + searchtext + '%\')';
    }
    this.ticketlist.ReloadSearchCondition(this.searchCondition);
    this.reloadDataTable();
  }
  public getSearchConditionById(searchtext: string) {
    let searchCondition = '';
    const reqs = searchtext.split(',');
    const requests = (reqs.filter(function (n) { return n !== undefined && n !== '' })).join(',');
    const regexp = new RegExp(/[0-9]+[,]?[0-9]*$/);
    if (regexp.test(requests)) {
      const status = this.getStatus();
      searchCondition = ((status === '') ? '' : (status + ' AND')) +
        '(Ticket.FormId in (' + requests + '))';
    } else {
      alert('Invalid search text');
    }
    return searchCondition;
  }
  private getStatus() {
    let status: string = this.viewFilter;
    switch (this.viewFilter) {
      case 'All':
        status = '';
        break;
      case 'Open Tickets':
        status = 'Ticket.Status not in (\'Closed\',\'Reopened\')';
        break;
      case 'Resolved Tickets':
        status = 'Ticket.Status = \'Resolved\'';
        break;
      case 'Closed Tickets':
        status = 'Ticket.Status = \'Closed\'';
        break;
      case 'Auto-Closed Tickets':
        status = 'Ticket.Status = \'Auto-Closed\'';
        break;
      default:
        status = 'Ticket.Status = \'' + status + '\'';
        break;
    }
    return status;
  }

  onChangeDate(event) {
    const newVal = event.target.value;
    // console.log(newVal);

    const currentDate = new Date();
    let fromDateObj: Date;
    let toDateObj: Date;

    switch (newVal.toLowerCase()) {
      case 'today':
        fromDateObj = currentDate;
        toDateObj = currentDate;
        break;
      case 'this week':
        fromDateObj = this.addDays(new Date(), -1 * currentDate.getDay());
        toDateObj = this.addDays(new Date(), (-1 * currentDate.getDay() + 6));
        break;
      case 'this month':
        fromDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        toDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        break;
      case 'this quarter':
        const quarterMonth = (Math.floor(currentDate.getMonth() / 3) * 3) + 1;
        fromDateObj = new Date(currentDate.getFullYear(), quarterMonth - 1, 1);
        toDateObj = new Date(currentDate.getFullYear(), quarterMonth + 2, 0);
        break;
      case 'this year':
        fromDateObj = new Date(currentDate.getFullYear(), 0, 1);
        toDateObj = new Date(currentDate.getFullYear(), 11, 31);
        break;
      case 'last week':
        fromDateObj = this.addDays(new Date(), -1 * (7 + currentDate.getDay()));
        toDateObj = this.addDays(new Date(), (-1 * (7 + currentDate.getDay()) + 6));
        break;
      case 'last week to date':
        toDateObj = new Date;
        fromDateObj = this.addDays(currentDate, (-1 * (7 + currentDate.getDay())));
        break;
      case 'last month':
        fromDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        toDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        break;
      case 'last month to date':
        fromDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        toDateObj = currentDate;
        break;
      case 'last year':
        fromDateObj = new Date(currentDate.getFullYear() - 1, 0, 1);
        toDateObj = new Date(currentDate.getFullYear() - 1, 12, 0);
        break;
      case 'last year to date':
        fromDateObj = new Date(currentDate.getFullYear() - 1, 0, 1);
        toDateObj = currentDate;
        break;
      default:
        break;
    }

    this.fromDateObj.nativeElement.value = new DatePipe('en-US').transform(new Date(fromDateObj), 'dd MMM yyyy');
    this.toDateObj.nativeElement.value = new DatePipe('en-US').transform(new Date(toDateObj), 'dd MMM yyyy');
  }

  addDays(dateValue: Date, numberOfDays: number) {
    dateValue.setDate(dateValue.getDate() + numberOfDays);
    return dateValue;
  }

  doNumericSearch(text: string) {
    if (text.trim() === '') {
      return false;
    } else {
      return text.split(',').every(x => isNaN(Number(x)) === false)
    }
  }
}
