import { DataService } from './../../shared/services/data.service';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, ViewChild, HostListener, ViewChildren, QueryList, ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory } from '@angular/core';
import { JsonApiService } from '../../core/api/json-api.service';
import { AuthService } from '../../+auth/auth.service';
import { FadeInTop } from '../../shared/animations/fade-in-top.decorator';

import 'smartadmin-plugins/smartwidgets/jarvis.widget.ng2.js'
import { PortalUser } from '../../shared/models/portaluser';
import { trigger, style, transition, animate, state, keyframes } from '../../../../node_modules/@angular/animations';
import { ModalDirective } from 'ngx-bootstrap';
import { QueryEngineComponent } from './QueryWidget/QueryEngine.component';

declare var $: any;

@FadeInTop()
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sa-soffrontdashboard',
  templateUrl: './soffrontdashboard.component.html',
  styleUrls: ['./soffrontdashboard.component.css'],
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
export class SoffrontDashboardComponent implements OnInit {
  public apiKey = '';
  public loggedInUser: PortalUser;
  public widgetcolumns = [];
  public hiddenQuery = false;
  public selectedWidgetType = '';
  public selectedValue = '';
  public formtype = '';
  public wType = '';
  public objData;
  public objNameVal = '';
  public oQuery;
  public loading = false;
  public ObjectName = '';
  public ObjectVal = '';
  public WTitle = '';
  public QuerysName = '';
  public QuerysVal = '';
  public DefaultsName = '';
  public DefaultVal = '';
  public widgetType = '';
  public widgetName = '';
  public widgetDataInfo = '';
  public addcol = '0';
  public firstTime = false;

  @ViewChild('objName') objName;
  @ViewChild('QueryName') QueryName;
  @ViewChild('DefaultName') DefaultName;
  @ViewChild('WidgetTitle') WidgetTitle;


