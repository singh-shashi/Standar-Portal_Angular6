import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonApiService } from '../../core/api/json-api.service';
import { AuthService } from '../../+auth/auth.service';
import { FadeInTop } from '../../shared/animations/fade-in-top.decorator';
import { Defect } from '../../shared/models/defect';
import { trigger, state, transition, animate, keyframes, style } from '../../../../node_modules/@angular/animations';

@FadeInTop()
@Component({
  selector: 'sa-soffrontdashboard',
  templateUrl: './opendefects.component.html',
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
export class OpenDefectsComponent implements OnInit {
  public apiKey = '';
  public parentObjName = 'Account';
  public parentObjID: number;
  public objectStatus = '';
  public widgetcolumns = [];

  public adddefect = false;
  public showDetail = false;
  public defectSelected: any;
  @ViewChild('defectlist') defectlist: any;
  onShowDetail(val: boolean) {
    this.showDetail = val;
  }
  onSelectedDefect(val: Defect) {
    this.defectSelected = val;
  }
  onHideAddForm(val: boolean) {
    this.adddefect = val;
    if (!val)
      this.reloadDataTable();
  }
  constructor(public jsonApiService: JsonApiService, private authService: AuthService) {
    const loggedInUser = this.authService.LoggedInUser;
    this.parentObjID = loggedInUser.selectedAccount.AcctID;
  }

  ngOnInit() {
    this.apiKey = this.authService.ApiKey;
  }
  runLast() {
    // import jarvisWidgetsDefaults from  '../widget.defaults';
  }
  reloadDataTable() {
    this.defectlist.Reloaddatatable();
  }
  OpenDefectForm() {
    this.adddefect = !this.adddefect;
  }
}

