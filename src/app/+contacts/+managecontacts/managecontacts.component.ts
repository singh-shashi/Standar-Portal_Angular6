import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonApiService } from '../../core/api/json-api.service';
import { AuthService } from '../../+auth/auth.service';
import { FadeInTop } from '../../shared/animations/fade-in-top.decorator';
import { Contact } from '../../shared/models/contact';
import { trigger, state, transition, animate, keyframes, style } from '../../../../node_modules/@angular/animations';

declare var $: any;

@FadeInTop()
@Component({
  selector: 'sa-soffrontdashboard',
  templateUrl: './managecontacts.component.html',
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
export class ManageContactsComponent implements OnInit {
  public apiKey = '';
  public parentObjName = 'Account';
  public parentObjID: number;
  public objectStatus = '';
  public widgetcolumns = [];

  public addcontact = false;
  public showDetail = false;
  public hasAddPermission = false;

  public contactSelected: any;
  @ViewChild('contactlist') contactlist: any;
  onShowDetail(val: boolean) {
    this.showDetail = val;
    if (!val) {
      this.reloadDataTable();
    }
  }
  onSelectedContact(val: Contact) {
    this.contactSelected = val;
  }
  onHideAddForm(val: boolean) {
    this.addcontact = val;
    if (!val) {
      this.reloadDataTable();
    }
  }

  constructor(public jsonApiService: JsonApiService, private authService: AuthService) {
    const loggedInUser = this.authService.LoggedInUser;
    this.parentObjID = loggedInUser.selectedAccount.AcctID;
    this.hasAddPermission = $.trim(loggedInUser.contact.PAccessTyp).toUpperCase() === 'ADMIN';
  }

  ngOnInit() {
    this.apiKey = this.authService.ApiKey;
  }
  runLast() {
    // import jarvisWidgetsDefaults from  '../widget.defaults';
  }
  reloadDataTable() {
    this.contactlist.Reloaddatatable();
  }
  OpenContactForm() {
    if (this.hasAddPermission) {
      this.addcontact = !this.addcontact;
    }
  }
}

