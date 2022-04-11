import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { TicketService } from '../../shared/services/tickets.service';
import { JsonApiService } from '../../core/api/json-api.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  providers: [TicketService, DatePipe]
})
export class TicketListComponent implements OnInit {
  @Input() ApiKey: string;
  @Input() JsonApiService: JsonApiService;
  @Input() ParentObjName: string;
  @Input() ParentObjID: number;
  @Input() ObjectStatus: string;
  @Input() SearchCondition = '';
  @Input() ShowFirstRecord = false;

  @Output() onSetHide = new EventEmitter<boolean>();
  @Output() onSelectItem = new EventEmitter<any>();
  @ViewChild('datatable') datatable: any;

  private ticketService: TicketService;
  public showSearchresult = false;
  public displayedColumns = [];
  public viewlistArray = [];
  public VlistData: any;
  public _sortby = 'desc';
  public get wherecondition(): string {
    return (('Ticket.FormId>0 and Ticket.Isdeleted=0') +
      ((this.ObjectStatus && this.ObjectStatus !== '') ? (' and Ticket.Status ' + this.ObjectStatus) : '') +
      ((this.SearchCondition && this.SearchCondition !== '') ? (' and ' + this.SearchCondition) : ''));
  }
  options = {
    dom: 'Bfrtip',
    ajax: (data, callback) => {
      if (!this.showSearchresult) {
        const sortColumn = data.columns[data.order[0].column].data;
        const sortOrder = data.order[0].dir;
            if (this.VlistData.Object) {
              const FldName = this.VlistData.Object.VIEWREPORTS.map(f => f.FLDNAME).join(',');

              // tslint:disable-next-line:max-line-length
              const ticketRecordDataCall = this.ticketService.getTickets(this.ApiKey, this.ParentObjName === undefined ? '' : this.ParentObjName , this.ParentObjID, this.wherecondition,
                data.start, data.length, sortColumn, sortOrder, FldName)
                .subscribe((ticketRecordData) => {
                  if (ticketRecordData.Object.RESULTS) {
                    if (this.ShowFirstRecord) {
                      this.onSelect(ticketRecordData.Object.RESULTS[0]);
                    }
                    ticketRecordData.Object.RESULTS.map(() => { });
                    callback({
                      aaData: ticketRecordData.Object.RESULTS,
                      recordsTotal: ticketRecordData.Object.TOTALRECORDS,
                      recordsFiltered: ticketRecordData.Object.TOTALRECORDS
                    })
                  } else {
                    callback({
                      aaData: [],
                      recordsTotal: 0,
                      recordsFiltered: 0
                    })
                  }
                  ticketRecordDataCall.unsubscribe();
                });
            }
      } else {
        callback({
          aaData: [],
          recordsTotal: 0,
          recordsFiltered: 0
        })
      }
    },
    columns: [],
    destroy: true,
    order: [0, this._sortby]
  };

  constructor() { }

  ngOnInit() {
    this.ticketService = new TicketService(this.JsonApiService);

        const v = this.JsonApiService.ViewRecordFieldList(this.ApiKey, 'Ticket')
          .subscribe((vdata) => {
            this.VlistData = vdata;
            this._sortby = vdata.Object.SORT[0].ORDER.toLocaleLowerCase();
            this.displayedColumns = this.VlistData.Object.VIEWREPORTS.slice(0, 5).map(f => f.FLDLABL);
           // this.displayedColumns =  this.displayedColumns.slice(0, 9);
            this.viewlistArray = this.VlistData.Object.VIEWREPORTS.slice(0, 5).map(f => (
            f.FieldType === 12 ?
            {
              data : f.FLDNAME,
              class : 'record-data ' + 'fld' + f.FieldType,
              orderable : true,
              render: function (data) {
                if (data) {
                  return new DatePipe('en-US').transform(new Date(data), 'dd MMM yyyy');
                } else {
                  return data;
                }
              }
            } :
            {
              data : f.FLDNAME,
              class : 'record-data ' + 'fld' + f.FieldType,
              orderable : true,
            }
           ));
          });
  }

  public onShowDetail(v) {
    window.scrollTo(0, 0);
    this.onSetHide.emit(v);
  }

  public onSelect(v) {
    this.onSelectItem.emit(v);
  }
  public ReloadSearchCondition(search: string) {
    this.SearchCondition = search;
    this.showSearchresult = false;
  }
  public Reloaddatatable() {
    this.datatable.reloadData();
  }

  @ViewChildren('datatable') changingdatatable: QueryList<any>;
  ngAfterViewInit() {
    this.changingdatatable.changes.subscribe(t => {
      this.ngForRendred();
    })
  }

  ngForRendred() {
    this.options.columns = this.viewlistArray;
    this.datatable.renderwithoptions(this.options);
  }
}
