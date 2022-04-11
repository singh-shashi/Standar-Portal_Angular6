import { Component, OnInit, Input, ElementRef, Output, EventEmitter, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { first } from 'rxjs/operators';
import { DefectService } from '../../shared/services/defects.service';
import { JsonApiService } from '../../core/api/json-api.service';
import { DatePipe } from '@angular/common'
declare var $: any;
@Component({
  selector: 'app-defect-list',
  templateUrl: './defect-list.component.html',
  providers: [DefectService]
})
export class DefectListComponent implements OnInit {
  @Input() ApiKey: string;
  @Input() JsonApiService: JsonApiService;
  @Input() ParentObjName: string;
  @Input() ParentObjID: number;
  @Input() ObjectStatus: string;
  @Output() onSetHide = new EventEmitter<boolean>();
  @Output() onSelectItem = new EventEmitter<any>();
  @ViewChild('datatable') datatable: any;
  private defectService: DefectService;

  public displayedColumns = [];
  public viewlistArray = [];
  public VlistData: any;

  get wherecondition(): string {
    if (this.ObjectStatus === '') {
      return 'Defect.FormId>0 and Defect.Isdeleted=0';
    } else {
      return 'Defect.FormId>0 and Defect.Isdeleted=0 and Defect.Status in (\'' + this.ObjectStatus.replace(',', '\',\'') + '\')';
    }
  }
  options = {
    dom: 'Bfrtip',
    ajax: (data, callback, settings) => {
      const sortColumn = data.columns[data.order[0].column].data;
      const sortOrder = data.order[0].dir;
      const FldName = this.VlistData.Object.VIEWREPORTS.map(f => f.FLDNAME).join(',');
      const defectRecordDataCall = this.defectService.getDefects(this.ApiKey, this.ParentObjName, this.ParentObjID,
        this.wherecondition, data.start, data.length, sortColumn, sortOrder, FldName)
        .subscribe((defectRecordData) => {
          if (defectRecordData.Object.RESULTS) {
            defectRecordData.Object.RESULTS.map((t) => { });
            callback({
              aaData: defectRecordData.Object.RESULTS,
              recordsTotal: defectRecordData.Object.TOTALRECORDS,
              recordsFiltered: defectRecordData.Object.TOTALRECORDS
            })
          } else {
            callback({
              aaData: [],
              recordsTotal: 0,
              recordsFiltered: 0
            })
          }
          defectRecordDataCall.unsubscribe();
        });
    },
    columns: []
  };

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.displayedColumns = [];
    this.viewlistArray = [];
    this.VlistData = null;
    this.defectService = new DefectService(this.JsonApiService);
    const v = this.JsonApiService.ViewRecordFieldList(this.ApiKey, 'Defect')
    .subscribe((vdata) => {
      this.VlistData = vdata;
      this.displayedColumns = this.VlistData.Object.VIEWREPORTS.map(f => f.FLDLABL);
      this.viewlistArray = this.VlistData.Object.VIEWREPORTS.map(f => (
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
