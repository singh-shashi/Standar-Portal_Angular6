import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JsonApiService } from '../core/api/json-api.service';
import { PortalUser } from '../shared/models/portaluser';
import { Contact } from '../shared/models/contact';
import { Account } from '../shared/models/account';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  loading = false;
  devKey = '';
  private _isLoggedIn = JSON.parse(sessionStorage.getItem('isLoggedIn') || 'false');
  private _apiKey = sessionStorage.getItem('apiKey') || '';
  public _loggedInUser = sessionStorage.getItem('loggedInUser') != null ?
    (new PortalUser()).deserialize(JSON.parse(sessionStorage.getItem('loggedInUser'))) : null;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private router: Router, private jsonApiService: JsonApiService) { }

  get LoggedInUser() {
    return JSON.parse(sessionStorage.getItem('loggedInUser') || this._loggedInUser.toString());
  }

  get IsLoggedIn() {
    return JSON.parse(sessionStorage.getItem('isLoggedIn') || this._isLoggedIn.toString());
  }

  set ApiKey(value: string) {
    this._apiKey = value;
  }

  get ApiKey() {
    return sessionStorage.getItem('apiKey') || this._apiKey.toString();
  }

  get RedirectUrl() {
    return this.redirectUrl ? this.redirectUrl : '/dashboard/soffrontdashboard';
  }

  initiateApp(): Observable<any> {
    return this.jsonApiService.getDeveloperKey();
  }

  initiateAuthorizeApp(developerKey: string) {
    return this.jsonApiService.getSFToken(developerKey);
  }

  authorizeUser(username: string, password: string) {
    sessionStorage.setItem('apiKey', this._apiKey);
    username = username.replace('\'', '\'\'');
    password = password.replace('\'', '\'\'');
    username = username.replace('+', '♣');
    password = password.replace('+', '♣');

    const soffrontContactConfig = this.jsonApiService.getSoffrontContactConfig();

    const contactviewlist = 'Contact,Status,Company,JobTitle,ConRole,FName,LName,BPhone,Address1,\'\' as Fax,' +
      'Mobile,' + soffrontContactConfig.UserEmailField + ' as email,City,Country,StatePr,ZipPost,' +
      soffrontContactConfig.FullNameField + ' as FullName,'
       + soffrontContactConfig.PortalAccessField + ' as PortalAcc,'
       + soffrontContactConfig.PortalAccessTypeField + ' as PAccessTyp,\'\' as AcctPhone,\'\' as AddlInfo,' +
      '\'\' as Address2,\'\' as Location,\'\' as MrMs,' + soffrontContactConfig.PasswordField + ' as Pswd';

    // const contactLoginWhr = soffrontContactConfig.UserEmailField + ' = \'' + username + '\' and '
    //  + soffrontContactConfig.PasswordField + ' = \'' + password
    //   + '\' And ' + soffrontContactConfig.PortalAccessField + ' = \'Yes\' And Status <> \'Inactive Contact\'';

    const contactLoginWhr = soffrontContactConfig.PortalAccessField + ' = \'Yes\' And Status <> \'Inactive Contact\'';

    return this.jsonApiService.ValidatePortalLoginWithData(this._apiKey, 'CONTACT', contactviewlist,
        soffrontContactConfig.UserEmailField, soffrontContactConfig.PasswordField
      , username, password, contactLoginWhr);
  }

  validateUserAccounts(contactId: number) {
    const soffrontAccountConfig = this.jsonApiService.getSoffrontAccountConfig();
    const accountviewlist = '' + soffrontAccountConfig.AcctIDField + ' as AcctID,' + soffrontAccountConfig.CompanyField + ' as Company, ' + 
      'Status,Address1,City,AccState,Industry,ZipCode,MainPh,Country';
    const accountLoginWhr = 'Account.isDeleted = 0 and status In (\'' + soffrontAccountConfig
    .CustomerStatusValue.replace(/,/gi, '\',\'') + '\')';

    return this.jsonApiService.SearchByLinkRelated(this._apiKey, 'CONTACT', contactId,
      'ACCOUNT', accountviewlist, 0, 0, 'FORMID DESC', accountLoginWhr);
  }

  initiateUserSession(contactObj: any, accountObjs: Array<any>) {
    const oContact = (new Contact()).deserialize(contactObj);
    const oAccounts = accountObjs.map((a) => {
      return (new Account()).deserialize(a);
    });

    const loggedInUser = new PortalUser(oContact, oAccounts);
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    this._loggedInUser = loggedInUser;
  }

  switchAccount(selectedaccount: Account) {
    const loggedInUser = this._loggedInUser;
    loggedInUser.SelectedAccount = selectedaccount;
    sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    window.location.reload();
  }

  updateContactInformationToSession(changedContact: Contact) {
    this._loggedInUser.Contact = changedContact;
    sessionStorage.setItem('loggedInUser', JSON.stringify(this._loggedInUser));
    this.router.navigate(['/dashboard/soffrontdashboard']);
  }

  convertLocalToUtc(val: Date, additionalOffsetInHours?: number): Date {
    if (additionalOffsetInHours == null) {
      additionalOffsetInHours = 0;
    }
    const d = new Date(val);
    const localOffset = d.getTimezoneOffset() * 60000;
    const utcTime = d.getTime() + localOffset + (additionalOffsetInHours * 3600000);

    d.setTime(utcTime);

    const nulliFyTimeZone = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()));
    return nulliFyTimeZone;
  }

  logout(): void {
    this._isLoggedIn = false;
    sessionStorage.removeItem('isLoggedIn');
  }
}