  @ViewChild('latestnews') latestnews: any;
  @ViewChild('latestannouncement') latestannouncement: any;
  @ViewChild('alldocument') alldocument: any;
  @ViewChild('latestcomments') latestcomments: any;
  @ViewChild('statuslist') statuslist: any;
  @ViewChild('submitticket') submitticket: any;
  @ViewChild('QueryEngine') QueryEngine: any;
  @ViewChild('Submitform') Submitform: any;
  @ViewChild('lgModal') public lgModal: ModalDirective;
  @ViewChildren('allWidgetColumns') allWidgetColumns: QueryList<any>;
  @ViewChild('QueryEngine', { read: ViewContainerRef }) entry: ViewContainerRef;
  componentRef: any;
  constructor(public jsonApiService: JsonApiService, private authService: AuthService,
    private dataService: DataService, private router: Router, private resolver: ComponentFactoryResolver) {

      this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
    };
    this.router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
            this.router.navigated = false;
            window.scrollTo(0, 0);
        }
    });
    }

  ngOnInit() {
    this.apiKey = this.authService.ApiKey;
    this.loggedInUser = this.authService.LoggedInUser;
    this.getDefaultWidgetData();
  }

  private getDefaultWidgetData() {

    const whereCondition = 'UGID=-1 and ITEMID=-1 and isdeleted=0';
    this.jsonApiService.getWidgetList(this.apiKey, 'TRPORTALFMVALS', 'ITEMVAL,UGID', whereCondition).subscribe(
      data => {
        if (data.Object !== '' && data.Object.RESULTS[0] !== undefined) {
          this.widgetcolumns = JSON.parse(data.Object.RESULTS[0].ITEMVAL);
        } else {
          this.widgetcolumns = [];
        }
        // else {
        // this.widgetcolumns = [
        //   [
        //     {
        //       'type': 'STATUS',
        //       'name': 'STANDARDSTATUS',
        //       'showtitle': 'Status Count',
        //       'collapsed': true
        //     }, {
        //       'type': 'COMMENTS',
        //       'name': 'STANDARDLATESTCOMMENTS',
        //       'showtitle': 'Latest Comments',
        //       'collapsed': true
        //     }
        //   ],
        //   [
        //     {
        //       'type': 'QUICKTICKETSUBMIT',
        //       'name': 'STANDARDQUICKSUBMITTICKET',
        //       'showtitle': 'Submit Ticket',
        //       'collapsed': false
        //     }
        //   ],
        //   [
        //     {
        //       'type': 'NEWS',
        //       'name': 'STANDARDLATESTNEWS',
        //       'showtitle': 'Latest News',
        //       'collapsed': true
        //     }, {
        //       'type': 'ANNOUNCEMENTS',
        //       'name': 'STANDARDLATESTANNOUNCEMENTS',
        //       'showtitle': 'Latest Announcements',
        //       'collapsed': true
        //     }, {
        //       'type': 'QUERY',
        //       'name': 'QUERYTICKETALLTICKETS',
        //       'showtitle': 'All Tickets',
        //       'collapsed': false,
        //       'data': {
        //         'QueryId': '967'
        //       }
        //     }, {
        //       'type': 'DATAENTRY',
        //       'name': 'DATAENTRYTICKET',
        //       'showtitle': 'Submit Tickets',
        //       'collapsed': false,
        //       'data': {
        //         'FormName': 'Ticket'
        //       }
        //     }
        //   ]
        // ];
        // }
      }
    );
  }


  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.firstTime = true;


    this.allWidgetColumns.changes.subscribe(t => {
      this.ngForRendred();
    })
  }

  ngForRendred() {
    this.ev();
  }
  FullrefreshWidget() {
      const defaltOnSameUrlNavigation = this.router.onSameUrlNavigation;
      this.router.onSameUrlNavigation = 'reload';
    this.router.navigateByUrl(this.router.url, {
    replaceUrl: true
  });
  this.router.onSameUrlNavigation = defaltOnSameUrlNavigation;
  }

  refreshWidget(type) {
    switch (type) {
      case 'NEWS':
        this.latestnews.ngOnInit();
        break;
      case 'ANNOUNCEMENTS':
        this.latestannouncement.ngOnInit();
        break;
     case 'ALLDOCUMENTS':
          this.alldocument.ngOnInit();
          break;
      case 'COMMENTS':
        this.latestcomments.ngOnInit();
        break;
      case 'STATUS':
        this.statuslist.ngOnInit();
        break;
      case 'QUICKTICKETSUBMIT':
        this.submitticket.ngOnInit();
        break;
      case 'QUERY':

       this.allWidgetColumns.forEach(alertInstance => {
           console.log(alertInstance)
         // this.QueryEngine.ngOnInit();
        // alertInstance.click();

       // this.createComponent();

       const defaltOnSameUrlNavigation = this.router.onSameUrlNavigation;
       this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl(this.router.url, {
      replaceUrl: true
   });
   this.router.onSameUrlNavigation = defaltOnSameUrlNavigation;
        });
        break;
      case 'DATAENTRY':
      //  this.Submitform.ngOnInit();

      const defaltOnSameUrlNavigation1 = this.router.onSameUrlNavigation;
      this.router.onSameUrlNavigation = 'reload';
     this.router.navigateByUrl(this.router.url, {
     replaceUrl: true
  });
  this.router.onSameUrlNavigation = defaltOnSameUrlNavigation1;
        break;
      default:
        alert('Not implemented');
        break;
    }
  }

  createComponent() {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(QueryEngineComponent);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.ngOnInit();
}
destroyComponent() {
    this.componentRef.destroy();
}

  GetDashboardData(): any {
    return $.map($('#widgets-grid').find('article'), function (v, i) {
      return [$.map($(v).find('.jarviswidget'), function (w, j) {
        return JSON.parse($(w).find('header span.sfinfo').html())
      })];
    });
  }

  @HostListener('window:UpdateDashboard')
  UpdateDashboard() {
    if (this.loggedInUser.contact.PAccessTyp.trim().toLowerCase() === 'admin') {
      const das = this.GetDashboardData();

      const ITEMVAL = 'ITEMVAL=\'' + JSON.stringify(das) + '\'';
      const whereCondition = 'UGID=-1';
      this.jsonApiService.setWidgetList(this.apiKey, 'TRPORTALFMVALS', ITEMVAL, whereCondition).subscribe(
        data => {
          if (data.Object === 1) {
            // this.widgetcolumns = das;
          }
        });
    }
  }


  private ev() {
    const jarvisWidgetsDefaults = {
      grid: 'article',
      widgets: '.jarviswidget',
      localStorage: false,
      deleteSettingsKey: '#deletesettingskey-options',
      settingsKeyLabel: 'Reset settings?',
      deletePositionKey: '#deletepositionkey-options',
      positionKeyLabel: 'Reset position?',
      sortable: this.loggedInUser.contact.PAccessTyp.trim().toLowerCase() === 'admin',
      buttonsHidden: false,
      // toggle button
      toggleButton: true,
      toggleClass: 'far fa-arrow-alt-circle-up text-info fa-fw | far fa-arrow-alt-circle-down text-info fa-fw',
      toggleSpeed: 200,
      onToggle: function (pWidget) {
        // var ev = new CustomEvent('UpdateDashboard');
        // window.dispatchEvent(ev);
        const x = JSON.parse(pWidget.find('header span.sfinfo').html())
        x.collapsed = !x.collapsed;
        pWidget.find('header span.sfinfo').html(JSON.stringify(x));
      },
      // delete btn
      deleteButton: this.loggedInUser.contact.PAccessTyp.trim().toLowerCase() === 'admin',
      deleteMsg: 'Warning: This action cannot be undone!',
      deleteClass: 'far fa-trash-alt text-danger fa-fw',
      deleteSpeed: 200,
      onDelete: function () {
        const ev = new CustomEvent('UpdateDashboard');
        window.dispatchEvent(ev);
        return false;
      },
      // edit btn
      editButton: false,
      editPlaceholder: '.jarviswidget-editbox',
      editClass: 'fa fa-cog | fa fa-save',
      editSpeed: 200,
      onEdit: function () {
      },
      // color button
      colorButton: true,
      // full screen
      fullscreenButton: true,
      fullscreenClass: 'far fa-window-maximize text-primary fa-fw | far fa-window-restore text-primary fa-fw',
      fullscreenDiff: 3,
      onFullscreen: function () {
      },
      // custom btn
      customButton: false,
      customClass: 'folder-10 | next-10',
      customStart: function () {
        alert('Hello you, this is a custom button...');
      },
      customEnd: function () {
        alert('bye, till next time...');
      },
      // order
      buttonOrder: '%refresh% %custom% %edit% %fullscreen% %toggle% %delete%',
      opacity: 0.8,
      dragHandle: ' > header',
      placeholderClass: 'jarviswidget-placeholder',
      indicator: true,
      indicatorTime: 600,
      ajax: true,
      timestampPlaceholder: '.jarviswidget-timestamp',
      timestampFormat: 'Last update: %m%/%d%/%y% %h%:%i%:%s%',
      refreshButton: true,
      refreshButtonClass: 'fas fa-redo fa-fw',
      labelError: 'Sorry but there was a error:',
      labelUpdated: 'Last Update:',
      labelRefresh: 'Refresh',
      labelDelete: 'Delete widget:',
      afterLoad: function () {
        alert('ss');
      },
      rtl: false, // best not to toggle this!
      onChange: function () {
        // const ev = new CustomEvent('UpdateDrag');
        // window.dispatchEvent(ev);
        return false;
      },
      onSave: function (v) {
        const ev = new CustomEvent('UpdateDashboard');
        window.dispatchEvent(ev);
        return false;
      },
      ajaxnav: true

    };
    if (!this.firstTime) {
      $('#widgets-grid').jarvisWidgets('destroy');
    }

    $('#widgets-grid').jarvisWidgets(jarvisWidgetsDefaults);

    this.firstTime = false;
  }
  runLast() {
    // import jarvisWidgetsDefaults from  '../widget.defaults';
  }
  SearchByKeyEnter(event, searchVal) {
    if (event.keyCode === 13) {
      this.searchRequest(searchVal.toString());
    }
  }
  public searchRequest(searchtext: string) {
    if (searchtext !== '') {
      const reqs = searchtext.split(',');
      const requests = (reqs.filter(function (n) { return n !== undefined && n !== '' })).join(',');
      const regexp = new RegExp(/[0-9]+[,]?[0-9]*$/);
      if (regexp.test(requests)) {
        this.dataService.changeData(JSON.stringify({ 'Condition': requests }));
        this.router.navigate(['/requests/searchrequest']);
      } else {
        alert('Invalid search text');
      }
    } else {
      alert('Invalid search text');
    }
  }

  public operAddWidgetDialog() {
    // $('#lgModal').removeData();
    this.lgModal.show();
  }
  _populatetypewidgets(selval) {
    this.hiddenQuery = false;
    const arrObj = [];
    this.formtype = selval.srcElement.value;
    if (this.formtype === 'CRMFORM' || this.formtype === 'CRMQUERY') {
      this.loading = true;
      const OData = this.jsonApiService.GetAllObject(this.authService.ApiKey).subscribe((o) => {
        if (o.Object !== '') {
          const odata = o.Object.filter(
            b => b.Name.indexOf(':') === -1);
          this.objData = odata;
          this.loading = false;
        } else {
          this.loading = false;
        }
      });
    }
    const drpVal = selval.srcElement.value.toUpperCase();
    this.selectedValue = drpVal;
  }
  _populateQueryName(_wType) {
    this.loading = true;
    const oName = _wType.srcElement.value;
    if (oName !== '' && this.formtype === 'CRMQUERY') {
      // const oName = this.objName.nativeElement.value;
      const OData = this.jsonApiService.GetQueryName(this.authService.ApiKey, oName).subscribe((o) => {
        if (o.Object !== '') {
          this.oQuery = o.Object;
          this.loading = false;
        } else {
          this.loading = false;
        }
        this.hiddenQuery = true;
      });
    } else {
      this.hiddenQuery = false;
      this.loading = false;
    }

  }
  Addwidget() {
    if (this.formtype !== 'CRM') {
      this.wType = this.formtype;
    }
    this.addWidgetDynamic();
  }

  PopulateWidgetType(pWid) {
    this.objNameVal = pWid.srcElement.value;
    this.oQuery = [];
    this.QueryName.nativeElement.value = '';
  }

  private addWidgetDynamic() {
    if (this.formtype.toUpperCase() === 'CRMFORM') {
      this.ObjectVal = this.objName.nativeElement.value;
      if (this.ObjectVal === undefined || this.ObjectVal === '') {
        alert('Please select crm Object name.');
        return false;
      }

      if (this.wType.toUpperCase() === 'CRMQUERY') {
        this.QuerysVal = this.QueryName.nativeElement.value;
        this.ObjectVal = this.objName.nativeElement.value;
        if (this.ObjectVal === undefined || this.ObjectVal === '') {
          alert('Please select crm Object name.');
          return false;
        }
        if (this.QuerysVal === undefined || this.QuerysVal === '') {
          alert('Please select Query name.');
          return false;
        }
        if (this.WTitle === undefined || this.WTitle === '') {
          alert('Please enter widget title name.');
          return false;
        }
      }
    }

    if (this.formtype.toUpperCase() === 'STANDARD') {
      this.DefaultVal = this.DefaultName.nativeElement.value;
      if (this.DefaultVal === undefined || this.DefaultVal === '') {
        alert('Please select Standard name.');
        return false;
      }
    }
    this.WTitle = this.WidgetTitle.nativeElement.value;
    if (this.WTitle === undefined || this.WTitle === '') {
      alert('Please enter widget title name.');
      return false;
    }

    if (this.formtype.toUpperCase() === 'CRMQUERY') {
      this.ObjectVal = this.objName.nativeElement.value;
      this.ObjectName = this.objName.nativeElement.selectedOptions[0].innerText;
      this.QuerysVal = this.QueryName.nativeElement.value;
      this.QuerysName = this.QueryName.nativeElement.selectedOptions[0].innerText;
      this.widgetType = 'QUERY';
      this.widgetName = 'QUERY' + this.ObjectVal + this.QuerysVal;
      this.manageWidgetData();
      this.loading = false;
    } else if (this.formtype.toUpperCase() === 'CRMFORM') {
      this.loading = true;
      this.ObjectVal = this.objName.nativeElement.value;
      this.ObjectName = this.objName.nativeElement.selectedOptions[0].innerText;
      this.widgetType = 'DATAENTRY';
      this.widgetName = 'DATAENTRY' + this.ObjectVal.toUpperCase();
      this.manageWidgetData();
      this.loading = false;
    } else if (this.formtype.toUpperCase() === 'STANDARD') {
      this.DefaultVal = this.DefaultName.nativeElement.value;
      this.DefaultsName = this.DefaultName.nativeElement.selectedOptions[0].innerText;
      this.widgetType = this.DefaultVal;
      this.widgetName = 'STANDARD' + this.DefaultVal.toUpperCase();
      this.manageWidgetData();
      this.loading = false;
    }
  }

  manageWidgetData() {
    let newColData = this.GetDashboardData();
    if (newColData.length < 3) {
      newColData = [[], [], []];
    }
    const allWidgets = [];
    if (newColData.length === 3) {
      newColData[0].concat(newColData[1]).concat(newColData[2]);
    }
    if (newColData.map(f => f.find(s => s.name.toUpperCase() === this.widgetName.toUpperCase()))[0] !== undefined) {
      alert('This widget already exist !');
      return false;
    }

    const widgetData = {
      'type': this.widgetType.toUpperCase(),
      'name': this.widgetName,
      'showtitle': this.WTitle,
      'collapsed': false,
      'data': {}
    };

    switch (this.widgetType) {
      case 'DATAENTRY':
        widgetData.data = {
          'FormName': this.ObjectVal
        }
        break;
      case 'QUERY':
        widgetData.data = {
          'QueryId': this.QuerysVal
        }
        break;
    }


    newColData[0].push(widgetData);
    this.AddToUpdateWidget(newColData);
  }

  AddToUpdateWidget(newColData: any) {
    const ITEMVAL = 'ITEMVAL=\'' + JSON.stringify(newColData) + '\'';
    const whereCondition = 'UGID=-1';
    this.jsonApiService.setWidgetList(this.authService.ApiKey, 'TRPORTALFMVALS', ITEMVAL, whereCondition).subscribe(
      data => {
        if (data.Object === 1) {
          this.lgModal.hide();
          //  this.widgetcolumns = newColData;
         // window.location.reload();

         const defaltOnSameUrlNavigation = this.router.onSameUrlNavigation;
         this.router.onSameUrlNavigation = 'reload';
        this.router.navigateByUrl(this.router.url, {
        replaceUrl: true
     });
     this.router.onSameUrlNavigation = defaltOnSameUrlNavigation;

        }
      });
  }
  CloseModal() {
    this.selectedWidgetType = '';
    this.selectedValue = '';
    // this.DefaultName.nativeElement.options.selectedIndex = 0;
    this.hiddenQuery = false;
    this.lgModal.hide();
  }
}

