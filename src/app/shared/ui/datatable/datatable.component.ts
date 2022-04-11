import { Component, Input, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { JsonApiService } from 'app/core/api/json-api.service';

declare var $: any;

@Component({

  selector: 'sa-datatable',
  template: `
      <table class="dataTable responsive {{tableClass}}" width="{{width}}">
        <ng-content></ng-content>
      </table>
`,
  styles: [
    require('smartadmin-plugins/datatables/datatables.min.css')
  ]
})
export class DatatableComponent implements OnInit {

  @Input() public ObjectName: string;
  @Input() public options: any;
  @Input() public filter: any;

  @Input() public paginationLength: boolean;
  @Input() public columnsHide: boolean;
  @Input() public tableClass: string;
  @Input() public width = '100%';

  @Output() onSetHide = new EventEmitter<boolean>();
  @Output() onSelectItem = new EventEmitter<any>();

  public _dataTable: any;

  constructor(private el: ElementRef, private jsonApiService: JsonApiService) {
  }

  ngOnInit() {
    // Promise.all([
    //   System.import('script-loader!smartadmin-plugins/datatables/datatables.min.js'),
    // ]).then(() => {
    //   // this.render()
    // })
  }

  reloadData() {
    this._dataTable.ajax.reload();
  }

  renderwithoptions(options: any) {
    this.options = options;

    Promise.all([
      System.import('script-loader!smartadmin-plugins/datatables/datatables.min.js'),
    ]).then(() => {
      this.render()
    })
  }

  render() {
    const element = $(this.el.nativeElement.children[0]);
    let options = this.options || {};

    const dataTableConfig = this.jsonApiService.getDataTableConfig();

    options.pageLength = dataTableConfig.pageLength;
    options.lengthMenu = dataTableConfig.lengthMenu;

    let toolbar = '';
    if (options.buttons) {
      toolbar += 'B';
    }
    if (this.paginationLength) {
      toolbar += 'l';
    }
    if (this.columnsHide) {
      toolbar += 'C';
    }

    if (typeof options.ajax === 'string') {
      const url = options.ajax;
      options.ajax = {
        url: url,
        // complete: function (xhr) {
        //
        // }
      }
    }

    options = $.extend(options, {

      'dom': '<\'dt-toolbar\'<\'col hidden-xs text-right\'' + toolbar + '>r>' +
        't' +
        '<\'dt-toolbar-footer w-100\'<\'col hidden-xs\'i><\'col mt-2\'p>>',
      oLanguage: {
        'sSearch': '<span class=\'input-group-addon\'><i class=\'glyphicon glyphicon-search\'></i></span> ',
        'sLengthMenu': '_MENU_'
      },
      'autoWidth': true,
      retrieve: false,
      responsive: true,
      bDeferRender: true,
      bDestroy: true,
      initComplete: () => {
        element.parent().find('.input-sm').removeClass('input-sm').addClass('input-xs');
      }
    });
    options.processing = true;
    options.oLanguage = {
      sProcessing: '<i class=\'fas fa-circle-notch fa-spin text-primary\' style=\'font-size:24px;\'>'
    };
    options.searching = false;
    options.ordering = true;
    options.serverSide = true;

    this._dataTable = element.DataTable(options);
    const _dataTable = this._dataTable;
    _dataTable
    .order( [ 0, 'desc' ] )
    .draw();

    if (this.filter) {
      // Apply the filter
      element.on('keyup change', 'thead th input[type=text]', function () {
        _dataTable
          .column($(this).parent().index() + ':visible')
          .search(this.value)
          .draw();
      });
    }

    if (!toolbar) {
      // element.parent().find(".dt-toolbar").append('<div class="text-right"></div>');
    }

    const _c = this;
    element.on('dblclick', 'td.record-data', function () {
      const tr = $(this).closest('tr');
      const row = _dataTable.row(tr);
      const recData = row.data();
      _c.onSetHide.emit(true);
      _c.onSelectItem.emit(recData);
    })

    // element.on('click', 'i._attachment', function () {
    //   const tr = $(this).parent().parent().closest('tr');
    //   const row = _dataTable.row(tr);
    //   const recData = row.data();
    //   _c.onSetHide.emit(false);
    //   _c.onSelectItem.emit(recData);
    // })
  }
}
