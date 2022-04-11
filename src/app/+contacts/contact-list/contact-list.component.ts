import { ContactService } from '../../shared/services/contacts.service';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { JsonApiService } from '../../core/api/json-api.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  providers: [ContactService]
})
export class ContactListComponent implements OnInit {
  @Input() ApiKey: string;
  @Input() JsonApiService: JsonApiService;
  @Input() ParentObjName: string;
  @Input() ParentObjID: number;
  @Input() ObjectStatus: string;
  @Output() onSetHide = new EventEmitter<boolean>();
  @Output() onSelectItem = new EventEmitter<any>();
  @ViewChild('datatable') datatable: any;
  private contactservice: ContactService;

  public displayedColumns = [];
  public viewlistArray = [];
  public VlistData: any;

  get wherecondition(): string {
    if (this.ObjectStatus === '') {
      return 'Contact.FormId>0 and Contact.Isdeleted=0';
    } else {
      return 'Contact.FormId>0 and Contact.Isdeleted=0 and Contact.Status in (\'' + this.ObjectStatus.replace(',', '\',\'') + '\')';
    }
  }
  options = {
    dom: 'Bfrtip',
    ajax: (data, callback, settings) => {
      const sortColumn = data.columns[data.order[0].column].data;
      const sortOrder = data.order[0].dir;
      const FldName = this.VlistData.Object.VIEWREPORTS.map(f => f.FLDNAME).join(',');
      const contactRecordDataCall = this.contactservice.getContacts(this.ApiKey, this.ParentObjName, this.ParentObjID,
        this.wherecondition, data.start, data.length, sortColumn, sortOrder, FldName)
        .subscribe((contactRecordData) => {
          if (contactRecordData.Object.RESULTS) {
            contactRecordData.Object.RESULTS.map((t) => { });
            callback({
              aaData: contactRecordData.Object.RESULTS,
              recordsTotal: contactRecordData.Object.TOTALRECORDS,
              recordsFiltered: contactRecordData.Object.TOTALRECORDS
            })
          } else {
            callback({
              aaData: [],
              recordsTotal: 0,
              recordsFiltered: 0
            })
          }
          contactRecordDataCall.unsubscribe();
        });
    },
    columns: []
  };

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.displayedColumns = [];
    this.viewlistArray = [];
    this.VlistData = null;
    this.contactservice = new ContactService(this.JsonApiService);
    const v = this.JsonApiService.ViewRecordFieldList(this.ApiKey, 'Contact')
    .subscribe((vdata) => {
      this.VlistData = vdata; //this.VlistData.Object.VIEWREPORTS.slice(0, 5).map(f => f.FLDLABL);
      this.displayedColumns = this.VlistData.Object.VIEWREPORTS.slice(0, 5).map(f => f.FLDLABL);
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
          orderable : true
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
